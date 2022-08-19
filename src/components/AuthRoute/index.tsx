import { GetStorage } from "@/utils/localStorage";
import { Redirect, Route, RouteProps } from "react-router-dom";
interface Props extends RouteProps {
  component: React.ComponentType<any>;
}

export default function AuthRoute({ component: Component, ...rest }: Props) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        // 只要你去有权限的页面，一旦你的本地token为空，都跳去登录页
        if (GetStorage()) {
          return <Component />;
        } else {
          return (
            <Redirect
              to={{ pathname: "/login", state: location.pathname }}
            ></Redirect>
          );
        }
      }}
    />
  );
}
