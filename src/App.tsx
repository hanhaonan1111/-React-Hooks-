import { Router, Route, Redirect, Switch } from "react-router-dom";
import Login from "./pages/login";
import Layout from "./pages/layout";
import Edit from "./pages/edit";
import Chat from "./pages/Wechat";
import AuthRoute from "./components/AuthRoute";
import history from "./utils/history";
import NoFound from "./pages/noFound";
import Test from "./pages/test";
import Search from "./pages/Search";
import SearchResult from "./pages/Search/Result";
import Article from "./pages/Article";
import KeepAlive from "./components/KeepAlive";
export default function App() {
  return (
    <>
      <Router history={history}>
        <KeepAlive
          alivePath="/home"
          component={Layout}
          exact
          path="/home/index"
        />
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home/index" />
          </Route>
          <Route path="/home" exact>
            <Redirect to="/home/index" />
          </Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/test" component={Test}></Route>
          <Route path="/search" component={Search}></Route>
          <Route path="/searchlist" component={SearchResult}></Route>
          <Route path="/artical/:id" component={Article}></Route>

          <AuthRoute path="/profile/edit" component={Edit} />
          <AuthRoute path="/profile/chat" component={Chat} />
          <Route
            render={({ location }) => {
              if (!location.pathname.startsWith("/home")) {
                return <NoFound />;
              }
              return null;
            }}
          ></Route>
        </Switch>
      </Router>
    </>
  );
}
