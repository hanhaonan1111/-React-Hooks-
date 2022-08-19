import Iconfont from "@/components/Iconfont";
import { AddPannal, GetAllPannals } from "@/store/action/home";
import { Toast } from "antd-mobile";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styles from "./index.module.scss";
export default function SideBar({ close, active, handelClick }) {
  let channal = useSelector((v) => v.Home);
  let [isEdit, setEdit] = useState(false);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllPannals());
  }, [dispatch]);

  let Recommend = useSelector((v) => {
    let list = v.Home.channal;
    let id = list.map((val) => {
      return val.id;
    });

    let all = v.Home.allChannal;
    let recommend = all.filter((val) => {
      if (id.includes(val.id)) {
        return false;
      } else {
        return val;
      }
    });
    return recommend;
  });
  async function addPannal(v) {
    await dispatch(AddPannal(v));
    Toast.success("添加成功", 1);
  }
  return (
    <div className={styles.root}>
      <div className="channel-header">
        <Iconfont type="icon-close" onClick={close} />
      </div>
      <div className="channel-content">
        <div className="channel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">
              {!isEdit ? "点击进入频道" : "点击删除频道"}
            </span>
            <span
              className="channel-item-edit"
              onClick={() => setEdit(!isEdit)}
            >
              {!isEdit ? "编辑" : "保存"}
            </span>
          </div>
          <div className="channel-list">
            {channal.channal.map((v, index) => {
              return (
                <div
                  onClick={() => handelClick(v, isEdit, index)}
                  key={v.id}
                  className={classNames(
                    "channel-list-item",
                    active === index ? "selected" : ""
                  )}
                >
                  <span>{v.name}</span>
                  {isEdit && index !== 0 ? (
                    <span className="close">x</span>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        <div className="channel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">频道推荐</span>
            <span className="channel-item-title-extra">点击添加频道</span>
          </div>
          <div className="channel-list">
            {Recommend &&
              Recommend.map((v) => {
                return (
                  <span
                    key={v.id}
                    onClick={() => {
                      addPannal(v);
                    }}
                    className="channel-list-item"
                  >
                    {v.name}
                  </span>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
