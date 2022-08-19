import NavBar from "@/components/NavBar";
import { RootType } from "@/store";
import { ClearHistory, setSuggestion } from "@/store/action/search";
import classnames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Iconfont from "../../components/Iconfont";
import styles from "./index.module.scss";
import { SetHistory } from "@/store/action/search";
import { ClearSearchResult, SetSearchResult } from "@/utils/localStorage";
const Search = () => {
  const history = useHistory();
  let [SearchKey, ChangeKey] = useState("");
  let [isSearching, setIsSearching] = useState(true);
  let timer = useRef(0);
  let dispatch = useDispatch();
  let suggest = useSelector((v: RootType) => v.Search.searchResult);
  let getHistory = useSelector((v: RootType) => v.Search.SetSearchHistory);
  useEffect(() => {
    if (SearchKey.trim().length === 0) {
      return setIsSearching(false);
    } else {
      return setIsSearching(true);
    }
  }, [SearchKey]);
  function UpdateKey(e: React.ChangeEvent<HTMLInputElement>) {
    ChangeKey(e.target.value);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      dispatch(setSuggestion(e.target.value));
    }, 500);
  }

  function goSearch(data: string) {
    dispatch(SetHistory(data));
    SetSearchResult(data);
    history.push("/searchlist?keyword=" + data);
  }
  function clearHistory() {
    ClearSearchResult();
    dispatch(ClearHistory());
  }
  function ClearWorld() {
    ChangeKey("");
  }
  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar
        className="navbar"
        onClose={() => history.go(-1)}
        extra={
          <span className="search-text" onClick={() => goSearch(SearchKey)}>
            搜索
          </span>
        }
      >
        <div className="navbar-search">
          <Iconfont type="icon-sousuo" className="icon-search" />

          <div className="input-wrapper">
            {/* 输入框 */}
            <input
              type="text"
              placeholder="请输入关键字搜索"
              value={SearchKey}
              onChange={(e) => UpdateKey(e)}
            />

            {/* 清空输入框按钮 */}
            <Iconfont
              type="icon-close"
              className="icon-close"
              onClick={() => ClearWorld()}
            />
          </div>
        </div>
      </NavBar>

      {/* 搜索历史 */}

      <div
        className="history"
        style={{ display: isSearching ? "none" : "block" }}
      >
        <div className="history-header">
          <span>搜索历史</span>
          <span onClick={() => clearHistory()}>
            <Iconfont type="iconbtn_del" />
            清除全部
          </span>
        </div>

        <div className="history-list">
          {getHistory.map((v, ind) => {
            return (
              <span
                className="history-item"
                key={ind}
                onClick={() => goSearch(v)}
              >
                {v}
                <span className="divider"></span>
              </span>
            );
          })}
        </div>
      </div>
      {/* 搜素建议结果列表 */}
      {isSearching && (
        <div className={classnames("search-result", "show")}>
          {suggest.map((v) => {
            if (v === null) {
              return "";
            }
            let result = v.replace(new RegExp(SearchKey, "gi"), (match) => {
              return `<span>${match}</span>`;
            });

            return (
              <div className="result-item" key={v} onClick={() => goSearch(v)}>
                <Iconfont className="icon-search" type="icon-sousuo" />
                <div
                  className="result-value"
                  dangerouslySetInnerHTML={{
                    __html: result,
                  }}
                ></div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Search;
