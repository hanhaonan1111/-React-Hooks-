import Icon from "@/components/Iconfont";
import { RootType } from "@/store";
import { AsyncDianZan } from "@/store/action/atrical";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./index.module.scss";

const CommentFooter = ({
  showPart = true,
  total_count,
  ScrollComment,
  geComment,
}: any) => {
  let dispatch = useDispatch();
  let params = useParams<{ id: string }>();
  let { articalData } = useSelector((v: RootType) => v.ArticalReducer);
  function DianZan() {
    dispatch(AsyncDianZan(params.id));
  }
  return (
    <div className={styles.root}>
      <div className="input-btn" onClick={geComment}>
        <Icon type="iconbianji" />
        <span>去评论</span>
      </div>
      {showPart && (
        <>
          <div className="action-item" onClick={ScrollComment}>
            <Icon type="icon-pinglun" />
            <p>评论</p>
            {total_count! > 0 && <span className="bage">{total_count}</span>}
          </div>
          <div className="action-item" onClick={DianZan}>
            {articalData.attitude === 1 ? (
              <Icon type="icon-zan1" />
            ) : (
              <Icon type="icon-zan" />
            )}

            <p>点赞</p>
          </div>
          <div className="action-item">
            <Icon type="icon-shoucang" />
            <p>收藏</p>
          </div>
        </>
      )}

      <div className="action-item">
        <Icon type="icon-qianjin-shi" />
        <p>分享</p>
      </div>
    </div>
  );
};

export default CommentFooter;
