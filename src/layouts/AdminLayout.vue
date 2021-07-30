
<template>
  <div class="layout">
    <app-header></app-header>
    <div class="layout-main">
      <app-side-bar
        :menu="sideMenu"
        :sideMenuCollapse="sideMenuCollapse == 1"
      ></app-side-bar>
      <div class="app-main">
        <div class="app-main-top">
          <AppBreadcrumb
            class="breadcrumb-container"
            v-if="pageSwither === '面包屑'"
          ></AppBreadcrumb>
          <AppTagsViewSwitcher
            v-if="pageSwither === '标签切换'"
          ></AppTagsViewSwitcher>
        </div>

        <div class="app-main-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 管理端布局
 */
import { defineComponent, computed, watch } from "vue";
import { useStore } from "vuex";
import useWindowSize from "@/hooks/useWindowSize";
export default defineComponent({
  name: "AdminLayout",
  setup() {
    const store = useStore();
    const { clientWidth, clientHeight } = useWindowSize();
    watch([clientWidth, clientHeight], (newVal) => {
      newVal[0] <= 768 && store.commit("app/SET_DEVICE", "mobile");
      newVal[0] > 768 && store.commit("app/SET_DEVICE", "desktop");
      store.commit("app/SET_WINDOW_RECT", {
        clientWidth: newVal[0],
        clientHeight: newVal[1],
      });
    });
    return {
      sideMenuCollapse: computed(() => store.state.app.menuCollapse),
      pageSwither: computed(() => store.state.app.pageIndicator),
      sideMenu: computed(() => store.getters["app/menu"]),
      appLogo: computed(() => store.state.app.appLogo),
    };
  },
});
</script>

<style lang="scss">
.layout {
  width: 100%;
  height: 100%;
  font-family: "Microsoft YaHei", "Avenir", Helvetica, Arial, sans-serif;
  font-family: "jiangcheng-xie-heiti";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .layout-main {
    display: flex;
  }
  .app-main {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    .app-main-top {
      display: flex;
      align-items: center;
      padding: 0 10px;
      flex-shrink: 0;
      height: $breadcrumbHeight;
      background: transparent;
      background-color: #fff;
      border-bottom: 0.5px solid rgba(#000, 0.05);
    }
    .app-main-content {
      width: 100%;
      height: $adminContentHeight;
      overflow-y: auto;
      box-sizing: border-box;
    }
  }
}
</style>