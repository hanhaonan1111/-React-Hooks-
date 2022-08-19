import React from "react";
import Icon from "@/components/Iconfont";
import style from "./layout.module.scss";
import classNames from "classnames";
import { Route, useHistory, useLocation, Switch } from "react-router-dom";
import My from "../my";
import Home from "../home";
import AuthRoute from "@/components/AuthRoute";
import KeepAlive from "@/components/KeepAlive";
export default function Layout() {
  let { pathname } = useLocation();
  let history = useHistory();

  let tabBar = [
    {
      name: "首页",
      icon_type: "icon-home",
      select_type: "icon-Home",
      path: "/home/index",
    },
    {
      name: "问答",
      icon_type: "icon-xiaoxi",
      select_type: "icon-xiaoxi1",
      path: "/home/qa",
    },
    {
      name: "视频",
      icon_type: "icon-shipinbofang",
      select_type: "icon-shipin",
      path: "/home/video",
    },
    {
      name: "我的",
      icon_type: "icon-wode",
      select_type: "icon-wode1",
      path: "/home/my",
    },
  ];
  function refreshTab(path: string) {
    history.push(path);
  }
  return (
    <>
      {/* 主题区域 */}
      <KeepAlive
        path="/home/index"
        exact
        component={Home}
        alivePath="/home/index"
      ></KeepAlive>
      <Switch>
        {/* <Route path="/home/index" exact component={Home}></Route> */}
        <AuthRoute path="/home/my" exact component={My} />
      </Switch>
      {/* 底部tab栏 */}
      <div className={style.root}>
        <div className="tabbar">
          {tabBar.map((v, i) => {
            return (
              <div
                onClick={() => refreshTab(v.path)}
                key={i}
                className={classNames(
                  "tabbar-item",
                  pathname === v.path ? "tabbar-item-active" : ""
                )}
              >
                <Icon
                  type={pathname === v.path ? v.select_type : v.icon_type}
                />
                <span>{v.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
