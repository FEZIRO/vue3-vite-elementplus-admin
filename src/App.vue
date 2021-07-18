
<template>
  <AdminLayout
    ref="adminLayout"
    v-if="$route.meta.layout && $route.meta.layout == 'admin'"
  >
    <router-view class="router-view" v-slot="{ Component }">
      <!-- <keep-alive> -->
      <component :is="Component" />
      <!-- </keep-alive> -->
    </router-view>
  </AdminLayout>
  <router-view class="router-view" v-else></router-view>
</template>

<style lang="scss">
body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
  background: $appBgColor;
  width: 100%;
  height: 100%;
}
</style>
