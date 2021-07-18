import Mock from "../mock";
let userList = new Array(100)
  .fill({
    id: "",
    name: "",
  })
  .map((item, index) => {
    return {
      id: index,
      img: "https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3305298991,2024211813&fm=26&gp=0.jpg",
      userName: "张三" + index,
      sex: "男",
      role: "管理员",
      phone: "13323131321",
      loginTime: "32",
      lastLoginTime: "2020-12-12 01:00:00",
    };
  });

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

Mock.mock("/userList", "post", config => {
  let body = parserBody(config.body);
  console.log("/userList 请求", config);
  const pageSize = body.pageSize;
  const currentPage = body.currentPage;
  const keyword = body.keyword;

  let filterList = userList.filter(item =>
    new RegExp(keyword).test(item.userName)
  );
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

Mock.mock("/userList/add", "post", config => {
  let body = parserBody(config.body);
  console.log("/userList/add 请求", config);
  userList.unshift({
    id: Math.random(),
    name: body.username,
  });
  return {
    success: true,
    msg: "",
    data: {},
  };
});

Mock.mock("/userList/delete", "post", config => {
  let body = parserBody(config.body);
  console.log("/userList/delete 请求", config);
  userList = userList.filter(item => item.id !== body.id);
  return {
    success: true,
    msg: "",
    data: {},
  };
});

// Mock.mock("/userList/edit", "post", config => {
//   let body = parserBody(config.body);
//   console.log("/userList/add 请求", config);
//   userList = userList.filter(item => item.id !== body.id);
//   return {
//     success: true,
//     msg: "",
//     data: {},
//   };
// });
