import noCommentImage from "@/assets/none.png";
import styles from "./index.module.scss";

export const NoComment = () => {
  return (
    <div className={styles.root}>
      <img src={noCommentImage} alt="" />
      <p className="no-comment">还没有人评论哦</p>
    </div>
  );
};
