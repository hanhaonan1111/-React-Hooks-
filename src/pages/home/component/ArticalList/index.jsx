import { AsyncGetArtical } from "@/store/action/home";
import { InfiniteScroll, PullToRefresh } from "antd-mobile-v5";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ArticalItem from "../ArticalItem";
import style from "./index.module.scss";
export default function ArticalList({ channelId, className, activeID }) {
  let dispatch = useDispatch();
  let list = useSelector((v) => v.Home.artical);
  let [isLoad, setLoad] = useState(false);
  let [hasMore, setHasMore] = useState(true);
  let articals = list[activeID]?.list || [];
  let history = useHistory();
  useEffect(() => {
    if (activeID === channelId) {
      if (Object.keys(list).includes("" + activeID)) {
      } else {
        dispatch(AsyncGetArtical({ channelId, time: +new Date() }));
      }
    }
  }, [activeID, channelId, dispatch, list]);
  function LookDetail(id) {
    history.push("/artical/" + id);
  }
  async function loadMore() {
    if (isLoad) return;
    if (!list[channelId]) return;
    if (list[channelId].timestamp === null) return setHasMore(false);
    setLoad(true);
    try {
      await dispatch(
        AsyncGetArtical({
          channelId,
          time: list[channelId].timestamp,
          load: true,
        })
      );
    } finally {
      setLoad(false);
    }
  }
  return (
    <>
      <PullToRefresh
        threshold={100}
        onRefresh={async () => {
          await dispatch(AsyncGetArtical({ channelId, time: +new Date() }));
          setHasMore(true);
        }}
      >
        <div className={[style.root, className].join(" ")}>
          {articals?.map((v, i) => (
            <div
              className="article-item"
              key={i}
              onClick={() => LookDetail(v.art_id)}
            >
              <ArticalItem value={v} />
            </div>
          ))}

          <InfiniteScroll hasMore={hasMore} threshold={5} loadMore={loadMore} />
        </div>
      </PullToRefresh>
    </>
  );
}
