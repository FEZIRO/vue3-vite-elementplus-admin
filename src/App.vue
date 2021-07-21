
<template>
  <AdminLayout
    ref="adminLayout"
    v-if="$route.meta.layout && $route.meta.layout == 'admin'"
  >
    <router-view class="router-view" v-slot="{ Component }">
      <keep-alive v-if="pageKeepAlive == 1">
        <component :is="Component" />
      </keep-alive>
      <component :is="Component" v-else />
    </router-view>
  </AdminLayout>
  <router-view class="router-view" v-else></router-view>
</template>

<script>
import { useStore } from "vuex";
import { defineComponent, computed, ref, reactive, watch } from "vue";
export default defineComponent({
  name: "App",
  setup() {
    const store = useStore();
    return {
      pageKeepAlive: computed(() => store.state.app.pageKeepAlive),
    };
  },
});
</script>

