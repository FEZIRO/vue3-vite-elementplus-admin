<template>
  <header class="admin-header">
    <div class="header--left">
      <section class="logo-container">
        <img class="admin-logo" :src="appLogo" :alt="appName" v-if="appLogo" />
        <h1 class="admin-title">{{ appName }}</h1>
      </section>
    </div>
    <!-- <div class="header-center">
      <el-menu
        :default-active="activeModule"
        mode="horizontal"
        @select="onModuleSelect"
      >
        <el-menu-item index="module1">模块一</el-menu-item>
        <el-menu-item index="modlue2">模块二</el-menu-item>
      </el-menu>
    </div> -->
    <div class="header--right">
      <i
        class="el-icon-search search-btn fun-btn"
        @click="onToggleSearch"
        v-if="!searchVisible"
      ></i>
      <el-select
        v-else
        v-model="keyword"
        filterable
        style="margin-right: 20px"
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
      <section class="user-info-section">
        <el-popover
          placement="bottom"
          :width="300"
          trigger="hover"
          class="header-icon"
          style="padding: 0"
        >
          <template #reference>
            <el-badge
              :value="noticeList.length"
              :max="99"
              type="success"
              :hidden="noticeList.length === 0"
            >
              <i
                class="el-icon-message-solid header-icon"
                style="margin: 0"
              ></i>
            </el-badge>
          </template>
          <el-tabs>
            <el-tab-pane label="未读消息" name="0"></el-tab-pane>
          </el-tabs>
          <div class="notice-popover-panel" v-if="noticeList.length !== 0">
            <div v-for="item in noticeList" :key="item.id" class="notice-item">
              <i class="el-icon-message-solid message-icon"></i>
              <div class="notify-content">
                <h2>{{ item.content }}</h2>
                <p>{{ item.time }}</p>
              </div>
            </div>
          </div>
          <el-empty description="暂无消息" v-else></el-empty>
          <div class="panel-btn-group" v-if="noticeList.length !== 0">
            <el-button type="text" size="mini" @click="onClearNoticeClick"
              >清除消息</el-button
            >
          </div>
        </el-popover>
        <el-popover placement="bottom" :width="250" trigger="hover">
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
            <div class="setting-item">
              <h2>侧边菜单</h2>
              <el-radio-group
                size="mini"
                :modelValue="menuCollapse"
                @change="onToggleMenuCollapse"
              >
                <el-radio-button :label="1">折叠</el-radio-button>
                <el-radio-button :label="0">不折叠</el-radio-button>
              </el-radio-group>
            </div>
          </div>
        </el-popover>
        <el-popover
          placement="bottom-end"
          :width="150"
          trigger="hover"
          popper-class="info-popper"
        >
          <template #reference>
            <div class="avatar">
              <el-avatar
                icon="el-icon-user-solid"
                :src="userInfo.avatar"
                size="small"
              ></el-avatar>
              <span class="username">{{ userInfo.name || "--" }}</span>
              <i class="el-icon-arrow-down"></i>
            </div>
          </template>
          <div class="userInfo-popover-panel">
            <div class="panel-title" style="text-align: center">
              <el-avatar
                icon="el-icon-user-solid"
                :src="userInfo.avatar"
                size="medium"
              ></el-avatar>
              <div>{{ userInfo.name || "--" }}</div>
              <el-tag size="mini" style="margin-top: 5px">{{
                userInfo.role || "--"
              }}</el-tag>
            </div>
            <div class="info-item">
              <el-button
                type="text"
                size="mini"
                icon="el-icon-warning-outline"
                @click="onLogoutClick"
                style="color: red"
                >退出登录</el-button
              >
            </div>
          </div>
        </el-popover>
      </section>
    </div>
  </header>
</template>

<script>
/**
 * 头部组件
 */
