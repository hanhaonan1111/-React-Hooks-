import React, { useEffect, useState } from "react";
import Tabs from "@/components/Tabs";
import style from "./index.module.scss";
import Iconfont from "@/components/Iconfont";
import { useDispatch, useSelector } from "react-redux";
import { DelPannal, GetChannalAsync, SetActive } from "@/store/action/home";
import { Drawer, Toast } from "antd-mobile";
import SideBar from "./component/sideBar";
import ArticalList from "./component/ArticalList";
import FeedbackActionMenu from "./component/Feedback";
import { Channal } from "@/store/reducer/home";
import { RootType } from "@/store";
import { useHistory } from "react-router-dom";

export default function Home() {
  let channal = useSelector((value: RootType) => value.Home.channal);
  let [active, setActive] = useState(0);
  let dispatch = useDispatch();
  let history = useHistory();
  useEffect(() => {
    dispatch(GetChannalAsync());
  }, [dispatch]);
  useEffect(() => {
    dispatch(SetActive(channal[active]?.id));
  }, [active, dispatch]);

  let [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }
  function updateActive(index: number) {
    setActive(index);
  }
  async function handelClick(val: Channal, isEdit: boolean, index: number) {
    if (index === 0) {
      return Toast.info("推荐不能被删除哦!");
    }
    if (isEdit) {
      if (channal.length <= 4) {
        return Toast.info("至少保留4个频道哦!");
      }
      await dispatch(DelPannal(val));
      Toast.success("操作成功", 1);
      if (active > index) {
        setActive(active - 1);
      } else if (active === index) {
        setActive(0);
      }
    } else {
      close();
      setActive(index);
    }
  }

  return (
    <div className={style.root}>
      <Tabs
        index={active}
        tabs={channal}
        onChange={(i: number) => {
          updateActive(i);
        }}
      >
        {channal.map((ch: Channal) => (
          <ArticalList
            key={ch.id}
            channelId={ch.id}
            activeID={channal[active].id}
            className={channal[active].id !== ch.id ? "none" : ""}
          />
        ))}
      </Tabs>
      <div className="aa">
        <Iconfont
          type="icon-sousuo"
          onClick={() => {
            history.push("/search");
          }}
        ></Iconfont>
        <Iconfont
          type="icon-gengduo"
          onClick={() => {
            setOpen(true);
          }}
          className="more"
        ></Iconfont>
      </div>
      <Drawer
        className="my/-drawer"
        position="left"
        sidebar={
          open && (
            <SideBar handelClick={handelClick} active={active} close={close} />
          )
        }
        open={open}
      />

      <FeedbackActionMenu />
    </div>
  );
}
