import NavBar from "@/components/NavBar";
import React, { useEffect, useRef, useState } from "react";
import style from "./index.module.scss";
import { List, DatePicker, Drawer } from "antd-mobile";
import { useDispatch } from "react-redux";
import { EditAvatar, GetEditInfo, PutEditInfo } from "@/store/action/my";
import { useSelector } from "react-redux";
import EditDeraw from "./component/Edit/index.jsx";
import Selected from "./component/Selected";
export default function Edit() {
  let [open, setOpen] = useState(false);
  let [DrawerTitle, setDrawerTitle] = useState("");
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetEditInfo());
  }, [dispatch]);
  let state = useSelector((v) => v.User.EditData);
  let seleteted = [
    {
      type: "avatar",
      content: ["本地上传", "拍照上传"],
    },
    { type: "sex", content: ["男", "女"] },
  ];
  let [SelectedState, setSelectedState] = useState({ state: false, id: null });
  let ref = useRef(" ");
  return (
    <div className={style.root}>
      {/*导航栏 */}
      <div>
        <NavBar>个人信息编辑</NavBar>
        <div className="wrapper content">
          <List className="my-list">
            <List.Item
              onClick={() => {
                setSelectedState({ state: true, id: "avatar" });
              }}
              arrow="horizontal"
              extra={<img alt="" className="img" src={state.photo} />}
            >
              头像
            </List.Item>
            <List.Item
              arrow="horizontal"
              extra={state.name}
              onClick={() => {
                setOpen(true);
                setDrawerTitle("昵称");
              }}
            >
              昵称
            </List.Item>
            <List.Item
              arrow="horizontal"
              extra={state.intro ? state.intro : "未填写"}
              onClick={() => {
                setOpen(true);
                setDrawerTitle("简介");
              }}
            >
              简介
            </List.Item>
            <List.Item
              arrow="horizontal"
              extra={state.gender === 1 ? "女" : "男"}
              onClick={() => {
                setSelectedState({ state: true, id: "sex" });
              }}
            >
              性别
            </List.Item>

            <DatePicker
              mode="date"
              maxDate={new Date()}
              minDate={new Date(1970, 1, 1, 0, 0, 0)}
              value={new Date(state.birthday)}
              onChange={(e) => {
                let data = {
                  birthday: `${e.getFullYear()}-${
                    e.getMonth() + 1
                  }-${e.getDate()}`,
                };
                dispatch(PutEditInfo(data));
              }}
            >
              <List.Item arrow="horizontal" extra={state.birthday}>
                生日
              </List.Item>
            </DatePicker>
          </List>
        </div>
      </div>
      <input
        type="file"
        ref={ref}
        style={{ display: "none" }}
        onChange={(e) => {
          let fd = new FormData();
          fd.append("photo", e.target.files[0]);
          dispatch(EditAvatar(fd));
        }}
      />
      {/* 从底部上来 */}
      <Drawer
        className="drawer"
        position="bottom"
        sidebar={
          SelectedState && (
            <Selected
              onClose={() => setSelectedState(false)}
              content={SelectedState.id}
              children={SelectedState.id === "sex" ? "性别" : "头像"}
              option={seleteted}
              open={SelectedState.state}
              dom={ref}
            />
          )
        }
        open={SelectedState.state}
        children={" "}
      />

      {/* 从右面上来 */}
      <Drawer
        className="drawer"
        position="right"
        sidebar={
          open && (
            <EditDeraw
              open={open}
              submit={async ({ state: intro, name }) => {
                await dispatch(
                  PutEditInfo({
                    intro,
                    name,
                  })
                );
                setOpen(false);
              }}
              onClose={() => setOpen(false)}
              children={DrawerTitle}
            />
          )
        }
        open={open}
        children={" "}
      ></Drawer>
    </div>
  );
}
