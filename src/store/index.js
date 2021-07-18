import { createStore } from "vuex";
import app from "@/store/modules/app.js";
import options from "@/store/modules/options.js";
import tagsView from "@/store/modules/tags-view.js";

export default createStore({
  modules: {
    options,
    app,
    tagsView,
  },
  devtools: true,
});
