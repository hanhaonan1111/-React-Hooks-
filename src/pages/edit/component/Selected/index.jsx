import styles from "./index.module.scss";
import React from "react";
import { useDispatch } from "react-redux";
import { PutEditInfo } from "@/store/action/my";

export default function Selected({ onClose, option, content, open, dom }) {
  let dispatch = useDispatch();

  function UpdateData(val) {
    if (content === "sex") {
      dispatch(PutEditInfo({ gender: val === "男" ? 0 : 1 }));
    } else {
      dom.current.click();
    }

    onClose();
  }

  return (
    <div className={styles.root}>
      {open &&
        option
          .find((v) => {
            return v.type === content;
          })
          .content.map((val) => (
            <div
              onClick={() => {
                UpdateData(val);
              }}
              key={val}
              className="list-item"
            >
              {val}
            </div>
          ))}

      <div className="list-item" onClick={onClose}>
        取消
      </div>
    </div>
  );
}
