<template>
  <div
    class="user-management-page"
    v-loading="userManagementTable.tableData.isLoading"
    element-loading-text="拼命加载中"
  >
    <div class="table-action-bar">
      <div class="bar-left">
        <el-space>
          <el-input
            v-model="filterForm.keyword"
            class="search-input"
            prefix-icon="el-icon-search"
            size="small"
            placeholder="用户名/姓名"
            clearable
            style="flex-shrink: 0"
          ></el-input>
          <el-select
            style="width: 100px; flex-shrink: 0"
            v-model="filterForm.sex"
            class="search-input"
            prefix-icon="el-icon-search"
            size="small"
            placeholder="性别"
            clearable
          >
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-space>
      </div>
      <div class="bar-right">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-circle-plus-outline"
          @click="onTableAddClick"
          >添加</el-button
        >
        <el-button
          type="danger"
          size="small"
          icon="el-icon-delete"
          @click="onTableDeleteClick"
          >删除</el-button
        >
      </div>
    </div>
    <el-table
      :data="userManagementTable.tableData.list"
      tooltip-effect="dark"
      :height="windowRect.clientHeight.value - 250"
      :row-style="{ height: '65px' }"
      @selection-change="onTableSelectionChange"
    >
      <el-table-column
        type="selection"
        width="50"
        show-overflow-tooltip
        header-align="center"
        align="center"
      >
      </el-table-column>
      <el-table-column label="头像" width="80" show-overflow-tooltip>
        <template #default="scope">
          <el-avatar :size="32" :src="scope.row.img"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="userName" label="用户名" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="sex" label="性别" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="角色" show-overflow-tooltip>
        <template #default="scope">
          <el-tag effect="dark" size="small">
            {{ scope.row.role }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="联系电话"
        min-width="120"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="loginTime" label="登录次数" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="lastLoginTime"
        label="最后登录时间"
        min-width="200"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="操作"
        show-overflow-tooltip
        min-width="95"
        fixed="right"
      >
        <template #default="scope">
          <el-button
            type="warning"
            size="small"
            @click="onTableEditClick(scope.row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
      <template v-slot:empty> 暂无数据 </template>
    </el-table>
    <div class="table-pager">
      <el-pagination
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
        :page-size="userManagementTable.tableParams.pageSize"
        :page-sizes="userManagementTable.PAGE_SIZES"
        layout="sizes, total, prev, pager, next"
        :total="userManagementTable.tableData.totalCount"
      >
      </el-pagination>
    </div>
    <UserEdit
      ref="userTableEdit"
      @confirm="userManagementTable.refresh"
    ></UserEdit>
  </div>
</template>

<script>
import { reactive, onMounted, ref, watch } from "vue";
import useWindowRect from "@/hooks/useWindowRect.js";
import useTableData from "@/hooks/useTableData.js";
import UserEdit from "./components/UserEdit.vue";
import http from "@/http";
export default {
  name: "user-management",
  components: {
    UserEdit,
  },
  setup() {
    const windowRect = useWindowRect();
    const userManagementTable = useTableData(http.userManagement.list);
    //表格筛选
    let filterForm = reactive({
      keyword: "",
      sex: "",
    });

    watch([() => filterForm.keyword, () => filterForm.sex], () => {
      console.log("filterForm更新", filterForm);
      userManagementTable.setParams({
        keyword: filterForm.keyword,
        sex: filterForm.sex,
      });
    });

    const onSizeChange = (val) => {
      userManagementTable.setParams({
        pageSize: val,
      });
      console.log(`每页 ${val} 条`);
    };
    const onCurrentChange = (val) => {
      userManagementTable.setParams({
        currentPage: val,
      });
      console.log(`当前页: ${val}`);
    };
    onMounted(() => {
      userManagementTable.setParams({
        keyword: filterForm.keyword,
      });
    });

    //表格多选
    const tableSelection = ref([]);
    const onTableSelectionChange = (val) => {
      tableSelection.value = val;
    };

    //弹窗
    const userTableEdit = ref(null);
    const onTableAddClick = () => {
      userTableEdit.value.showModal({
        type: "add",
        title: "添加",
      });
    };
    const onTableEditClick = (item) => {
      userTableEdit.value.showModal({
        type: "edit",
        title: "添加",
        data: {
          userName: item.userName,
          sex: item.sex,
          phone: item.phone,
          role: item.role,
        },
      });
    };
    const onTableDeleteClick = () => {};

    return {
      filterForm,
      userManagementTable,
      tableSelection,
      userTableEdit,

      onTableAddClick,
      onTableEditClick,
      onTableDeleteClick,
      onTableSelectionChange,
      onSizeChange,
      onCurrentChange,
      windowRect,
    };
  },
};
</script>

<style lang="scss">
.user-management-page {
  position: relative;
  width: 100%;
  box-sizing: border-box;

  .table-action-bar {
    position: sticky;
    top: 0;
    z-index: 999;
    background: #fff;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 10px;
    box-sizing: border-box;

    .bar-left {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      width: 60%;

      .search-input {
        width: 200px;
      }

      .filter-btn {
        margin-left: 10px;
      }

      .search-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 30%;
        cursor: pointer;
      }
    }
    .bar-right {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      justify-content: flex-end;
    }
  }

  .table-pager {
    width: 100%;
    @include flex-row-center-center;
    padding: 20px 0;
    box-sizing: border-box;
    background: #fff;
  }
}
</style>