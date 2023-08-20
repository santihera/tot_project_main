import { API } from "../api/api";

export async function getFoods(skip, createdBy) {
    const data = await API.get(`/get-foods?skip=${skip}?&createdBy=${createdBy}`)
    return data;
}

export async function getFood(id) {
    const data = await API.get(`/foods/${id}`)
    return data;
}

export async function addFood(params) {
    const data = await API.post(`/add-foods`, params)
    return data;
}

export async function editFood(id, params) {
    const data = await API.put(`/edit-foods?id=${id}`, params)
    return data;
}

export async function deleteFood(id) {
    const data = await API.delete(`/delete-foods?id=${id}`)
    return data;
}