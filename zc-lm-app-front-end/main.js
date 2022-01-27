import App from "./App";
import vant from "vant";
import store from "/store/index";
import "./style/index.scss";
import { createSSRApp } from "vue";
export function createApp() {
  const app = createSSRApp(App).use(store).use(vant);
  return {
    app,
  };
}
