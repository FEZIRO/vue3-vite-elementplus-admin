<template>
  <el-result
    icon="error"
    title="404"
    subTitle="页面不存在！"
    style="width: 100%; height: 100vh"
  >
    <template #extra>
      <el-button type="primary" size="medium" @click="onNavigateBack"
        >返回</el-button
      >
    </template>
  </el-result>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "404",

  setup() {
    const router = useRouter();
    const onNavigateBack = () => {
      router.back();
    };

    return {
      onNavigateBack,
    };
  },
});
</script>