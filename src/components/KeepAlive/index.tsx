import { Route } from "react-router-dom";
import styles from "./index.module.scss";

type PropType = {
  alivePath: string;
  component: any;
  [t: string]: any;
};
const KeepAlive = ({ alivePath, component: Component, ...rest }: PropType) => {
  return (
    <Route {...rest}>
      {(props) => {
        const { location } = props;
        const matched = location.pathname.startsWith(alivePath);
        return (
          <div
            className={styles.root}
            style={{ display: matched ? "block" : "none" }}
          >
            <Component {...props} />
          </div>
        );
      }}
    </Route>
  );
};

export default KeepAlive;
