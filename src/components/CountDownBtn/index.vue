<template>
  <el-button type="primary" :disabled="disableBtn" @click="onGetCodeClick">
    {{ waitingCodeTips }}
  </el-button>
</template>

<script>
import { defineComponent, ref, onBeforeUnmount } from "vue";
export default defineComponent({
  name: "CountDownBtn",
  props: {
    defaultTime: {
      type: Number,
      default: 10,
    },
    defaultText: {
      type: String,
      default: "获取验证码",
    },
  },
  setup(props, context) {
    let countDownTime = ref(0);
    countDownTime.value = props.defaultTime;
    let disableBtn = ref(false);
    let waitingCodeTips = ref("");
    waitingCodeTips.value = props.defaultText;
    let coundDownTimer = null;
    const onGetCodeClick = () => {
      context.emit("getCode");
      disableBtn.value = true;
      waitingCodeTips.value = countDownTime.value + "s后获取";
      coundDownTimer = setInterval(() => {
        --countDownTime.value;
        waitingCodeTips.value = countDownTime.value + "s后获取";

        if (countDownTime.value == 0) {
          waitingCodeTips.value = props.defaultText;
          countDownTime.value = props.defaultTime;
          disableBtn.value = false;
          clearInterval(coundDownTimer);
        }
      }, 1000);
    };
    onBeforeUnmount(() => {
      if (coundDownTimer) {
        clearInterval(coundDownTimer);
      }
    });
    return {
      onGetCodeClick,
      waitingCodeTips,
      disableBtn,
    };
  },
});
</script>

<style>
</style>