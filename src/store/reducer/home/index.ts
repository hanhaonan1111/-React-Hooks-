export type Channal = { id: string; name: string };

export interface ArticalItemType {
  art_id: string;
  aut_id: string;
  aut_name: string;
  collect_count: number;
  comm_count: number;
  cover: { images: number[]; type: number };
  like_count: number;
  pubdate: string;
  title: string;
}
export type Artical = {
  art_id: string;
  title: string;
  aut_id: string;
  comm_count: number;
  pubdate: string;
  aut_name: string;
  is_top: number;
};
export type HomeType = {
  channal: Channal[];
  allChannal: Channal[];
  artical: {
    [index: string]: {
      list: Artical[];
      timestamp: string;
    };
  };
  MoreAction: { open: boolean; art_id: string };
  activeId: number;
};
export type HomeAction =
  | {
      type: "Home/SaveChannal";
      data: Channal[];
    }
  | {
      type: "Home/AllChannal";
      data: Channal[];
    }
  | {
      type: "Home/SetActive";
      data: number;
    }
  | {
      type: "Home/updateState";
      data: {
        open: false;
        art_id: "";
      };
    }
  | {
      type: "Home/CloseModel";
      data: {
        open: false;
        art_id: "";
      };
    }
  | {
      type: "Home/SavePannal";
      payload: {
        channel_id: string;
        timestamp: string;
        list: Artical[];
        load: boolean;
      };
    };

let init: HomeType = {
  activeId: 0,
  channal: [],
  allChannal: [],
  artical: {},
  MoreAction: { open: false, art_id: "" },
};

function reducerHome(state = init, action: HomeAction) {
  switch (action.type) {
    case "Home/SaveChannal":
      return {
        ...state,
        channal: action.data,
      };
    case "Home/AllChannal":
      return {
        ...state,
        allChannal: [...action.data],
      };
    case "Home/SetActive":
      return {
        ...state,
        activeId: action.data,
      };
    case "Home/CloseModel":
      return {
        ...state,
        MoreAction: action.data,
      };
    case "Home/updateState":
      return {
        ...state,
        MoreAction: action.data,
      };
    case "Home/SavePannal":
      if (action.payload.load) {
        return {
          ...state,
          artical: {
            ...state.artical,
            [action.payload.channel_id]: {
              list: [
                ...state.artical[action.payload.channel_id].list,
                ...action.payload.list,
              ],
              timestamp: action.payload.timestamp,
            },
          },
        };
      }
      return {
        ...state,
        artical: {
          ...state.artical,
          [action.payload.channel_id]: {
            list: action.payload.list,
            timestamp: action.payload.timestamp,
          },
        },
      };
    default:
      return state;
  }
}

export default reducerHome;
