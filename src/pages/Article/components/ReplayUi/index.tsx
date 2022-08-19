import CommentItems from "@/components/CommentItem";
import NavBar from "@/components/NavBar";
import { NoComment } from "@/components/NoComment";
import { RootType } from "@/store";
import { AsyncGetReplayCom, ClearReplayComment } from "@/store/action/atrical";
import { CommentItem } from "@/store/reducer/artical";
import { Drawer } from "antd-mobile";
import { InfiniteScroll } from "antd-mobile-v5";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentFooter from "../FootTab";
import CommentInput from "../ReplayInput";
import styles from "./index.module.scss";

type Props = {
  v?: CommentItem;
  onClose?: () => void;
};
function CommentReply({ onClose, v }: Props) {
  let dispatch = useDispatch();
  let { AgainReplay } = useSelector((v: RootType) => v.ArticalReducer);
  let [more, setMore] = useState(true);
  useEffect(() => {
    dispatch(
      AsyncGetReplayCom({
        type: "c",
        source: v!.com_id,
        offset: "",
      })
    );
    return () => {
      dispatch(ClearReplayComment());
    };
  }, []);
  async function loadMore() {
    await dispatch(
      AsyncGetReplayCom({
        type: "c",
        source: v!.com_id,
        offset: AgainReplay.last_id ? AgainReplay.last_id : "",
      })
    );

    if (
      AgainReplay.end_id === AgainReplay.last_id &&
      AgainReplay.end_id !== undefined
    ) {
      setMore(false);
    }
  }
  let [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.root}>
      <div className="reply-wrapper">
        {/* 顶部导航栏 */}
        <NavBar className="transparent-navbar" onClose={onClose}>
          {AgainReplay && <div>{AgainReplay.total_count}条回复</div>}
        </NavBar>

        {/* 原评论信息 */}
        <div className="origin-comment">
          <CommentItems value={v} showPart={false}></CommentItems>
        </div>

        {/* 回复评论的列表 */}
        <div className="reply-list">
          <div className="reply-header">全部回复</div>
          {AgainReplay.total_count ? (
            <>
              {AgainReplay.results?.map((v1, ind) => (
                <CommentItems
                  value={v1}
                  key={ind}
                  showPart={false}
                ></CommentItems>
              ))}
              <InfiniteScroll
                hasMore={more}
                loadMore={loadMore}
              ></InfiniteScroll>
            </>
          ) : (
            <NoComment />
          )}
        </div>
        <CommentFooter showPart={false} geComment={() => setIsOpen(true)} />

        <Drawer
          className="drawer"
          position="bottom"
          style={{ height: document.documentElement.clientHeight }}
          sidebar={
            <CommentInput
              id={v?.com_id} // 评论id
              close={() => {
                setIsOpen(false);
              }}
            />
          }
          open={isOpen}
          enableDragHandle
          onOpenChange={() => setIsOpen(false)}
        ></Drawer>
      </div>
    </div>
  );
}

export default CommentReply;
