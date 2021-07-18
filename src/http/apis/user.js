import axios from "../axios";

//登录操作
export const login = data => axios({ url: "/login", method: "POST", data });
