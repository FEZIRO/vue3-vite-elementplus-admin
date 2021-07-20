<template>
  <header class="admin-header">
    <div class="header--left">
      <section class="logo-container">
        <img class="admin-logo" :src="appLogo" :alt="appName" v-if="appLogo" />
        <h1 class="admin-title">{{ appName }}</h1>
      </section>
    </div>
    <!-- <div class="header-center">
      <el-menu default-active="1" mode="horizontal">
        <el-menu-item index="1">模块一</el-menu-item>
        <el-menu-item index="2">模块二</el-menu-item>
      </el-menu>
    </div> -->
    <div class="header--right">
      <i
        class="el-icon-search search-btn"
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
        placeholder="页面检索"
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
            <span style="color: #ccc">{{ item.fullPath.join(" / ") }}</span>
          </div>
        </el-option>
      </el-select>
      <section class="user-info-section">
        <el-popover
          placement="bottom"
          :width="300"
          trigger="hover"
          title="通知"
          class="header-icon"
        >
          <template #reference>
            <el-badge :value="notifyList.length" :max="99" type="success">
              <i class="el-icon-bell header-icon" style="margin: 0"></i>
            </el-badge>
          </template>
          <div class="notify-popover-panel">
            <div v-for="item in notifyList" :key="item.id" class="notify-item">
              <h2>{{ item.content }}</h2>
              <p>{{ item.time }}</p>
            </div>
          </div>
        </el-popover>
        <el-popover
          placement="bottom-end"
          :width="250"
          trigger="hover"
          title="设置"
        >
          <template #reference>
            <i class="el-icon-setting header-icon"></i>
          </template>
          <div class="setting-popover-panel">
            <div class="setting-item">
              <h2>页面指示器</h2>
              <el-radio-group
                size="mini"
                :modelValue="pageIndicator"
                @change="onMenuTagSwitcherChange"
              >
                <el-radio-button label="标签切换"></el-radio-button>
                <el-radio-button label="面包屑"></el-radio-button>
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
              <i class="el-icon-warning-outline"></i>
              <div @click="onLogoutClick" style="width: 100%">退出登录</div>
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
import { getType, traverseTree } from "@/utils/utils.js";
import { defineComponent, computed, ref, reactive, watch } from "vue";
import { useRouter } from "vue-router";
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

    //获取通知信息
    const notifyList = ref([
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
      console.log("搜索", keyword);
      searchInstance.loading = true;
      let menu = JSON.parse(localStorage.getItem("menu"));
      let result = [];
      let keywordReg = new RegExp(keyword, "i");
      traverseTree(menu, (node) => {
        if (node.type === "page" && keywordReg.test(node.name)) {
          result.push(node);
        }
      });
      searchInstance.result = result;
      console.log("搜索结果", result);
      searchInstance.loading = false;
      // cb(result);
    };
    return {
      notifyList,
      onLogoutClick,
      onMenuTagSwitcherChange,
      onToggleMenuCollapse,
      appName: computed(() => store.state.app.appName),
      appLogo: computed(() => store.state.app.appLogo),
      menuCollapse: computed(() => store.state.app.menuCollapse),
      pageIndicator: computed(() => store.state.app.pageIndicator),
      userInfo: computed(() => store.getters["app/userInfo"]),
      getType,
      keyword,
      onSearchSelect,
      search,
      onToggleSearch,
      searchVisible,
      searchInstance,
    };
  },
});
</script>

<style lang="scss">
.admin-header {
  width: 100%;
  height: $appHeaderHeight;
  background: $appHeaderBgColor;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  justify-content: space-between;
  position: relative;
  z-index: 999;
  transition: all 0.5s;
  color: #000;
  border-bottom: 2px solid #f2f2f2;
  font-weight: bold;

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
        /* color: $primaryColor; */
        font-size: 20px;
        vertical-align: middle;
        margin-left: 10px;
      }
    }
  }

  .header-center {
    /* flex-grow: 1; */
  }

  .header--right {
    display: flex;
    align-items: center;
    .icon-notify {
      margin-right: 30px;
    }

    .search-btn {
      cursor: pointer;
      margin-right: 20px;
      font-weight: bold;
      font-size: 20px;
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

.notify-popover-panel {
  height: 300px;
  overflow: auto;
  z-index: 99999999999;
  position: relative;

  .notify-item {
    padding: 10px 0;
    box-sizing: border-box;
    border-top: 1px solid rgba(0, 0, 0, 0.05);

    > h2 {
      color: rgba(0, 0, 0, 0.6);
    }
    > p {
      margin-top: 5px;
      color: rgba(0, 0, 0, 0.3);
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
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.5s;
    box-sizing: border-box;
    width: 100%;
    border-top: 1px solid rgba(0, 0, 0, 0.03);
    &:hover {
      background: rgba(#000, 0.05);
    }

    > i {
      margin-right: 5px;
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
    border-top: 1px solid rgba(0, 0, 0, 0.03);
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
  > i {
    color: #ccc;
    margin-left: 5px;
  }
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
