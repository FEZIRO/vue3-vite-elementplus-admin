import Mock from "../mock";

Mock.mock("/login", "post", config => {
  console.log("mockconfig", config);
  let body = config.body && JSON.parse(config.body);
  console.log("body", body);

  if (body.username === "1" && body.password === "1") {
    return {
      success: true,
      msg: "登录成功",
      data: {
        userInfo: {
          id: "32hnhszj22872hwkjae",
          name: "系统管理员",
          role: "管理员",
          avatar:
            "https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3305298991,2024211813&fm=26&gp=0.jpg",
        },
        menu: [
          // {
          //   id: "0",
          //   name: "首页",
          //   icon: "el-icon-s-home",
          //   type: "page",
          //   url: "/home",
          //   children: null,
          //   fullPath: ["首页"],
          // },
          {
            id: "1",
            name: "系统管理",
            icon: "el-icon-setting",
            url: "/system",
            fullPath: ["系统管理"],
            type: "group",
            children: [
              {
                id: "1-1",
                name: "用户管理",
                icon: "",
                type: "page",
                url: "/system/user-management",
                children: null,
                fullPath: ["系统管理", "用户管理"],
              },
              {
                id: "1-2",
                name: "角色管理",
                icon: "",
                type: "page",
                url: "/system/role-management",
                children: null,
                fullPath: ["系统管理", "角色管理"],
              },
            ],
          },
          // {
          //   id: "2",
          //   name: "统计",
          //   icon: "",
          //   type: "page",
          //   url: "/chart",
          //   children: null,
          //   fullPath: [
          //     {
          //       name: "统计",
          //       url: "/chart",
          //     },
          //   ],
          // },
        ],
      },
    };
  }
  if (body.username === "2" && body.password === "2") {
    return {
      success: true,
      msg: "登录成功",
      data: {
        userInfo: {
          id: "ashwh2872dkjsahhwkjae",
          name: "张三",
          role: "普通用户",
          avatar:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2448425926,3379370176&fm=11&gp=0.jpg",
        },
        menu: [
          // {
          //   id: "0",
          //   name: "首页",
          //   icon: "",
          //   type: "page",
          //   url: "/home",
          //   children: null,
          //   path: [],
          //   fullPath: ["首页"],
          // },
        ],
      },
    };
  }

  return {
    success: false,
    msg: "密码错误！",
    data: {},
  };
});
