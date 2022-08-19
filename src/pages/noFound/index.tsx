import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

export default function NoFound() {
  let history = useHistory();
  let [count, setCount] = useState(3);
  let ref = useRef(-1);

  useEffect(() => {
    let timer = window.setInterval(() => {
      if (ref.current === 1) {
        history.replace("/home/index");
      }
      setCount((count) => {
        ref.current = count;
        return count - 1;
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [history]);
  return (
    <div>
      <h1>404</h1>
      <h2>Not Found</h2>

      <h3>
        {count} 秒后,跳回{" "}
        <i
          style={{ color: "blue" }}
          onClick={() => {
            history.replace("/home/index");
          }}
        >
          首页
        </i>
      </h3>
    </div>
  );
}
