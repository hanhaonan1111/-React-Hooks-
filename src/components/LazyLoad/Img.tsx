import { Icon } from "antd-mobile";
import classnames from "classnames";
import { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
interface Prop
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  className: string;
  src: string;
}

const Image = ({ className, src }: Prop) => {
  let [load, setLoad] = useState(true);
  let img = useRef<HTMLImageElement>(null);
  useEffect(() => {
    // let oberver = new IntersectionObserver(([{ isIntersecting }]) => {
    //   if (isIntersecting) {
    //     img.current!.src = img.current!.dataset.src!;
    //     oberver.unobserve(img.current!);
    //   }
    // });
    // oberver.observe(img.current!);
    let oberver = new IntersectionObserver(([isIntersecting]) => {
      if (isIntersecting) {
        img.current!.src = img.current!.dataset.src!;
        oberver.unobserve(img.current!);
      }
    });
    oberver.observe(img.current!);
  }, []);

  function Loaded() {
    setLoad(false);
  }

  return (
    <div className={classnames(styles.root, className)}>
      {load && (
        <div className="image-icon">
          <Icon type="loading" />
        </div>
      )}
      <img alt="" ref={img} src="" data-src={src} onLoad={Loaded} />
    </div>
  );
};

export default Image;
