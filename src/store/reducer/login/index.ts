import { GetStorage, HasStorage } from "@/utils/localStorage";

let initValue = { token: "", refresh_token: "" };
if (HasStorage()) {
  initValue = GetStorage();
} else {
  initValue = {
    token: "",
    refresh_token: "",
  };
}
type init = {
  token: string;
  refresh_token: string;
};

export type LoginType =
  | {
      type: "login/SaveToken";
      data: init;
    }
  | {
      type: "Center/ClearData";
      payload: {
        token: "";
        refresh_token: "";
      };
    };

export function Login(state: init = initValue, action: LoginType) {
  if (action.type === "login/SaveToken") {
    return action.data;
  }
  if (action.type === "Center/ClearData") {
    return {
      token: "",
      refresh_token: "",
    };
  }
  return state;
}
