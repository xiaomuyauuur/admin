import $api from "./server";

// 添加楼栋
export const addBuild = async (data) => {
    let res = await $api.post('/admin/add', data)
    return res.data;
}

// 查询所有的楼栋
export const getAllBuild = async (data) => {
    let res = await $api.post('/admin/login', data)
    return res.data;
}