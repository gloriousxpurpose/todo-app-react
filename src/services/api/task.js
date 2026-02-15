import api from "./client"

export const getAllTasks = (params) => 
    api.get("/task", {params}).then((r) => r.data.data)

export const getTaskById = (id) =>
    api.get(`/task/${id}`).then((r) => r.data.data)

export const createTask = (payload) =>
    api.post("/task", payload).then((r) => r.data.data)

export const updateTask = (id, payload) =>
    api.patch(`/task/${id}`, payload).then((r) => r.data.data)

export const updateTaskStatus = (id, payload) =>
    api.patch(`/status/${id}`, payload).then((r) => r.data.data)

export const deleteTask = (id) =>
    api.delete(`/task/${id}`).then((r) => r.data.data)