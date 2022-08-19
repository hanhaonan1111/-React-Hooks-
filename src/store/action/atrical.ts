import request from "@/utils/request";
import { RootThunkAction } from "..";
import { ArticalAction, Comment, CommentItem } from "../reducer/artical";

export function GetArticalData(data: any): ArticalAction {
  return {
    type: "Artical/ArticalData",
    data: data,
  };
}
export function AsyncGetArticalData(id: string): RootThunkAction {
  return async (dispatch) => {
    let { data } = await request.request({
      url: "/articles/" + id,
      method: "GET",
    });
    dispatch(GetArticalData(data));
  };
}
export function SaveAllComment(data: Comment): ArticalAction {
  return {
    type: "Comment/SaveAllComment",
    data,
  };
}
export function ClearAllComment(): ArticalAction {
  return {
    type: "Comment/ClearAllComment",
  };
}

export function AsyncDianZan(target: string): RootThunkAction {
  return async (dispatch, getStore) => {
    await request.request({
      url: "article/likings",
      method: "POST",
      data: {
        target,
      },
    });
    let data = getStore().ArticalReducer.articalData;
    if (data.attitude === 1) {
      data.attitude = 0;
    } else {
      data.attitude = 1;
    }

    dispatch({
      type: "Artical/MoreAction",
      data,
    });
  };
}
export function AsyncGetArticalCommentData(
  type: "a" | "b" | "",
  source: any,
  offset: any
): RootThunkAction {
  return async (dispatch) => {
    let { data } = await request.request<Comment>({
      url: "/comments",
      method: "GET",
      params: { source, type: type, offset },
    });
    dispatch(SaveAllComment(data));
  };
}
type SendComment = {
  target: string;
  content: string;
  art_id?: string | null;
};

export function SaveNewComment(data: CommentItem): ArticalAction {
  return {
    type: "Comment/SaveNewComment",
    data,
  };
}
export function SaveNewReplayComment(data: any, data2: any): ArticalAction {
  return {
    type: "Comment/SaveReplayComment",
    data,
    data2,
  };
}

export function AsyncSendComment({
  target,
  content,
  art_id,
}: SendComment): RootThunkAction {
  return async (disptch, getStore) => {
    let { data } = await request.request({
      url: "/comments",
      method: "POST",
      data: {
        target,
        content,
        art_id,
      },
    });

    if (art_id) {
      // 向评论列表插入数据
      console.log(data.target);
      let res = getStore().ArticalReducer.AgainReplay.results || [];
      disptch(SaveNewReplayComment([data.new_obj, ...res], data.target));
    } else {
      disptch(SaveNewComment(data.new_obj));
    }
  };
}
type dataType = {
  type: "c";
  source: string;
  offset: string;
};

export function SaveReplayCom(data: Comment): ArticalAction {
  return {
    type: "Comment/ReplayComment",
    data,
  };
}
export function AsyncGetReplayCom(data: dataType): RootThunkAction {
  return async (dispatch) => {
    let { data: res } = await request.request({
      url: "/comments",
      method: "GET",
      params: data,
    });
    dispatch(SaveReplayCom(res));
  };
}
export function ClearReplayComment(): ArticalAction {
  return {
    type: "Comment/ClearReplayComment",
  };
}
