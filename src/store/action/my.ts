import request from "@/utils/request";
import { Toast } from "antd-mobile";
import { Dispatch } from "redux";
import { EditDataValue, ShowUserValue } from "../reducer/user";
export function SetData(data: ShowUserValue) {
  return {
    type: "Center/SetData",
    data,
  };
}

export function SetEditData(data: EditDataValue) {
  return {
    type: "Center/SetEditData",
    data,
  };
}
export function ClearData() {
  return {
    type: "Center/ClearData",
  };
}

export function GetData() {
  return async (dispatch: Dispatch) => {
    let { data } = await request({
      method: "GET",
      url: "/user",
    });
    dispatch(SetData(data));
  };
}
// 编辑用户页面用户信息的获取
export function GetEditInfo() {
  return async (dispatch: Dispatch) => {
    let res = await request({
      method: "GET",
      url: "/user/profile",
    });
    res && dispatch(SetEditData(res.data));
  };
}

export function UpdateEditedData(data: Partial<EditDataValue>) {
  return {
    type: "/user/UpdateEditedData",
    data,
  };
}

// 编辑个人信息
export function PutEditInfo(data: Partial<EditDataValue>) {
  return async (dispatch: Dispatch) => {
    await request({
      method: "PATCH",
      url: "/user/profile",
      data,
    });
    Toast.success("修改成功", 1);
    dispatch(UpdateEditedData(data));
  };
}
// 编辑头像
export function EditAvatar(data: Partial<EditDataValue>) {
  return async (dispatch: Dispatch) => {
    let { data: dataUrl } = await request({
      method: "PATCH",
      url: "/user/photo",
      data,
    });
    Toast.success("修改成功", 1);
    dispatch(UpdateEditedData({ photo: dataUrl.photo }));
  };
}
