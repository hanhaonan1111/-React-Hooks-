import Icon from "@/components/Iconfont";
import styles from "./index.module.scss";

const CommentItems = ({
  value,
  onClick,
  showPart = true,
}: {
  value: any;
  showPart?: boolean;
  onClick?: () => void;
}) => {
  return (
    <div className={styles.root} onClick={onClick}>
      {/* 评论者头像 */}
      <div className="avatar">
        <img src={value.aut_photo} alt="" />
      </div>

      <div className="comment-info">
        {/* 评论者名字 */}
        <div className="comment-info-header">
          <span className="name">{value.aut_name}</span>

          {/* 关注或点赞按钮 */}
          <span className="thumbs-up">
            <Icon type={!value.is_liking ? "icon-zanzan" : "icon-zan1"} />
          </span>
        </div>

        {/* 评论内容 */}
        <div className="comment-content">{value.content}</div>

        <div className="comment-footer">
          {/* 回复按钮 */}
          {showPart && (
            <span className="replay">
              {value.reply_count}回复
              <Icon type="icon-pinglun" />
            </span>
          )}

          {/* 评论日期 */}
          <span className="comment-time">{value.pubdate}</span>
        </div>
      </div>
    </div>
  );
};

export default CommentItems;
