<template>
  <aside
    :class="[
      'mobile-side-menu',
      visible ? 'show-mobile-menu' : 'hide-mobile-menu',
    ]"
  >
    <section class="logo-container">
      <img class="admin-logo" :src="appLogo" :alt="appName" v-if="appLogo" />
      <h1 class="admin-title">{{ appName }}</h1>
    </section>
    <el-select
      v-model="keyword"
      filterable
      style="width: 90%; margin-bottom: 10px"
      remote
      reserve-keyword
      placeholder="搜索页面"
      :filter-method="search"
      :loading="searchInstance.loading"
      size="small"
      clearable
    >
      <template #prefix>
        <i class="el-icon-search" style="margin: 0 10px"></i>
      </template>
      <el-option
        v-for="item in searchInstance.result"
        :key="item.name"
        :label="item.name"
        :value="item.name"
        @click="onSearchSelect(item)"
      >
        <div>
          <span style="margin-right: 10px">{{ item.name }}</span>
          <span style="color: #ccc">{{ item.breadcrumb.join(" / ") }}</span>
        </div>
      </el-option>
    </el-select>
    <app-side-bar
      :menu="sideMenu"
      style="width: 100%; padding-bottom: 50px"
      @menuSelect="hide"
    ></app-side-bar>
    <div class="setting-bar">
      <el-popover placement="top" :width="250" trigger="hover">
        <template #reference>
          <i class="el-icon-s-tools header-icon"></i>
        </template>
        <el-tabs>
          <el-tab-pane label="设置" name="0"></el-tab-pane>
        </el-tabs>
        <div class="setting-popover-panel">
          <div class="setting-item">
            <h2>页面指示</h2>
            <el-radio-group
              size="mini"
              :modelValue="pageIndicator"
              @change="onMenuTagSwitcherChange"
            >
              <el-radio-button label="标签切换"></el-radio-button>
              <el-radio-button label="面包屑"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="setting-item" v-if="pageIndicator == '标签切换'">
            <h2>页面状态</h2>
            <el-radio-group
              size="mini"
              :modelValue="pageKeepAlive"
              @change="onTogglePageKeepAlive"
            >
              <el-radio-button :label="1">缓存</el-radio-button>
              <el-radio-button :label="0">不缓存</el-radio-button>
            </el-radio-group>
          </div>
        </div>
      </el-popover>
    </div>
  </aside>
  <div class="mobile-side-menu-mask" v-if="visible" @click="hide"></div>
</template>

<script>
/**
 * 移动端侧边栏组件
 */
import { useStore } from "vuex";
import { traverseArrayTree } from "@/others/utils.js";
import { defineComponent, computed, ref, reactive, watch } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "MobileAppSideBar",
  setup() {
    const router = useRouter();

    const store = useStore();

    const onMenuTagSwitcherChange = (val) => {
      store.commit("app/SET_MENU_TAG_SWITCHER", val);
    };

    const onTogglePageKeepAlive = (val) => {
      store.commit("app/SET_PAGE_KEEP_ALIVE", val);
    };

    //页面检索
    const keyword = ref("");
    const searchInstance = reactive({
      loading: false,
      result: [],
    });
    watch(keyword, (newVal) => {
      if (!newVal) searchInstance.result = [];
    });
    const searchVisible = ref(false);
    const onToggleSearch = () => {
      keyword.value = "";
      searchVisible.value = !searchVisible.value;
    };
    const onSearchSelect = (data) => {
      if (data.url) {
        router.push({
          path: data.url,
        });
      }
    };
    const search = (keyword) => {
      if (!keyword) {
        searchInstance.result = [];
        return;
      }
      console.log("搜索", keyword);
      searchInstance.loading = true;
      let menu = JSON.parse(localStorage.getItem("menu"));
      let result = [];
      let keywordReg = new RegExp(keyword, "i");
      traverseArrayTree(menu, "children", (node) => {
        if (node.type === "page" && keywordReg.test(node.name)) {
          result.push(node);
        }
      });
      searchInstance.result = result;
      console.log("搜索结果", result);
      searchInstance.loading = false;
    };

    const visible = ref(false);
    const show = () => {
      visible.value = true;
    };
    const hide = () => {
      visible.value = false;
    };

    return {
      onMenuTagSwitcherChange,
      onTogglePageKeepAlive,
      appName: computed(() => store.state.app.appName),
      appLogo: computed(() => store.state.app.appLogo),

      pageIndicator: computed(() => store.state.app.pageIndicator),
      pageKeepAlive: computed(() => store.state.app.pageKeepAlive),
      sideMenu: computed(() => store.getters["app/menu"]),
      keyword,
      onSearchSelect,
      search,
      onToggleSearch,
      searchVisible,
      searchInstance,

      hide,
      show,
      visible,
    };
  },
});
</script>

<style lang="scss">
.mobile-side-menu {
  height: 100vh;
  width: 70%;
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  z-index: 999999;
  box-shadow: 6px 0 16px rgba(0, 0, 0, 0.04);
  background: $bgColor;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateX(-500px);

  .logo-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    padding: 0 10px;
    flex-shrink: 0;
    flex-wrap: wrap;
    width: 100%;
    padding: 20px 10px;
    box-sizing: border-box;

    .admin-logo {
      width: auto;
      height: 22px;
    }

    .admin-title {
      font-size: 16px;
      vertical-align: middle;
      margin: 10px; 
      line-height: 20px;
      white-space: pre-wrap;
    }
  }

  .setting-bar {
    width: 100%;
    position: absolute;
    bottom: 0;
    text-align: right;
    background: #fff;
    padding: 10px 5px;
    box-sizing: border-box;
  }
}

.mobile-side-menu-mask {
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  z-index: 999998;
  height: 100%;
  width: 100%;
  background: rgba(#000, 0.2);
}

.show-mobile-menu {
  animation: sideBarSlipOut 0.3s ease forwards;
  animation-delay: 0.1s;
}

.hide-mobile-menu {
  animation: sideBarSlipIn 0.5s ease forwards;
}

.mobile-side-menu-mask {
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  z-index: 999998;
  height: 100%;
  width: 100%;
  background: rgba(#000, 0.2);
}

.setting-popover-panel {
  overflow: auto;
  z-index: 99999999999;
  position: relative;
  .setting-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    box-sizing: border-box;
    > h2 {
      color: rgba(0, 0, 0, 0.6);
    }
  }
}

.info-popper {
  padding: 0 !important;
}

.panel-btn-group {
  text-align: center;
  padding-top: 10px;
}

.el-tabs__nav-wrap::after {
  height: 1px;
}
</style>
