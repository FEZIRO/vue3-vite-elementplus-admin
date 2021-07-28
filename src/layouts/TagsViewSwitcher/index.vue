<template>
  <div
    id="tags-view-container"
    class="tags-view-container"
    @contextmenu="onContextMenuClick"
  >
    <el-tabs
      v-model="tabsActive"
      type="card"
      style="width: 100%"
      @tab-click="onTabsSwitch"
      @tab-remove="onTabsDelete"
    >
      <el-tab-pane
        :closable="!item.meta.tagsViewAffix"
        :key="item.fullPath"
        v-for="item in visitedRoutes"
        :label="item.meta.title"
        :name="item.fullPath"
      ></el-tab-pane>
    </el-tabs>
    <teleport to="body">
      <div class="context-menu" :style="contextMenuBehavior">
        <div
          class="menu-item"
          @click="onContextMenuItemClick"
          data-name="删除其他标签"
        >
          <i class="el-icon-delete"></i>
          <span>删除其他标签</span>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
/**
 * 标签切换页面组件
 *
 */
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import {
  defineComponent,
  ref,
  watch,
  onMounted,
  getCurrentInstance,
  reactive,
} from "vue";
export default defineComponent({
  name: "TagsViewSwitcher",
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const instance = getCurrentInstance();
    let visitedRoutes = store.state.tagsView.visitedRoutes;

    const tabsActive = ref("");

    //添加标签
    const addTags = () => {
      if (route.meta.tagsView) {
        store.commit("tagsView/ADD_VISITED_ROUTE", route);
      }
    };
    //初始化标签
    const initTags = () => {
      tabsActive.value = route.path;
      addTags();
    };
    watch(
      () => route.fullPath,
      () => {
        initTags();
      }
    );
    onMounted(() => {
      initTags();
    });

    //标签切换
    const onTabsSwitch = (tab) => {
      console.log("切换tab", tab);
      if (tab.paneName == route.path) return;
      router.push({ path: tab.paneName });
      addTags();
    };
    //删除标签
    const onTabsDelete = (name) => {
      console.log("delete", name);
      let deleteTarget = visitedRoutes.find((item) => item.path === name);
      let deleteTargetIndex = visitedRoutes.findIndex(
        (item) => item.path === name
      );
      if (deleteTarget.path == route.path) {
        console.log("要删除的tab", deleteTargetIndex);
        //如果tab是最后一个则跳转到首页
        if (visitedRoutes.length - 1 === 0) {
          store.commit("tagsView/DELETE_VISITED_ROUTE", deleteTarget);
          instance.ctx.$nextTick(() => {
            router.replace("/");
            console.log("routename", route);
            if (route.path == "/home") {
              store.commit("tagsView/ADD_VISITED_ROUTE", route);
            }
          });

          return;
        }
        //如果当前删除的是列表尾部的tab，跳转到列表倒数第二个tab
        if (visitedRoutes.length - 1 == deleteTargetIndex) {
          router.push(visitedRoutes[deleteTargetIndex - 1]);
        }
        //等待页面更新后跳转到最近的一个tab
        instance.ctx.$nextTick(() => {
          if (visitedRoutes[deleteTargetIndex]) {
            router.push(visitedRoutes[deleteTargetIndex]);
          }
        });
      }
      store.commit("tagsView/DELETE_VISITED_ROUTE", deleteTarget);
    };

    //右键菜单
    const contextMenuBehavior = reactive({
      display: "none",
      left: "",
      top: "",
    });
    const onContextMenuClick = (e) => {
      contextMenuBehavior.display = "block";
      contextMenuBehavior.left = e.pageX + 10 + "px";
      contextMenuBehavior.top = e.pageY + "px";
      e.preventDefault();
    };
    const onContextMenuItemClick = (e) => {
      let name = e.currentTarget.dataset.name;
      switch (name) {
        case "删除其他标签":
          store.commit("tagsView/DELETE_OTHERS_VISITED_ROUTE", route);
          router.go(0);
          break;
      }
    };
    window.addEventListener("click", function () {
      contextMenuBehavior.display = "none";
    });

    return {
      tabsActive,
      visitedRoutes,
      onTabsSwitch,
      onTabsDelete,
      contextMenuBehavior,
      onContextMenuClick,
      onContextMenuItemClick,
    };
  },
});
</script>

<style lang="scss">
$tabHeight: 34px;
.tags-view-container {
  width: 100%;
  height: $tabHeight;
  overflow-x: auto;
  overflow-y: hidden;

  .el-tabs__item {
    background: rgba(#000, 0.05);
    border: none;
    margin-right: 10px;
    border-radius: 2px;
    line-height: $tabHeight;
    height: $tabHeight;
    text-align: center;
    user-select: none;

    &:hover {
      color: $primaryColor;
    }
  }

  .el-tabs__nav-prev,
  .el-tabs__nav-next {
    line-height: $tabHeight;
  }

  .el-tabs--card > {
    .el-tabs__header {
      border: none;
      background: transparent;
      .el-tabs__nav {
        border: none;
        border-bottom: none;
        border-radius: 0;
      }
    }
  }

  .el-tabs__item.is-active {
    color: $primaryColor;
    font-weight: bold;
    position: relative;
    /* padding-left: 28px !important; */
    background: $secondaryColor;

    /* &::before {
      position: absolute;
      content: "";
      left: 14px;
      top: 46%;
      width: 6px;
      height: 6px;
      background: $primaryColor;
      border-radius: 100%;
    } */
  }
}

.context-menu {
  position: absolute;
  z-index: 99999;
  box-shadow: 0 0 10px 0 rgba(#000, 0.1);
  border-radius: 2px;
  overflow: hidden;
  .menu-item {
    text-align: left;
    padding: 12px 20px;
    background: #fff;
    box-sizing: border-box;
    transition: all 0.2s;
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    > span {
      margin-left: 5px;
    }
    &:hover {
      background: $primaryColor;
      color: #fff;
    }
  }
}
</style>
