import React from "react";
import ReactDOM from "react-dom";
// 根组件
import App from "./App";
// redux
import store from "./store";
import { Provider } from "react-redux";

// 样式导入
import "@scss/index.css";

// 包装根组件
function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

ReactDOM.render(<Root />, document.querySelector("#root"));
