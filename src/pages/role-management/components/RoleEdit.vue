<template>
  <div class="edit-page" v-if="modalConfig.visible">
    <el-page-header
      @back="onModalCloseClick"
      content="添加角色"
    ></el-page-header>

    <el-form
      size="medium"
      :model="data.form"
      label-position="top"
      style="width: 50%; margin: 0 auto; margin-top: 20px"
    >
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="角色名称：">
            <el-input
              size="medium"
              v-model="data.form.name"
              placeholder="请输入"
              clearable
              :style="{ width: '100%' }"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注：">
            <el-input
              type="textarea"
              size="medium"
              v-model="data.form.reamrk"
              placeholder="请输入"
              clearable
              :style="{ width: '100%' }"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="页面权限：">
            <el-tree
              :data="menuTree"
              show-checkbox
              node-key="id"
              :props="menuTreeDefaultProps"
            >
            </el-tree>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <div class="confirm-btn-group">
            <el-button size="medium" type="danger" @click="onModalCloseClick"
              >关闭</el-button
            >
            <el-button size="medium" type="primary" @click="onModalConfirmClick"
              >保存</el-button
            >
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  name: "RoleTableEdit",
  emits: ["confirm"],
  setup(props, context) {
    console.log("context", context);
    const modalConfig = reactive({
      type: "",
      title: "",
      visible: false,
      confirmBtnLoading: false,
    });

    const getDefaultForm = () => {
      return {
        name: "",
        remark: "",
        permission: "",
      };
    };

    const data = reactive({ form: getDefaultForm() });

    const menuTree = [
      {
        id: 2,
        label: "系统管理",
        children: [
          {
            id: 5,
            label: "用户管理",
          },
          {
            id: 6,
            label: "角色管理",
          },
        ],
      },
      {
        id: 3,
        label: "数据统计",
      },
    ];
    const menuTreeDefaultProps = { children: "children", label: "label" };

    const initModal = () => {
      data.form = getDefaultForm();
    };

    const showModal = (
      options = {
        type: "add",
        title: "",
        data: {},
      }
    ) => {
      modalConfig.type = options.type;
      modalConfig.visible = true;
      if (options.type === "add") {
        modalConfig.title = "添加";
      }
      if (options.type === "edit") {
        modalConfig.title = "编辑";
      }
      modalConfig.title = options.title || "";
      console.log("options", options);
      if (options.data) {
        data.form = { ...options.data };
      }
    };

    const hideModal = () => {
      modalConfig.visible = false;
      initModal();
    };

    const onModalCloseClick = () => {
      hideModal();
    };

    const onModalConfirmClick = () => {
      hideModal();
      context.emit("confirm");
    };

    return {
      modalConfig,
      data,
      menuTree,
      menuTreeDefaultProps,

      hideModal,
      showModal,
      onModalConfirmClick,
      onModalCloseClick,
    };
  },
};
</script>

<style lang="scss">
.edit-page {
  background: #fff;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 10;
  overflow: auto;
  box-sizing: border-box;
  padding: 20px;

  .confirm-btn-group {
    margin-top: 100px;
    text-align: right;
  }

  .el-form-item__label {
    width: 100%;
    font-weight: bold;
  }
}
</style>