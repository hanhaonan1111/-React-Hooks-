import { GetStorage, GetChannal, SetChannal } from "@/utils/localStorage";
import request from "@/utils/request";
import { Dispatch } from "redux";
import { RootThunkAction, RootType } from "@/store";
import { Artical, Channal } from "../reducer/home";

export function SaveChannal(data: Channal[]) {
  return {
    type: "Home/SaveChannal" as const,
    data,
  };
}

export function GetChannalAsync(): RootThunkAction {
  return async (dispatch) => {
    if (GetStorage()) {
      // 有token (已经登陆了),发起AJAX
      let { data } = await request("user/channels");
      dispatch(SaveChannal(data.channels));
    } else {
      // 无token (未登陆),本地是否频道数据???
      if (GetChannal()) {
        // 本地有频道数据
        dispatch(SaveChannal(GetChannal()));
      } else {
        // 本地无频道数据
        let { data } = await request("user/channels");
        dispatch(SaveChannal(data.channels));
        SetChannal(data.channels);
      }
    }
  };
}

export function AllChannal(data: Channal[]) {
  return {
    type: "Home/AllChannal" as const,
    data,
  };
}
export function GetAllPannals(): RootThunkAction {
  return async (dispatch: Dispatch) => {
    let { data } = await request("/channels");
    dispatch(AllChannal(data.channels));
  };
}

export function DelPannal(data: Channal): RootThunkAction {
  return async (dispatch, getStaore) => {
    let { Home } = getStaore();
    if (GetStorage()) {
      // 用户已登录
      await request({ url: "/user/channels/" + data.id, method: "DELETE" });
      let Channal = Home.channal.filter((v: Channal) => v.id !== data.id);
      dispatch(SaveChannal(Channal));
    } else {
      // 用户未登录
      // 删本地存储
      let Channal = GetChannal().filter((v) => v.id !== data.id);
      SetChannal(Channal);
      dispatch(SaveChannal(Channal));
    }
  };
}
export function AddPannal(data: Channal): RootThunkAction {
  return async (dispatch, getStore) => {
    let { channal } = getStore().Home;
    if (GetStorage()) {
      // 已登录
      await request({
        method: "PATCH",
        url: "user/channels/",
        data: { channels: [data] },
      });
      channal.push(data);
      dispatch(SaveChannal(channal));
    } else {
      // 未登录
      let channal = [...GetChannal(), data];
      SetChannal(channal);
      dispatch(SaveChannal(channal));
    }
  };
}
export function SaveArtical(payload: {
  channel_id: number;
  timestamp: string;
  list: Artical[];
  load: boolean;
}) {
  return {
    type: "Home/SavePannal" as const,
    payload,
  };
}

export function AsyncGetArtical(payload: {
  channelId: number;
  timestamp: string;
  time: string;
  load: boolean;
}) {
  return async (dispatch: Dispatch) => {
    let { data } = await request({
      url: "/articles",
      params: {
        channel_id: payload.channelId,
        timestamp: payload.time,
      },
    });

    dispatch(
      SaveArtical({
        channel_id: payload.channelId,
        timestamp: data.pre_timestamp,
        list: data.results,
        load: payload.load || false,
      })
    );
  };
}

export function updateState(data: string) {
  return {
    type: "Home/updateState" as const,
    data: { open: true, art_id: data },
  };
}
export function CloseModel() {
  return {
    type: "Home/CloseModel" as const,
    data: { open: false, art_id: "" },
  };
}
export function SetActive(id: string) {
  return {
    type: "Home/SetActive" as const,
    data: id,
  };
}
export function AsyncReport(data: { target: string }) {
  return async (dispatch: Dispatch, getStore: () => RootType) => {
    await request({
      url: "/article/reports",
      method: "POST",
      data,
    });
    let activeId = getStore().Home.activeId;
    let articals = getStore().Home.artical[activeId].list.filter(
      (v) => v.art_id !== data.target
    );
    let timestamp = getStore().Home.artical[activeId].timestamp;

    dispatch(
      SaveArtical({
        channel_id: activeId,
        list: articals,
        timestamp,
        load: false,
      })
    );
  };
}

export function Dislick(data: string) {
  return async (dispatch: Dispatch, getStore: () => RootType) => {
    await request({
      method: "POST",
      url: "/article/dislikes",
      data: { target: data },
    });
    let activeId = getStore().Home.activeId;

    let articals = getStore().Home.artical[activeId].list.filter(
      (v) => v.art_id !== data
    );
    let timestamp = getStore().Home.artical[activeId].timestamp;
    let payload = {
      channel_id: activeId,
      list: articals,
      timestamp,
      load: false,
    };
    dispatch(SaveArtical(payload));
  };
}
