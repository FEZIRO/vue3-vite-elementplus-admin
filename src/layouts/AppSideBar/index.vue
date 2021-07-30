<template>
  <el-menu
    style="transition: all 0.5s"
    unique-opened
    mode="vertical"
    active-text-color="#fff"
    :collapse="sideMenuCollapse"
    class="admin-aside-menu"
    text-color="#fff"
    collapse-transition
    :default-active="$route.path"
  >
    <MenuItem :menuList="menu"></MenuItem>
  </el-menu>
</template>

<script>
/**
 * 侧边菜单导航栏
 *
 */
import MenuItem from "./MenuItem.vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "AdminSideBar",
  props: {
    sideMenuCollapse: {
      type: Boolean,
      default: false,
    },
    menu: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    MenuItem,
  },
});
</script>

<style lang="scss">
.admin-aside-menu {
  height: calc(100vh - #{$appHeaderHeight});
  background-color: #f6f7f9;
  font-size: 14px;
  overflow: auto;
  user-select: none;
  overflow-x: hidden;
  border: none;
  &:not(.el-menu--collapse) {
    width: $sideMenuWidth;
  }

  .el-submenu__title,
  .el-menu-item {
    text-align: left !important;
    transition: all 0.05s;
    background-color: #f6f7f9;
    line-height: 50px;
    height: 50px;

    i {
      color: #000 !important;
      margin-right: 0 !important;
    }

    span {
      color: #000 !important;
      margin-left: 10px;
    }

    &:hover {
      background: #fff !important;
      transition: background-color 0.2s;
    }

    &.is-active {
      font-weight: bold;
      background: #fff !important;
      span {
        color: $primaryColor !important;
      }

      i {
        color: $primaryColor !important;
      }
    }
  }

  .el-submenu__title {
    span {
      margin-left: 8px;
    }
  }
}

/**折叠*/
.el-menu--popup {
  .el-menu-item {
    text-align: left !important;
    transition: all 0.1s;
    i {
      color: #000 !important;
      padding-right: 2px;
    }

    span {
      color: #000 !important;
    }

    &:hover,
    &.is-active {
      background: $secondaryColor !important;

      span {
        color: $primaryColor !important;
      }

      i {
        color: $primaryColor !important;
      }
    }
  }
}
</style>
