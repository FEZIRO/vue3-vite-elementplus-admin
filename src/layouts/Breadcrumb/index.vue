<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <el-breadcrumb-item v-for="item in $route.meta.breadcrumb" :key="item">
      <span>{{ item }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
.app-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 30px;
  margin-left: 8px;

  .el-breadcrumb__item {
    span {
      color: rgba(#000, 0.4);
    }

    &:last-child {
      span {
        color: #000;
      }
    }
  }
}
</style>
