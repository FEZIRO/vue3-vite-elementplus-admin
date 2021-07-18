import Mock from "../mock";
let roleList = [
  {
    id: 1,
    roleName: "管理员",
    remark: "--",
  },
  {
    id: 2,
    roleName: "超级管理员",
    remark: "--",
  },
  {
    id: 3,
    roleName: "普通用户",
    remark: "--",
  },
];

const pager = (list, pageSize) => {
  let newlist = [];
  for (let i = 0; i < list.length; i += pageSize) {
    newlist.push(list.slice(i, i + pageSize));
  }
  return newlist;
};

const parserBody = bodyStr => {
  if (bodyStr) {
    return JSON.parse(bodyStr);
  } else {
    return {};
  }
};

Mock.mock("/roleList", "post", config => {
  let body = parserBody(config.body);
  console.log("/roleList 请求", config);
  const pageSize = body.pageSize;
  const currentPage = body.currentPage;
  const keyword = body.keyword;

  let filterList = roleList.filter(item => new RegExp(keyword).test(item.name));
  return {
    success: true,
    msg: "",
    data: {
      list: pager(filterList, pageSize)[currentPage - 1],
      currentPage: currentPage,
      totalCount: filterList.length,
      totalPage: pager(filterList, pageSize).length,
      pageSize: pageSize,
    },
  };
});

Mock.mock("/roleList/add", "post", config => {
  let body = parserBody(config.body);
  console.log("/roleList/add 请求", config);
  roleList.unshift({
    id: Math.random(),
    name: body.name,
  });
  return {
    success: true,
    msg: "",
    data: {},
  };
});

Mock.mock("/roleList/delete", "post", config => {
  let body = parserBody(config.body);
  console.log("/roleList/delete 请求", config);
  roleList = roleList.filter(item => item.id !== body.id);
  return {
    success: true,
    msg: "",
    data: {},
  };
});

// Mock.mock("/roleList/edit", "post", config => {
//   let body = parserBody(config.body);
//   console.log("/roleList/add 请求", config);
//   roleList = roleList.filter(item => item.id !== body.id);
//   return {
//     success: true,
//     msg: "",
//     data: {},
//   };
// });
