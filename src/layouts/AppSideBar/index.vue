<template>
  <transition name="el-fade-in">
    <div v-show="menu.length !== 0">
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
    </div>
  </transition>
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
  background-color: #fff;
  font-size: 14px;
  overflow: auto;
  user-select: none;
  overflow-x: hidden;

  font-weight: bold;
  &:not(.el-menu--collapse) {
    width: $sideMenuWidth;
  }

  .el-submenu__title,
  .el-menu-item {
    text-align: left !important;
    transition: all 0.1s;
    i {
      color: #000 !important;
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

.el-menu--popup {
  .el-menu-item {
    text-align: left !important;
    transition: all 0.1s;
    i {
      color: #000 !important;
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
