import classnames from "classnames";
import Icon from "@/components/Iconfont";
import styles from "./index.module.scss";
import Img from "@/components/LazyLoad/Img";
import { GetStorage } from "@/utils/localStorage";
import { useDispatch } from "react-redux";
import { updateState } from "@/store/action/home";
import { useHistory } from "react-router-dom";
const ArticleItem = ({ value: v, className }) => {
  const type = v.cover.type;
  const images = v.cover.images;
  let dispatch = useDispatch();
  let history = useHistory();
  function LookDetail(id) {
    history.push("/artical/" + id);
  }
  return (
    <div className={styles.root}>
      <div
        onClick={() => LookDetail(v.art_id)}
        className={classnames(
          "article-content",
          type === 3 ? "t3" : "",
          type === 0 ? "none-mt" : ""
        )}
      >
        <h3>{v.title}</h3>
        {type !== 0 && (
          <div className="article-imgs">
            {images.map((item, i) => (
              <div className="article-img-wrapper" key={i}>
                <Img src={item} alt="" />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={classnames("article-info", type === 0 ? "none-mt" : "")}>
        <span>{v.aut_name}</span>
        <span>{v.comm_count} 评论</span>
        <span>{v.pubdate}</span>

        {GetStorage().token && (
          <span className="close">
            <Icon
              type="icon-close"
              onClick={() => {
                dispatch(updateState(v.art_id));
              }}
            />
          </span>
        )}
      </div>
    </div>
  );
};

export default ArticleItem;
