import App from "./App";
import store from "/store/index";
import "./style/index.scss";
import { createSSRApp } from "vue";

import Vant from "vant";
import "vant/lib/index.css";

export function createApp() {
  const app = createSSRApp(App).use(store).use(Vant);
  return {
    app,
  };
}
