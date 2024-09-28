"use server"

import axios from "axios";

export interface IToDo {
    id?: string;
    title: string;
    description: string;
    dueDate: string;
    priority: string;
}

export const fetchToDos = async () => {
    try {
        const res = await axios.get(`${process.env.BACKEND_API_BASE_URL}/api/v1/todos?page=1&limit=10`);

        return { success: true, todos: res.data };
    } catch (error) {
        console.error(error)
        return { success: false }
    }

}

export const createToDo = async (obj: IToDo) => {
    try {
        const res = await axios.post(`${process.env.BACKEND_API_BASE_URL}/api/v1/todos`, obj);
        console.log(res.data)
        return { success: true, todos: res.data };

    } catch (error) {
        console.error(error)
        return { success: false }
    }

}

export const deleteToDo = async (id: string) => {
    try {
        const res = await axios.delete(`${process.env.BACKEND_API_BASE_URL}/api/v1/todos/${id}`);
        if (res.status === 204)
            return { success: true };
        else return { success: false };

    } catch (error) {
        console.error(error)
        return { success: false }
    }

}