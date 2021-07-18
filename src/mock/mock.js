import Mock from "mockjs";

Mock.setup({
  timeout: 500, // 设置延迟响应，模拟向后端请求数据
});


export default Mock;