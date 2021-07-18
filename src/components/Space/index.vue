<template>
  <div :style="{ width: width + 'px' }"></div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "Space",
  props: {
    width: {
      type: Number,
      default: 10,
    },
  },
});
</script>