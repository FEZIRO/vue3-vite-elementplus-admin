import { reactive } from "vue";
import { getType } from "@/others/utils";
import { ElMessage } from "element-plus";

export default function useTableData(api) {
  if (typeof api !== "function" && getType(api) !== "Promise") {
    throw new Error("请传入Promise类型的api请求");
  }

  //分页器每页个数配置组
  const PAGE_SIZES = [20, 50, 100];

  //初始化数据
  const DEFAULT_TABLE_DATA = {
    list: [],
    totalCount: 0,
    isLoading: false,
    currentPage: 1,
    pageSize: PAGE_SIZES[0],
  };

  //数据表格
  let tableData = reactive({
    list: DEFAULT_TABLE_DATA.list,
    totalCount: DEFAULT_TABLE_DATA.totalCount,
    isLoading: DEFAULT_TABLE_DATA.isLoading,
  });

  //数据表格基本请求参数
  let tableParams = {
    currentPage: DEFAULT_TABLE_DATA.currentPage,
    pageSize: DEFAULT_TABLE_DATA.pageSize,
  };

  //获取数据
  const fetchData = async () => {
    tableData.isLoading = true;
    let res = await api(tableParams).catch(err => {
      tableData.isLoading = false;
    });
    if (res) {
      console.log(api.toString() + "请求成功\n", res);
      tableData.isLoading = false;
      tableData.list = res.list;
      tableData.totalCount = res.totalCount;
    } else {
      ElMessage.error("数据获取失败！");
    }
  };

  //重置请求
  const reset = () => {
    tableData.list = DEFAULT_TABLE_DATA.list;
    tableData.totalCount = DEFAULT_TABLE_DATA.totalCount;
    tableData.isLoading = DEFAULT_TABLE_DATA.isLoading;
    tableParams = {
      currentPage: DEFAULT_TABLE_DATA.currentPage,
      pageSize: DEFAULT_TABLE_DATA.pageSize,
    };
    fetchData();
  };

  //刷新
  const refresh = () => {
    fetchData();
  };

  //设置查询参数
  const setParams = (params = {}) => {
    tableParams = { ...tableParams, ...params };
    fetchData();
  };

  return {
    PAGE_SIZES,
    tableData,
    tableParams,
    setParams,
    reset,
    refresh,
  };
}
