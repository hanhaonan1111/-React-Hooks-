import Icon from "@/components/Iconfont";
import { AsyncReport, CloseModel, Dislick } from "@/store/action/home";
import { Modal } from "antd-mobile";
import { Toast } from "antd-mobile";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.scss";

function FeedbackActionMenu() {
  const [type, setType] = useState("normal");
  let open = useSelector((v) => v.Home.MoreAction);
  let dispatch = useDispatch();
  const onClose = async () => {
    await dispatch(CloseModel());
    setType("normal");
  };
  async function dislickFn() {
    await dispatch(Dislick(open.art_id));
    Toast.info("OK");
    onClose();
  }

  let report_item = [
    "标题夸张",
    "低俗色情",
    "错别字多",
    "旧闻重复",
    "广告软文",
    "内容不实",
    "涉嫌违法犯罪",
    "侵权",
  ];
  async function FunBadContent(i) {
    let data = {
      target: open.art_id,
      type: i,
    };
    await dispatch(AsyncReport(data));
    Toast.success("成功!");
    onClose();
  }
  return (
    <div className={styles.root}>
      <Modal
        className="more-action-modal"
        transparent
        maskClosable
        footer={[]}
        onClose={onClose}
        visible={open.open}
      >
        <div className="more-action">
          {type === "normal" && (
            <>
              <div className="action-item" onClick={dislickFn}>
                <Icon type="iconicon_unenjoy1" /> 不感兴趣
              </div>
              <div className="action-item" onClick={() => setType("junk")}>
                <Icon type="iconicon_feedback1" />
                <span className="text">反馈垃圾内容</span>
                <Icon type="icon-qianjin-shi" />
              </div>
              <div className="action-item">
                <Icon type="iconicon_blacklist" /> 拉黑作者
              </div>
            </>
          )}

          {type === "junk" && (
            <>
              <div className="action-item" onClick={() => setType("normal")}>
                <Icon type="icon-ffanhui-" />
                <span className="back-text">反馈垃圾内容</span>
              </div>
              {report_item.map((v, i) => {
                return (
                  <div
                    className="action-item"
                    key={i}
                    onClick={() => FunBadContent(i)}
                  >
                    {v}
                  </div>
                );
              })}

              <div className="action-item">
                <span className="text">其他问题</span>
                <Icon type="iconbtn_right" />
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default FeedbackActionMenu;
