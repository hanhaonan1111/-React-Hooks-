import NavBar from "@/components/NavBar";
import ArticleItem from "@/pages/home/component/ArticalItem";
import { ClearArtical, SetHasMore, SetResultList } from "@/store/action/search";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./index.module.scss";
import { RootType } from "@/store/index";
import { InfiniteScroll } from "antd-mobile-v5";

function SearchResult() {
  let page = useRef(0);
  let query = useLocation();
  let history = useHistory();
  let keyword = new URLSearchParams(query.search).get("keyword")!;
  let dispatch = useDispatch();
  let hasMore = useSelector((v: RootType) => v.Search.ArticalHasMore);
  let [isLoading, SetisLoading] = useState(false);
  if (keyword) {
  } else {
    history.push("/search");
  }
  useEffect(() => {
    // 组件销毁之时,初始化所有配置选项
    return () => {
      SetisLoading(false);
      page.current = 0;
      dispatch(SetHasMore(true));
      dispatch(ClearArtical());
    };
  }, [dispatch]);

  let articals = useSelector((v: RootType) => v.Search.SearchArticalRseult);
  // 加载更多
  async function loadMore() {
    if (isLoading) return;
    SetisLoading(true);
    page.current++;
    try {
      await dispatch(SetResultList(page.current, keyword));
    } catch (e) {
      page.current--;
    } finally {
      SetisLoading(false);
    }
  }

  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar className="tab">搜索结果</NavBar>

      <div className="article-list">
        <div>
          {articals.map((v) => {
            return (
              <div key={v.art_id}>
                <ArticleItem value={v} className=""></ArticleItem>
              </div>
            );
          })}
          <InfiniteScroll hasMore={hasMore} threshold={5} loadMore={loadMore} />
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
