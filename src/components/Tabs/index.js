import { useEffect, useState, useRef } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

import styles from "./index.module.scss";
import React from "react";

const Tabs = ({ index = 0, tabs = [], children, onChange }) => {
  const navRef = useRef();
  const lineRef = useRef();

  const [activeIndex, setActiveIndex] = useState(index);

  const changeTab = (index) => {
    setActiveIndex(index);
    onChange(index);
  };

  // https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html
  // https://github.com/facebook/react/issues/14830
  useEffect(() => {
    setActiveIndex(index);
  }, [index]);

  useEffect(() => {
    // TODO: 清理上一次的 animate

    const activeTab = navRef.current.children[activeIndex];

    const activeTabWidth = activeTab.offsetWidth || 60;
    // 注意：第一次获取 offsetLeft 值为 0 ，以后每次获取为 8
    //      所以，设置默认值 8，让所有情况下 offsetLeft 值都相同
    const activeOffsetLeft = activeTab.offsetLeft || 8;
    const tabWidth = navRef.current.offsetWidth || 289;

    const to = activeOffsetLeft - (tabWidth - activeTabWidth) / 2;
    // navRef.current.scrollLeft = to
    const from = navRef.current.scrollLeft;
    const frames = Math.round((0.2 * 1000) / 16);
    let count = 0;
    function animate() {
      navRef.current.scrollLeft += (to - from) / frames;

      if (++count < frames) {
        requestAnimationFrame(animate);
      }
    }

    animate();

    // window.innerWidth / 375： 手动处理 JS 移动端适配
    // 说明：15 表示 Line 宽度的一半
    lineRef.current.style.transform = `translateX(${
      activeOffsetLeft + activeTabWidth / 2 - 15 * (window.innerWidth / 375)
    }px)`;

    // 注意： 由于 tabs 数据是动态获取的，所以，为了能够在 tabs 数据加载完成后
    //       获取到 tab，所以，此处将 tabs 作为依赖项。
    //       否则，会导致 navRef.current.children[activeIndex] 拿到的是 line 而不是第一个tab
  }, [activeIndex, tabs]);

  return (
    <div className={styles.root}>
      <div className="tabs">
        <div className="tabs-wrap">
          <div className="tabs-nav" ref={navRef}>
            {tabs.map((item, i) => (
              <div
                className={classnames("tab", i === activeIndex ? "active" : "")}
                key={i}
                onClick={() => changeTab(i)}
              >
                <span>{item.name}</span>
              </div>
            ))}
            <div className="tab-line" ref={lineRef}></div>
          </div>
        </div>

        <div className="tabs-content">
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, {
              activeId: tabs[activeIndex]?.id || 0,
            });
          })}
        </div>
      </div>
    </div>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.array.isRequired,
  children: PropTypes.arrayOf(PropTypes.element),
};

export default Tabs;
