import axios from "../axios";

export const list = data => axios({ url: "/userList", method: "POST", data });

export const addUser = data =>
  axios({ url: "/userList/add", method: "POST", data });

export const deleteUser = data =>
  axios({ url: "/userList/delete", method: "POST", data });

export const editUser = data =>
  axios({ url: "/userList/edit", method: "POST", data });
