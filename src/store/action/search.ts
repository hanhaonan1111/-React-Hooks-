import request from "@/utils/request";
import { RootThunkAction } from "..";
import { ArticalItemType } from "../reducer/home";
import { SearchType } from "../reducer/Search";
function setSuggest(data: string[]): SearchType {
  return {
    type: "Search/SetResult",
    data: data,
  };
}

export function setSuggestion(key: string): RootThunkAction {
  return async (dispatch) => {
    if (key.length === 0) {
      dispatch(setSuggest([]));
      return;
    }

    let { data } = await request.request<{ options: string[] }>({
      url: "/suggestion",
      method: "GET",
      params: { q: key },
    });
    dispatch(setSuggest(data.options));
  };
}

export function SetHistory(data: string): SearchType {
  return {
    type: "Search/SetHistoryResult",
    data,
  };
}

export function ClearHistory(): SearchType {
  return { type: "Search/ClearHistory" };
}

export function SaveSearchArticalReasult(data: ArticalItemType[]): SearchType {
  return {
    type: "Search/SaveArticalList",
    data,
  };
}
type ReturnSearchArticalItem = {
  page: number;
  per_page: number;
  results: ArticalItemType[];
  total_count: number;
};
export function SetResultList(page: number, q: string): RootThunkAction {
  return async (dispatch) => {
    let res = await request.request<ReturnSearchArticalItem>({
      url: "/search",
      method: "GET",
      params: {
        page: page,
        per_page: 10,
        q,
      },
    });
    dispatch(SaveSearchArticalReasult(res.data.results));
  };
}

export function SetHasMore(data: boolean): SearchType {
  return {
    type: "Search/SetArticalHasMore",
    data,
  };
}

export function ClearArtical(): SearchType {
  return {
    type: "Search/ClearArtical",
  };
}
