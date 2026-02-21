import api from "./client"

export const getAllUsers = (params) => 
    api.get("/user", {params}).then((r) => r.data)

export const getUserById = (id) =>
    api.get(`/user/${id}`).then((r) => r.data)

export const createUser = (payload) =>
    api.post("/register", payload).then((r) => r.data)

export const updateUser = (id, payload) =>
    api.put(`/user/${id}`, payload).then((r) => r.data)

export const deleteUser = (id) =>
    api.delete(`/user/${id}`).then((r) => r.data)

export const loginUser = (payload) =>
    api.post("/login", payload).then((r) => r.data);

export const getMe = () =>
    api.get("/me").then((r) => r.data);