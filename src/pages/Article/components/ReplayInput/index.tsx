import NavBar from "@/components/NavBar";
import { AsyncSendComment } from "@/store/action/atrical";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./index.module.scss";

type PropType = {
  close?: () => void;
  id?: string | null;
};
function CommentInput({ close, id }: PropType) {
  let TextArea = useRef<HTMLTextAreaElement>(null);
  let dispatch = useDispatch();
  let params = useParams<{ id: string }>();
  let art_id = params.id;
  let [text, setText] = useState("");
  function SetValue(e: any) {
    setText(e.target.value);
  }
  useEffect(() => {
    return () => {
      setText("");
    };
  }, []);

  function sendComment() {
    if (id) {
      dispatch(AsyncSendComment({ target: id, content: text, art_id: art_id }));
    } else {
      dispatch(AsyncSendComment({ target: art_id, content: text }));
    }

    close!();
  }
  return (
    <div className={styles.root}>
      <NavBar
        onClose={close}
        extra={
          <span className="publish" onClick={sendComment}>
            发表
          </span>
        }
      >
        回复评论
      </NavBar>
      <div className="input-area">
        <textarea
          placeholder="说点什么~"
          ref={TextArea}
          value={text}
          onChange={SetValue}
        />
      </div>
    </div>
  );
}
export default CommentInput;
