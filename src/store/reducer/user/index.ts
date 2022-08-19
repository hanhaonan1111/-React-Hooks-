export type ShowUserValue = {
  id: string;
  name: string;
  photo: string;
  art_count: number;
  follow_count: number;
  fans_count: number;
  like_count: number;
};
export type EditDataValue = {
  id: string;
  photo: string;
  name: string;
  mobile: string;
  gender: number;
  birthday: string;
};
export type UserInit = {
  ShowData: ShowUserValue;
  EditData: EditDataValue;
};
let init: UserInit = {
  EditData: {
    id: "",
    photo: "",
    name: "",
    mobile: "",
    gender: 1,
    birthday: "",
  },
  ShowData: {
    id: "",
    name: "",
    photo: "",
    art_count: 1,
    follow_count: 1,
    fans_count: 1,
    like_count: 1,
  },
};

export type UserType =
  | {
      type: "Center/SetData";
      data: ShowUserValue;
    }
  | {
      type: "Center/SetEditData";
      data: EditDataValue;
    }
  | {
      type: "/user/UpdateEditedData";
      data: EditDataValue;
    };

export function User(state = init, action: UserType) {
  switch (action.type) {
    case "Center/SetData":
      return { EditData: { ...state.EditData }, ShowData: { ...action.data } };
    case "Center/SetEditData":
      return { EditData: { ...action.data }, ShowData: { ...state.ShowData } };
    case "/user/UpdateEditedData":
      return {
        EditData: {
          ...state.EditData,
          ...action.data,
        },
        ShowData: { ...state.ShowData },
      };
    default:
      return state;
  }
}
