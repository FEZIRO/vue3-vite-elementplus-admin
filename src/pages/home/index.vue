<template>
  <div class="home-container">
    <div class="home-img">
      <img src="@/assets/images/home.svg" />
    </div>
    <div class="tips">
      <div class="tips-title">欢迎登陆！</div>
      <div class="tips-subtitle">{{ appName }}</div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  name: "home",
  setup() {
    const store = useStore();
    return {
      appName: store.state.app.appName,
    };
  },
};
</script>


<style lang="scss" scoped>
.home-container {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  background: #fff;

  .home-img {
    width: 400px;
    height: auto;
    margin-right: 150px;
    > img {
      transform: rotateY(180deg);
    }

    animation: upAndDown 2s infinite linear;
  }

  .tips {
    position: relative;
    width: 300px;
    padding: 30px 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    text-align: left;

    .tips-title {
      margin-bottom: 30px;

      font-size: 40px;
      font-weight: bold;
      line-height: 40px;
      color: #000;
      opacity: 0;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    }

    .tips-subtitle {
      margin-bottom: 30px;
      font-size: 25px;
      line-height: 36px;
      color: rgba(#000, 0.8);
      opacity: 0;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
    }
  }

  @keyframes slideUp {
    0% {
      opacity: 0;
      transform: translateY(60px);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes upAndDown {
    0% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(10px);
    }

    100% {
      transform: translateY(0px);
    }
  }
}
</style>
