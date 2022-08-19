import classNames from "classnames";
import React from "react";
interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  sendCode?: (() => void) | undefined;
  className?: string;
  extra?: string | undefined;
}
export default function Input({ extra, sendCode, className, ...rest }: Props) {
  return (
    <div>
      <input {...rest} className={classNames("input", className)} />
      {extra && (
        <div onClick={sendCode} className="extra">
          {extra}
        </div>
      )}
    </div>
  );
}
