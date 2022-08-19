import CommentItems from "@/components/CommentItem";
import NavBar from "@/components/NavBar";
import { NoComment } from "@/components/NoComment";
import { Sticky } from "@/components/Stiky";
import { RootType } from "@/store";
import {
  AsyncGetArticalCommentData,
  AsyncGetArticalData,
  ClearAllComment,
  GetArticalData,
} from "@/store/action/atrical";
import { CommentItem } from "@/store/reducer/artical";
import { Drawer } from "antd-mobile";
import { InfiniteScroll } from "antd-mobile-v5";

import classNames from "classnames";
import "highlight.js/styles/vs2015.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import CommentFooter from "./components/FootTab";
import CommentInput from "./components/ReplayInput";
import CommentReply from "./components/ReplayUi";
import styles from "./index.module.scss";

function ArticleView() {
  const history = useHistory();
  let params = useParams<{ id: string }>();
  let dispatch = useDispatch();
  let Content = useSelector((v: RootType) => v.ArticalReducer.articalData);
  let ArticalReducer = useSelector((v: RootType) => v.ArticalReducer);
  let AllComment = useSelector(
    (v: RootType) => v.ArticalReducer.ArticalAllComment
  );
  let authorRef = useRef<HTMLDivElement>(null);
  let [ShowAuther, setShowAuther] = useState(false);
  let timer = -1;
  let CommentTop = useRef<HTMLDivElement>(null);

  function scrollEvent() {
    function isShowAuther() {
      let juli = authorRef.current?.getBoundingClientRect();

      if (juli?.top! < 0) {
        setShowAuther(true);
      } else {
        setShowAuther(false);
      }
    }
    if (timer !== -1) return;
    timer = window.setTimeout(() => {
      isShowAuther();
      timer = -1;
    }, 300);
  }
  useEffect(() => {
    let wrapper = document.querySelector(".wrapper");
    wrapper?.addEventListener("scroll", scrollEvent);
    dispatch(AsyncGetArticalData(params.id));

    return () => {
      wrapper?.removeEventListener("scroll", scrollEvent);
      dispatch(GetArticalData({}));
      dispatch(ClearAllComment());
    };
  }, [dispatch]);
  function Comment(CommentId: number) {
    let artitiude = ["无态度", "不喜欢", "点赞"];
    return artitiude[CommentId + 1];
  }
  let AjaxIng = false;
  async function loadMore() {
    if (AjaxIng) return;
    AjaxIng = true;
    await dispatch(
      AsyncGetArticalCommentData(
        "a",
        params.id,
        ArticalReducer.ArticalAllComment.last_id
      )
    );
    hasMore();
  }
  let [more, SetMore] = useState(true);
  function hasMore() {
    if (AllComment.end_id === AllComment.last_id && AllComment.end_id) {
      SetMore(false);
    } else {
      SetMore(true);
    }
  }
  let [top, setTop] = useState(0);
  let nav = document.querySelector(".nav") as HTMLDivElement;
  useEffect(() => {
    function Scroll() {
      let c = CommentTop.current!.getBoundingClientRect();
      setTop(c.top);
      setNavHeight(nav?.offsetHeight);
    }
    let wrapper = document.querySelector(".wrapper")!;
    wrapper.addEventListener("scroll", Scroll);
    return () => {
      wrapper!.removeEventListener("scroll", Scroll);
    };
  }, [nav]);
  let [NavHeight, setNavHeight] = useState(0);
  function ScrollComment() {
    let wrapper = document.querySelector(".wrapper");
    setNavHeight(nav?.offsetHeight);
    wrapper!.scrollTop = CommentTop.current!.offsetTop - nav!.offsetHeight;
  }

  let [isOpen, setIsOpen] = useState(false);

  let [replayOpen, setReplayOpen] = useState(false);
  let [NormalComment, setNormalComment] = useState({} as CommentItem);
  return (
    <div className={styles.root}>
      <div className="root-wrapper">
        {/* 顶部导航栏 */}
        <div className="nav">
          <NavBar onClose={() => history.replace("/home")}>
            {ShowAuther ? (
              <div className="nav-author">
                <img src={Content.aut_photo} alt="" />
                <span className="name">{Content.aut_name}</span>
                <span
                  className={classNames(
                    "follow",
                    Content.is_followed ? "followed" : "follow"
                  )}
                >
                  {Content.is_followed ? "已关注" : "关注"}
                </span>
              </div>
            ) : (
              ""
            )}
          </NavBar>
        </div>
        <>
          {Content && (
            <div className="wrapper">
              <div className="article-wrapper">
                {/* 文章描述信息栏 */}
                <div className="header">
                  <h1 className="title">{Content.title}</h1>

                  <div className="info">
                    <span>{Content.pubdate}</span>
                    <span>{Content.read_count} 阅读</span>

                    <span>{Comment(Content.attitude)} </span>
                    <span>{Content.comm_count} 评论</span>
                  </div>

                  <div className="author" ref={authorRef}>
                    <img src={Content.aut_photo} alt="" />
                    <span className="name">{Content.aut_name}</span>
                    <span
                      className={Content.is_followed ? "followed" : "follow"}
                    >
                      {Content.is_followed ? "已关注" : "去关注"}
                    </span>
                  </div>
                </div>

                {/* 文章正文内容区域 */}
                <div className="content">
                  <div
                    className="content-html dg-html"
                    dangerouslySetInnerHTML={{ __html: Content.content }}
                  ></div>
                  <div className="date">发布文章时间：{Content.pubdate}</div>
                </div>
              </div>
              <div ref={CommentTop}></div>
              {/* 评论的顶部(全部评论) */}
              <Sticky top={top} NavHeight={NavHeight}>
                <NavBar
                  showLeft={false}
                  children={`全部评论(${AllComment.total_count}条)`}
                ></NavBar>
              </Sticky>
              {AllComment.results?.length === 0 ? (
                <NoComment />
              ) : (
                AllComment.results?.map((v: any, index: number) => {
                  return (
                    <div key={index}>
                      <CommentItems
                        value={v}
                        onClick={() => {
                          setReplayOpen(true);
                          setNormalComment(v);
                        }}
                      ></CommentItems>
                    </div>
                  );
                })
              )}

              {AllComment.total_count !== 0 && (
                <InfiniteScroll
                  hasMore={more}
                  threshold={1}
                  loadMore={loadMore}
                />
              )}
            </div>
          )}
        </>
        <CommentFooter
          ScrollComment={ScrollComment}
          total_count={AllComment.total_count}
          geComment={() => setIsOpen(true)}
        />
      </div>

      <Drawer
        className="drawer"
        position="bottom"
        style={{ height: document.documentElement.clientHeight }}
        sidebar={
          replayOpen && (
            <CommentReply
              v={NormalComment}
              onClose={() => setReplayOpen(false)}
            />
          )
        }
        open={replayOpen}
        enableDragHandle
        onOpenChange={() => setReplayOpen(false)}
      ></Drawer>

      <Drawer
        className="drawer"
        position="bottom"
        style={{ height: document.documentElement.clientHeight }}
        sidebar={isOpen && <CommentInput close={() => setIsOpen(false)} />}
        open={isOpen}
        enableDragHandle
        onOpenChange={() => setIsOpen(false)}
      ></Drawer>
    </div>
  );
}

export default ArticleView;
