import Input from "@/components/Input";
import NavBar from "@/components/NavBar";
import { GetData } from "@/store/action/my";
import { GetStorage } from "@/utils/localStorage";
import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import io from "socket.io-client";
import styles from "./index.module.scss";
/**
 * 1.导包 创建soket实例
 * 2.客户端 服务端 建立连接(完成握手)
 * 3.发送数据使用emit()方法
 * 4.接受数据使用接口规定的事件
 * 5.聊天列表信息发生变化,需要立刻滚动滚动条
 * 6.关闭窗口或建立下一次连接时候断开连接
 */
export default function Chat() {
  let user = useSelector((v) => v.User.ShowData);
  let message = [];
  let ref = useRef("");
  let div = useRef(null);
  let [msg, setMsg] = useState(message);
  let [value, setValue] = useState("");
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetData());
  }, [dispatch]);
  let token = GetStorage();
  useEffect(() => {
    let soket = io("http://toutiao.itheima.net", {
      query: {
        token: token.token,
      },
      transports: ["websocket"],
    });
    ref.current = soket;
    soket.on("connect", () => {
      setMsg((msg) => [
        ...msg,
        { type: "self", message: "你好啊,我们聊聊吧!" },
      ]);
    });
    /**接受消息 */
    soket.on("message", (data) => {
      setMsg((msg) => [...msg, { type: "self", message: data.msg }]);
    });
    return () => soket.close();
  }, [token.token]);
  useEffect(() => {
    div.current.scrollTop = div.current.scrollHeight;
  }, [msg]);
  function sendMsg(e) {
    if (e.key === "Enter") {
      if (value.length === 0) return;

      setMsg([
        ...msg,
        {
          type: "user",
          message: value,
        },
      ]);
      /**发送消息 */
      ref.current.emit("message", {
        msg: value,
        timestamp: +new Date(),
      });
      setValue("");
    }
  }
  return (
    <div className={styles.root}>
      <NavBar className="fixed-header">小智同学</NavBar>
      <div className="chat-list" ref={div}>
        {msg.map((v, index) => {
          return (
            <div className={classNames("chat-item", v.type)} key={index}>
              <img
                src={
                  v.type === "self"
                    ? "https://img1.baidu.com/it/u=1135489965,542805531&fm=253&fmt=auto&app=138&f=JPEG?w=159&h=176"
                    : user?.photo
                }
                alt=""
              />
              <div className="message">{v.message}</div>
            </div>
          );
        })}
      </div>

      <div className="input-footer">
        <Input
          className="no-border"
          placeholder="请描述您的问题"
          style={{ width: "100%" }}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onKeyUp={sendMsg}
        />
      </div>
    </div>
  );
}
