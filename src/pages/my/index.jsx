import Icon from "@/components/Iconfont";
import { ClearData, GetData } from "@/store/action/my";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styles from "./index.module.scss";
import { useSelector } from "react-redux";
import { RemoveStorage } from "@/utils/localStorage";
import { Dialog } from "antd-mobile-v5";

const Profile = () => {
  const history = useHistory();
  let dispatch = useDispatch();
  let store = useSelector((val) => val.User.ShowData);

  useEffect(() => {
    dispatch(GetData());
  }, [dispatch]);

  return (
    <div className={styles.root}>
      <div className="profile">
        {/* 顶部个人信息区域 */}
        <div className="user-info">
          <div className="avatar">
            <img src={store.photo} alt="" />
          </div>
          <div className="user-name">{store.name}</div>
          <Link to="/profile/edit">
            个人信息 <Icon type="iconbtn_right" />
          </Link>
        </div>

        {/* 今日阅读区域 */}
        <div className="read-info">
          <Icon type="iconbtn_readingtime" />
          今日阅读 <span>10</span> 分钟
        </div>

        {/* 统计信息区域 */}
        <div className="count-list">
          <div className="count-item">
            <p>{store.art_count}</p>
            <p>动态</p>
          </div>
          <div className="count-item">
            <p>{store.follow_count}</p>
            <p>关注</p>
          </div>
          <div className="count-item">
            <p>{store.fans_count}</p>
            <p>粉丝</p>
          </div>
          <div className="count-item">
            <p>{store.like_count}</p>
            <p>被赞</p>
          </div>
        </div>

        {/* 主功能菜单区域 */}
        <div className="user-links">
          <div className="link-item">
            <Icon type="icon-xiaoxi2" />
            <div>消息通知</div>
          </div>
          <div className="link-item">
            <Icon type="icon-wodeguanzhu" />
            <div>收藏</div>
          </div>
          <div className="link-item">
            <Icon type="icon-liulanlishi" />
            <div>浏览历史</div>
          </div>
          <div className="link-item">
            <Icon type="icon-wodezuopin" />
            <div>我的作品</div>
          </div>
        </div>
      </div>

      {/* 更多服务菜单区域 */}
      <div className="more-service">
        <h3>更多服务</h3>
        <div className="service-list">
          <div
            className="service-item"
            onClick={() => history.push("/profile/feedback")}
          >
            <Icon type="iconbtn_feedback" />
            <div>用户反馈</div>
          </div>
          <div
            className="service-item"
            onClick={() => history.push("/profile/chat")}
          >
            <Icon type="iconbtn_xiaozhitongxue" />
            <div>小智同学</div>
          </div>
        </div>
      </div>
      <h3
        className="Logout"
        onClick={async () => {
          const result = await Dialog.confirm({
            content: "你确定要退出吗?",
          });
          if (result) {
            await dispatch(ClearData());
            RemoveStorage();
            history.push("/login");
          }
        }}
      >
        退出登陆
      </h3>
      {/* <Button
        block
        className="Logout"
        onClick={async () => {
          const result = await Dialog.confirm({
            content: "人在天边月上明",
          });
          if (result) {
            dispatch(ClearData());
            RemoveStorage();
            history.push("/login");
          }
        }}
      >
        退出登陆
      </Button> */}
    </div>
  );
};

export default Profile;
