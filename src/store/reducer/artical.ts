export type ArticalItem = {
  art_id: string;
  attitude: number;
  aut_id: string;
  aut_name: string;
  aut_photo: string;
  comm_count: string;
  content: string;
  is_collected: boolean;
  is_followed: boolean;
  like_count: number;
  pubdate: string;
  read_count: number;
  title: string;
};
export type CommentItem = {
  com_id: string;
  content: string;
  reply_count: number;
  pubdate: string;
  is_followed: boolean;
  is_liking: boolean;
  like_count: number;
  aut_id: string;
  aut_name: string;
  aut_photo: string;
};
export interface Comment {
  total_count: number;
  end_id: string;
  last_id: string;
  results: CommentItem[];
}

export type ArticalData = {
  articalData: ArticalItem;
  ArticalAllComment: Partial<Comment>;
  AgainReplay: Partial<Comment>;
};
export type ArticalAction =
  | {
      type: "Artical/ArticalData";
      data: ArticalItem;
    }
  | {
      type: "Comment/SaveAllComment";
      data: Comment;
    }
  | {
      type: "Comment/ClearAllComment";
    }
  | {
      type: "Artical/MoreAction";
      data: ArticalItem;
    }
  | {
      type: "Comment/SaveNewComment";
      data: CommentItem;
    }
  | {
      type: "Comment/ReplayComment";
      data: Comment;
    }
  | {
      type: "Comment/ClearReplayComment";
    }
  | {
      type: "Comment/SaveReplayComment";
      data: CommentItem[];
      data2?: any;
    };

let initArtical: ArticalData = {
  articalData: {} as ArticalItem,
  ArticalAllComment: {} as Comment,
  AgainReplay: {} as Comment,
};

export function ArticalReducer(state = initArtical, action: ArticalAction) {
  switch (action.type) {
    case "Artical/ArticalData":
      return {
        ...state,
        articalData: action.data,
      };
    case "Comment/SaveAllComment":
      if (!state.ArticalAllComment.results) {
        state.ArticalAllComment.results = [];
      }
      return {
        ...state,
        ArticalAllComment: {
          ...state.ArticalAllComment,
          ...action.data,
          results: [...state.ArticalAllComment.results, ...action.data.results],
        },
      };
    case "Comment/ClearAllComment":
      return {
        ...state,
        ArticalAllComment: {},
      };
    case "Artical/MoreAction":
      return {
        ...state,
        articalData: { ...action.data },
      };

    case "Comment/SaveNewComment":
      if (state.ArticalAllComment.total_count === 0) {
        return {
          ...state,
          ArticalAllComment: {
            ...state.ArticalAllComment,
            total_count: state.ArticalAllComment.total_count + 1,
          },
        };
      } else {
        return {
          ...state,
          ArticalAllComment: {
            ...state.ArticalAllComment,
            total_count: state.ArticalAllComment.total_count! + 1,
            results: [action.data, ...state.ArticalAllComment.results!],
          },
        };
      }
    case "Comment/ReplayComment":
      if (state.AgainReplay.results === undefined) {
        state.AgainReplay.results = [];
      }
      return {
        ...state,
        AgainReplay: {
          ...action.data,
          results: [...action.data.results, ...state.AgainReplay.results],
        },
      };
    case "Comment/ClearReplayComment":
      return {
        ...state,
        AgainReplay: {},
      };
    case "Comment/SaveReplayComment":
      let com = state.ArticalAllComment.results?.find(
        (v) => v.com_id === action.data2
      );
      com!.reply_count = com!.reply_count + 1;

      if (state.AgainReplay.total_count === 0) {
        state.AgainReplay.total_count = 0;
        return {
          ...state,
          AgainReplay: {
            ...state.AgainReplay,
            total_count: state.AgainReplay.total_count + 1,
          },
        };
      } else {
        return {
          ...state,
          AgainReplay: {
            ...state.AgainReplay,

            results: [...action.data],
            total_count: state.AgainReplay.total_count! + 1,
          },
        };
      }

    default:
      return state;
  }
}
