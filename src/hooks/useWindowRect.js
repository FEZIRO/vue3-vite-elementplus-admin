/**
 * 实时监听获取浏览器窗口宽度、高度
 */

import { toRefs, onMounted, onBeforeUnmount, reactive } from "vue";
import { useStore } from "vuex";
import { debounce } from "@/utils/utils";

const getClientRect = () => {
  let currentClientHeight =
    document.documentElement.clientHeight || document.body.clientHeight;
  let currentClientWidth =
    document.documentElement.clientWidth || document.body.clientWidth;
  return {
    clientWidth: currentClientWidth,
    clientHeight: currentClientHeight,
  };
};

export default function useClientRect() {
  const windowRect = reactive({
    clientHeight: getClientRect().clientHeight,
    clientWidth: getClientRect().clientWidth,
  });
  const store = useStore();

  const onWindowsResize = debounce(() => {
    windowRect.clientHeight = getClientRect().clientHeight;
    windowRect.clientWidth = getClientRect().clientWidth;
    windowRect.clientWidth <= 768 && store.commit("app/SET_DEVICE", "mobile");
    windowRect.clientWidth > 768 && store.commit("app/SET_DEVICE", "desktop");
    // console.warn("useWindowRect：resize事件", windowRect);
  }, 300);

  onMounted(() => {
    window.addEventListener("resize", onWindowsResize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", onWindowsResize);
  });
  return {
    ...toRefs(windowRect),
  };
}
