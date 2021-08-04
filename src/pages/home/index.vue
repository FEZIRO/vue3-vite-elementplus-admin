<template>
  <el-space wrap class="home-container">
    <div class="home-img">
      <img src="@/assets/images/home.svg" />
    </div>
    <div class="tips">
      <div class="tips-title">欢迎登陆！</div>
      <div class="tips-subtitle">{{ appName }}</div>
    </div>
  </el-space>
  <!-- <div class="home-container">
   
    
  </div> -->
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
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  background: #fff;

  .home-img {
    width: 400px;
    height: auto;
    padding: 0 50px;
    box-sizing: border-box;
    > img {
      transform: rotateY(180deg);
    }

    animation: upAndDown 2s infinite linear;
  }

  .tips {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    text-align: center;
    margin: 0 50px;

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
}


</style>
