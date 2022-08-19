import { SetStorage } from "@/utils/localStorage";
import request from "@/utils/request";
import { RootThunkAction } from "..";
export function AsyncsendCode(mobile: string): RootThunkAction {
  return async () => {
    await request({
      url: "/sms/codes/" + mobile,
      method: "GET",
    });
  };
}
type Token = {
  token: string;
  refresh_token: string;
};
//  type在store中存的不是字符串而固定的值.
// 所以必须强制转化string为固定的字符串值
export function SaveToken(data: Token) {
  return {
    type: "login/SaveToken" as const,
    data,
  };
}

export function AsyncLogin(data: {
  mobile: string;
  code: string;
}): RootThunkAction {
  return async (dispatch) => {
    let res = await request({
      url: "/authorizations",
      method: "POST",
      data,
    });
    dispatch(SaveToken(res.data));
    SetStorage(res.data);
  };
}
