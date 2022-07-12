import $api from "./server";

// 添加管理员
export const addAdmin = async () => {
    let res = await $api.post('/admin/add', data)
    return res;
}

// 管理员登录
export const loginAdmin = async () => {
    let res = await $api.post('/admin/add', data)
    return res;
}