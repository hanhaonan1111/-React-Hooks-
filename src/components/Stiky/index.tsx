import { useEffect, useRef } from "react";
import styles from "./index.module.scss";
type PropsType = {
  children: JSX.Element;
  top: number;
  NavHeight: number;
};
export const Sticky = ({ children, top, NavHeight }: PropsType) => {
  let placeholder = useRef<HTMLDivElement>(null);
  let container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (NavHeight > top) {
      placeholder.current!.style.height =
        container.current!.offsetHeight + "px";
      container.current!.style.position = "fixed";
      container.current!.style.left = 0 + "px";
      container.current!.style.top = container.current!.offsetHeight + "px";
    } else {
      placeholder.current!.style.height = 0 + "px";
      container.current!.style.position = "static";
      container.current!.style.left = "auto";
      container.current!.style.top = "auto";
    }
  }, [NavHeight, top]);

  return (
    <div className={styles.root}>
      {/* 占位元素 */}
      <div className="sticky-placeholder" ref={placeholder} />

      {/* 吸顶显示的元素 */}
      <div className="sticky-container" ref={container}>
        {children}
      </div>
    </div>
  );
};
