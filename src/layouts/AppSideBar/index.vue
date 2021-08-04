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
    @select="onMenuSelect"
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
  setup(props, context) {
    const onMenuSelect = (index) => {
      context.emit("menuSelect",index)
    };
    return {
      onMenuSelect,
    };
  },
});
</script>

<style lang="scss">
.admin-aside-menu {
  height: 100%;
  background-color: $bgColor;
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
    background-color: $bgColor;
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
      box-sizing: border-box;

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
