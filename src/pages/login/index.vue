<template>
  <div class="login-page">
    <div class="panel-container">
      <section class="login-intro" v-show="loginStatus">
        <h1 class="intro-title">{{ appName }}</h1>
        <p class="intro-subtitle">欢迎登录！</p>
        <img :src="loginImg" alt="login" />
      </section>
      <section class="login-panel">
        <h1 style="margin-bottom: 10px" v-if="device == 'mobile'">
          {{ appName }}
        </h1>
        <h1>{{ loginStatus ? "登录" : "注册" }}</h1>
        <el-form
          :model="loginForm"
          class="login-form"
          v-show="loginStatus"
          label-position="top"
        >
          <el-form-item label="账号">
            <el-input placeholder="请输入账号" v-model="loginForm.account" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              type="password"
              placeholder="请输入密码"
              v-model="loginForm.password"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="login-btn"
              @click="onLoginClick"
              :loading="loginBtnLoading"
            >
              登录
            </el-button>
            <div class="form-bottom">
              <el-button type="text" @click="onTogglePanelStatus">
                注册
              </el-button>
              <el-button type="text"> 第三方登录 </el-button>
            </div>
          </el-form-item>
        </el-form>
        <el-form
          :model="registerForm"
          class="login-form"
          v-show="!loginStatus"
          label-position="top"
        >
          <el-form-item label="手机号码" name="phone">
            <el-input
              placeholder="请输入手机号码"
              v-model="registerForm.phone"
            />
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              type="password"
              placeholder="请设置密码"
              v-model="registerForm.password"
            />
          </el-form-item>
          <el-form-item label="验证码">
            <el-space>
              <el-input
                placeholder="请输入验证码"
                v-model="registerForm.code"
              />
              <CountDownBtn
                :defaultTime="4"
                @getCode="onGetCodeClick"
              ></CountDownBtn>
            </el-space>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="login-btn"
              @click="onRegisterClick"
            >
              注册
            </el-button>
            <div class="form-bottom">
              <el-button type="text" @click="onTogglePanelStatus">
                密码登录
              </el-button>
              <el-button type="text"> 第三方登录 </el-button>
            </div>
          </el-form-item>
        </el-form>
      </section>
      <span class="code-by">Code By FEZIRO</span>
    </div>
  </div>
</template>


<script>
import { reactive, ref, computed } from "vue";
import loginSvg from "@/assets/images/login.svg";
import CountDownBtn from "@/components/CountDownBtn/index.vue";
import { useRouter } from "vue-router";
import http from "@/http";
import { ElMessage } from "element-plus";
import { createRoute } from "@/router";
import { useStore } from "vuex";

export default {
  name: "login",
  components: {
    CountDownBtn,
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    //切换登录、注册面板
    const loginStatus = ref(true);
    const onTogglePanelStatus = () => {
      loginStatus.value = !loginStatus.value;
    };

    //获取验证码
    const onGetCodeClick = () => {
      console.log("获取验证码");
    };

    //登录操作
    const loginForm = reactive({
      account: "",
      password: "",
    });
    let loginBtnLoading = ref(false);

    const onLoginClick = async () => {
      console.log("loginForm", loginForm);
      loginBtnLoading.value = true;
      let res = await http.user
        .login({
          username: loginForm.account,
          password: loginForm.password,
        })
        .catch(() => {
          loginBtnLoading.value = false;
        });
      loginBtnLoading.value = false;
      console.log("登录", res);
      if (res) {
        //默认添加首页
        res.menu.unshift({
          name: "首页",
          icon: "el-icon-s-home",
          type: "page",
          url: "/home",
          children: null,
          path: [],
          tagsViewAffix: true,
          breadcrumb: ["首页"],
        });
        localStorage.setItem("userInfo", JSON.stringify(res.userInfo));
        localStorage.setItem("menu", JSON.stringify(res.menu));

        createRoute(res.menu);
        ElMessage.success("登录成功！");
        router.push("/home");
      } else {
        ElMessage.error("登录失败！");
      }
    };

    //注册操作
    const registerForm = reactive({
      phone: "",
      password: "",
      code: "",
    });
    const onRegisterClick = () => {};
    return {
      loginForm,
      loginImg: loginSvg,
      loginStatus,
      loginBtnLoading,
      registerForm,
      onRegisterClick,
      onLoginClick,
      onGetCodeClick,
      onTogglePanelStatus,
      appName: computed(() => store.state.app.appName),
      device: computed(() => store.state.app.device),
    };
  },
};
</script>

<style lang="scss" >
.login-page {
  width: 100%;
  height: 100vh;
  background: #f6f7f9;
  @include flex-row-center-center;
  .panel-container {
    position: relative;
    @include flex-row-center-center;
    width: auto;

    .login-intro {
      width: 500px;
      height: 500px;
      flex-shrink: 0;
      background-color: $primaryColor;
      padding: 50px;
      color: #fff !important;
      box-sizing: border-box;
      padding-right: 60px;
      /* border-right: 1px dashed rgba(0, 0, 0, 0.1); */
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;

      @media screen and (max-width: 750px) {
        display: none;
      }
      > img {
        width: 100%;
        height: 100%;
      }

      .intro-title,
      .intro-subtitle {
        text-align: left;
      }

      .intro-title {
        font-weight: bold;
        font-size: 22px;
      }

      .intro-subtitle {
        font-size: 14px;
        margin-top: 10px;
      }
    }

    .login-panel {
      width: 400px;
      min-height: 500px;
      padding: 50px;
      background-color: #fff;
      box-sizing: border-box;
      transition: all 0.5s;
      flex-shrink: 0;
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;

      @media screen and (max-width: 750px) {
        width: 90vw;
        padding: 50px 30px;
      }

      h1 {
        text-align: center;
        font-size: 24px;
        width: 100%;
        margin: 0 auto;
      }

      .login-form {
        margin-top: 40px;

        .login-btn {
          width: 100%;
          height: 40px;
          margin-top: 30px;
        }

        .form-bottom {
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
    .code-by {
      position: absolute;
      bottom: -50px;
      left: 50%;
      transform: translateX(-50%);
      color: #ccc;
    }
  }
}
</style>


