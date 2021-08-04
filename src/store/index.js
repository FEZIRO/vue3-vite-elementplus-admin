import { createStore } from "vuex";
import app from "@/store/modules/app.js";
import tagsView from "@/store/modules/tags-view.js";

export default createStore({
  modules: {
    app,
    tagsView,
  },
  devtools: true,
});
