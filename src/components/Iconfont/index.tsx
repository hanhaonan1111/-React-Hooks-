import classNames from "classnames";
interface Props extends React.SVGProps<SVGSVGElement> {
  type: string;
  className?: string;
}

function Iconfont({ type, className = "", ...res }: Props) {
  return (
    <svg {...res} className={classNames("icon", className)} aria-hidden="true">
      <use xlinkHref={`#${type}`}></use>
    </svg>
  );
}

export default Iconfont;
