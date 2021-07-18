<template>
  <template v-for="item in menuList">
    <el-submenu
      v-if="item.type == 'group'"
      :key="item.url"
      :index="item.id"
      style="user-select: none"
    >
      <template v-slot:title>
        <i :class="[item.icon]" />
        <span>{{ item.name }}</span>
      </template>
      <MenuItem :menuList="item.children"></MenuItem>
    </el-submenu>
    <el-menu-item
      v-else
      :key="item.id"
      :index="item.url"
      style="user-select: none"
      @click="onSelectItem(item)"
    >
      <i :class="[item.icon]" />
      <span>{{ item.name }}</span>
    </el-menu-item>
  </template>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter, useRoute } from "vue-router";
export default defineComponent({
  name: "MenuItem",
  props: {
    menuList: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    //点击菜单
    const onSelectItem = (item) => {
      console.log("菜单点击", item);
      if (route.path === item.url) return;
      router.push({
        path: item.url,
      });
    };

    return {
      onSelectItem,
    };
  },
});
</script>