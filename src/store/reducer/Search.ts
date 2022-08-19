import { GetSearchResult } from "@/utils/localStorage";
import { ArticalItemType } from "./home";

export type SearchState = {
  searchResult: string[];
  SetSearchHistory: string[];
  SearchArticalRseult: ArticalItemType[];
  ArticalHasMore: boolean;
};

let InitValue: SearchState = {
  searchResult: [],
  SetSearchHistory: GetSearchResult(),
  SearchArticalRseult: [],
  ArticalHasMore: true,
};
/** */
export type SearchType =
  | {
      type: "Search/SetResult";
      data: string[];
    }
  | {
      type: "Search/SetHistoryResult";
      data: string;
    }
  | {
      type: "Search/ClearHistory";
    }
  | {
      type: "Search/SaveArticalList";
      data: ArticalItemType[];
    }
  | {
      type: "Search/SetArticalHasMore";
      data: boolean;
    }
  | {
      type: "Search/ClearArtical";
    };

export function Search(state = InitValue, action: SearchType) {
  switch (action.type) {
    case "Search/SetResult":
      return {
        ...state,
        searchResult: action.data,
      };
    case "Search/SetHistoryResult":
      let index = state.SetSearchHistory.findIndex((v) => {
        return v === action.data;
      });
      if (index !== -1) {
        state.SetSearchHistory.splice(index, 1);
      }
      return {
        ...state,
        SetSearchHistory: [action.data, ...state.SetSearchHistory],
      };
    case "Search/ClearHistory":
      return {
        ...state,
        SetSearchHistory: [],
      };
    case "Search/SaveArticalList":
      if (action.data.length === 0) {
        return {
          ...state,
          ArticalHasMore: false,
        };
      }
      return {
        ...state,
        SearchArticalRseult: [...state.SearchArticalRseult, ...action.data],
      };
    case "Search/SetArticalHasMore":
      return { ...state, ArticalHasMore: action.data };
    case "Search/ClearArtical":
      return {
        ...state,
        SearchArticalRseult: [],
      };
    default:
      return state;
  }
}
