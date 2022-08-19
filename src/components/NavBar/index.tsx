import Icon from "@/components/Iconfont";
import classNames from "classnames";

import { useHistory } from "react-router-dom";
import style from "./login.module.scss";
type Props = Partial<{
  children: string | React.ReactElement;
  extra: string | React.ReactElement;
  onClose: undefined | (() => void);
  className: string;
  onSubmit: undefined | (() => void);
  showLeft: boolean;
}>;

export default function NavBar({
  children,
  extra = "",
  onClose = undefined,
  onSubmit,
  className,
  showLeft = true,
}: Props) {
  let history = useHistory();
  function goBack() {
    history.go(-1);
  }
  return (
    <div className={classNames(style.root, className)}>
      {showLeft && (
        <div className="left" onClick={onClose ? onClose : goBack}>
          <Icon type="icon-ffanhui-" />
        </div>
      )}
      <div className="title">{children}</div>
      {extra && (
        <div className="right" onClick={onSubmit ? onSubmit : () => {}}>
          {extra}
        </div>
      )}
    </div>
  );
}
