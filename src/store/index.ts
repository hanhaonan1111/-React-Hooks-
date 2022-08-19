import { applyMiddleware, createStore } from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import reducer from "./reducer";
import { HomeAction } from "./reducer/home";
import { LoginType } from "./reducer/login";
import { UserType } from "./reducer/user";
import { composeWithDevTools } from "redux-devtools-extension";
import { SearchType } from "./reducer/Search";
import { ArticalAction } from "./reducer/artical";

let store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export type RootType = ReturnType<typeof store.getState>;

export type RootDispatch = ReturnType<typeof store.dispatch>;
// 所有的Action默认只允许写同步的任务,如果是异步任务,需要使用中间件
export type RootAction =
  | HomeAction
  | LoginType
  | UserType
  | SearchType
  | ArticalAction;
// redux中的Action中
export type RootThunkAction = ThunkAction<
  // 异步Action的返回值类型
  Promise<void>,
  //getState的类型
  RootType,
  unknown,
  // dispatch的类型
  RootAction
>;
export default store;
