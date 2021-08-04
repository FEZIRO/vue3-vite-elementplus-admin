<template>
  <el-dialog
    :title="modalConfig.title"
    v-model="modalConfig.visible"
    width="40%"
    :close-on-click-modal="false"
  >
    <el-form
      size="medium"
      style="min-height: 200px"
      label-width="100px"
      label-position="top"
    >
      <el-row :gutter="20">
        <el-col :span="24">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
          >
            <div class="avatar-upload-wrap">
              <el-avatar
                :size="100"
                style="margin-bottom: 30px"
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              >
              </el-avatar>
              <div class="uploader-bottom">
                <i class="icon-upload el-icon-camera"></i>
              </div>
            </div>
          </el-upload>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户名：">
            <el-input
              size="medium"
              v-model="data.form.userName"
              placeholder="请输入用户名"
              clearable
              :style="{ width: '100%' }"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别：">
            <el-select
              v-model="data.form.sex"
              placeholder="请选择性别"
              clearable
              size="medium"
              :style="{ width: '100%' }"
            >
              <el-option
                v-for="item in sexOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话：">
            <el-input
              v-model="data.form.phone"
              placeholder="请输入联系电话"
              size="medium"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="角色：">
            <el-select
              v-model="data.form.role"
              placeholder="请选择角色"
              size="medium"
              :style="{ width: '100%' }"
            >
              <el-option
                v-for="item in roleOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template v-slot:footer class="dialog-footer">
      <el-button @click="onModalCloseClick" size="medium">取 消</el-button>
      <el-button
        type="primary"
        @click="onModalConfirmClick"
        size="medium"
        :loading="modalConfig.confirmBtnLoading"
        >确 定</el-button
      >
    </template>
  </el-dialog>
</template>

<script>
import { computed, reactive } from "vue";
import { useStore } from "vuex";
import { userTypeOptions, sexOptions } from "@/others/options.js";
export default {
  name: "UserEdit",
  emits: ["confirm"],
  setup(props, context) {
    const store = useStore();

    //模态框配置
    const modalConfig = reactive({
      type: "", // "add" "edit"
      title: "",
      visible: false,
      confirmBtnLoading: false,
    });

    //初始化表单
    const getDefaultForm = () => {
      return {
        userName: "",
        sex: "",
        phone: "",
        role: "",
      };
    };

    const data = reactive({ form: getDefaultForm() });

    //初始化模态框
    const initModal = () => {
      data.form = getDefaultForm();
    };

    //显示模态框
    const showModal = (
      options = {
        type: "add",
        title: "",
        data: {},
      }
    ) => {
      modalConfig.type = options.type;
      modalConfig.visible = true;
      if (options.type === "add") modalConfig.title = "添加";
      if (options.type === "edit") modalConfig.title = "编辑";
      modalConfig.title = options.title || "";
      console.log("options", options);
      if (options.data) data.form = { ...options.data };
    };

    //隐藏模态框
    const hideModal = () => {
      modalConfig.visible = false;
      initModal();
    };

    //点击关闭按钮
    const onModalCloseClick = () => {
      hideModal();
    };

    //点击确认按钮
    const onModalConfirmClick = () => {
      hideModal();
      context.emit("confirm");
    };

    return {
      modalConfig,
      data,
      sexOptions: sexOptions,
      roleOptions: userTypeOptions,

      hideModal,
      showModal,
      onModalConfirmClick,
      onModalCloseClick,
    };
  },
};
</script>

<style lang="scss" scoped>
.avatar-uploader {
  margin-bottom: 30px;
  text-align: center;
  .avatar-upload-wrap {
    position: relative;
    height: 100px;
    border-radius: 100%;
    overflow: hidden;

    .uploader-bottom {
      width: 100%;
      padding: 4px 0;
      background: rgba(#000, 0.4);
      position: absolute;
      z-index: 99;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      .icon-upload {
        font-size: 16px;
        color: #fff;
      }
    }
  }
}
</style>