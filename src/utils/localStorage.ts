const KEY = "JK_TOKEN";
const CHANNAL = "JK_CHANNAL";
const SearchResult = "JK_SearchHistory";
type Token = { refresh_token: string; token: string };
type Pannal = { id: string; name: string }[];
// token 相关
export function SetStorage(data: Token) {
  return localStorage.setItem(KEY, JSON.stringify(data));
}

export function GetStorage(): Token {
  return JSON.parse(localStorage.getItem(KEY) || "{}");
}

export function RemoveStorage() {
  return localStorage.removeItem(KEY);
}

export function HasStorage() {
  return GetStorage() ? true : false;
}
// 频道相关
export function GetChannal(): Pannal {
  return JSON.parse(localStorage.getItem(CHANNAL) || "{}");
}

export function SetChannal(data: Pannal) {
  return localStorage.setItem(CHANNAL, JSON.stringify(data));
}

// 搜索历史相关
export function SetSearchResult(data: string) {
  let res = GetSearchResult();

  let index = res.findIndex((v) => {
    return v === data;
  });
  if (index !== -1) {
    res.splice(index, 1);
  }
  res.unshift(data);
  return localStorage.setItem(SearchResult, JSON.stringify(res));
}

export function GetSearchResult(): string[] {
  return JSON.parse(localStorage.getItem(SearchResult) || "[]");
}

export function ClearSearchResult() {
  return localStorage.removeItem(SearchResult);
}
