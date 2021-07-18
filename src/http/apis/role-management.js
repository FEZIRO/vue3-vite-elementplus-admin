import axios from "../axios";

export const list = data => axios({ url: "/roleList", method: "POST", data });

export const addUser = data =>
  axios({ url: "/roleList/add", method: "POST", data });

export const deleteUser = data =>
  axios({ url: "/roleList/delete", method: "POST", data });

export const editUser = data =>
  axios({ url: "/roleList/edit", method: "POST", data });
