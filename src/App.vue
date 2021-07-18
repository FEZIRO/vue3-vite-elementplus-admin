
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