import { useStore } from "vuex";
import { resetRouter } from "@/router";
import { getType, traverseArrayTree } from "@/utils/utils.js";
import { defineComponent, computed, ref, reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  name: "AdminHeader",
  setup() {
    const router = useRouter();

    const store = useStore();

    const onMenuTagSwitcherChange = (val) => {
      store.commit("app/SET_MENU_TAG_SWITCHER", val);
    };

    const onToggleMenuCollapse = (val) => {
      store.commit("app/TOGGLE_MENU_COLLAPSE", val);
    };
    const onTogglePageKeepAlive = (val) => {
      store.commit("app/SET_PAGE_KEEP_ALIVE", val);
    };

    //通知信息
    const noticeList = ref([
      {
        id: 1,
        content: "这是一条短通知。",
        time: "2021-6-10",
      },
      {
        id: 2,
        content: "这是一条短通知。",
        time: "2021-6-10",
      },
      {
        id: 3,
        content:
          "这是一条长长长长长长长长长长长长长长长长长长长长长长长长通知。",
        time: "2021-6-10",
      },
      {
        id: 4,
        content:
          "这是一条长长长长长长长长长长长长长长长长长长长长长长长长通知。",
        time: "2021-6-10",
      },
      {
        id: 5,
        content:
          "这是一条长长长长长长长长长长长长长长长长长长长长长长长长通知。",
        time: "2021-6-10",
      },
    ]);
    const onClearNoticeClick = () => {
      noticeList.value.splice(0, noticeList.value.length);
    };
    const noticeTabActive = ref("0");
    const onNoticeTabChange = (tab) => {
      console.log(tab);
      noticeTabActive.value = tab.paneName;
    };
    //退出登录
    const onLogoutClick = () => {
      localStorage.clear();
      console.log("store", store);
      store.commit("tagsView/delAllVisitedRoutes");
      resetRouter();

      router.push({
        path: "/login",
      });
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

    //模块切换
    // const activeModule = ref(route.query.module);
    // const onModuleSelect = (index) => {
    //   router.replace({
    //     query: {
    //       module: index,
    //     },
    //   });
    //   activeModule.value = index;
    // };

    return {
      noticeList,
      onClearNoticeClick,
      onLogoutClick,
      onMenuTagSwitcherChange,
      onToggleMenuCollapse,
      onTogglePageKeepAlive,
      appName: computed(() => store.state.app.appName),
      appLogo: computed(() => store.state.app.appLogo),
      menuCollapse: computed(() => store.state.app.menuCollapse),
      pageIndicator: computed(() => store.state.app.pageIndicator),
      pageKeepAlive: computed(() => store.state.app.pageKeepAlive),
      userInfo: computed(() => store.getters["app/userInfo"]),
      getType,
      keyword,
      onSearchSelect,
      search,
      onToggleSearch,
      searchVisible,
      searchInstance,
      noticeTabActive,
      onNoticeTabChange,
    };
  },
});
</script>

<style lang="scss">
.admin-header {
  width: 100%;
  height: $appHeaderHeight;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  justify-content: space-between;
  position: relative;
  z-index: 999;
  transition: all 0.5s;
  color: #000;
  font-weight: bold;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);

  .header--left {
    display: flex;
    align-items: center;
    flex-shrink: 0;

    .logo-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: auto;
      padding: 0 10px;
      flex-shrink: 0;
      .admin-logo {
        width: auto;
        height: 22px;
      }

      .admin-title {
        font-weight: bold;
        font-size: 18px;
        vertical-align: middle;
        margin-left: 10px;
      }
    }
  }

  .header--right {
    display: flex;
    align-items: center;
    .icon-notice {
      margin-right: 30px;
    }

    .search-btn {
      cursor: pointer;
      margin-right: 10px;
      font-weight: bold;
      font-size: 20px;
      padding: 10px;
      box-sizing: border-box;
      &:hover {
        transition: background-color 0.5s;
        background: rgba(#000, 0.05);
        padding: 10px;
        box-sizing: border-box;
        border-radius: 100px;
        color: $primaryColor;
      }
    }

    .user-info-section {
      display: flex;
      align-items: center;
      margin-right: 20px;
      cursor: pointer;
      .username {
        margin-left: 5px;
        font-weight: normal;
        font-size: 13px;
      }
      .user-info {
        margin-left: 10px;
        text-align: left;

        > p {
          margin-bottom: 4px;
          font-size: 14px;
        }
        .tags-section {
          display: flex;
          align-items: center;
        }
      }
    }
  }
}

.notice-popover-panel {
  height: 300px;
  overflow: auto;
  z-index: 99999999999;
  position: relative;

  .notice-item {
    padding: 10px;
    box-sizing: border-box;
    border-top: 1px solid rgba(0, 0, 0, 0.01);
    transition: all 0.5s;
    display: flex;
    &:hover {
      background: rgba(#000, 0.05);
    }
    .message-icon {
      color: $primaryColor;
      padding-top: 3px;
      flex-shrink: 0;
    }

    .notify-content {
      margin-left: 10px;
      > h2 {
        color: rgba(0, 0, 0, 0.6);
        white-space: pre-wrap;
      }
      > p {
        margin-top: 5px;
        font-size: 12px;
        color: rgba(8, 2, 2, 0.2);
      }
    }
  }
}

.userInfo-popover-panel {
  overflow: auto;
  z-index: 99999999999;
  position: relative;
  .info-item {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.5s;
    box-sizing: border-box;
    width: 100%;
    padding: 5px 0;
    border-top: 1px solid rgba(0, 0, 0, 0.03);

    &:hover {
      background: rgba(#000, 0.05);
    }
  }

  .panel-title {
    padding: 15px 10px;
    box-sizing: border-box;

    &:hover {
      background: #fff;
    }
  }
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

.avatar {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  > i {
    color: #ccc;
    margin-left: 5px;
  }
}

.panel-btn-group {
  text-align: center;
  padding-top: 10px;
}

.header-icon {
  font-weight: bold !important;
  font-size: 22px;
  margin: 0 20px;
  > i {
    font-weight: bold !important;
  }
}
</style>
