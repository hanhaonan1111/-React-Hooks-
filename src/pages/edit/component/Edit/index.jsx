import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import NavBar from "@/components/NavBar";
import TextArea from "@/components/TextArea";
import Input from "@/components/Input";
import { useSelector } from "react-redux";
export default function EditDeraw({ children, open, submit, ...rest }) {
  let store = useSelector((v) => v.User.EditData);
  let [state, setState] = useState("");
  let [name, setName] = useState("");

  useEffect(() => {
    setState(store.intro);
    setName(store.name);
  }, [store.intro, store.name]);
  useEffect(() => {
    if (open) {
      setState(store.intro);
      setName(store.name);
    }
  }, [open, store.intro, store.name]);
  return (
    <div className={styles.root}>
      <NavBar
        {...rest}
        children={children}
        extra={
          <span
            onClick={() => {
              submit({ state, name });
            }}
            style={{ color: "orange" }}
          >
            提交
          </span>
        }
      ></NavBar>

      {open ? (
        children === "简介" ? (
          <TextArea
            onChange={(e) => {
              setState(e.target.value);
            }}
            className="wrapper"
            value={state}
            maxLength={100}
          />
        ) : (
          <Input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="wrapper input_style"
          />
        )
      ) : null}
    </div>
  );
}
