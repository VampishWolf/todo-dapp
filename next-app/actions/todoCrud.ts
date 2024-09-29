"use server"

import axios from "axios";

export interface IToDo {
    id?: string;
    title: string;
    description: string;
    dueDate: string;
    priority: string;
    completed?: boolean;
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

export const updateToDo = async (id: string, obj: IToDo, completed?: boolean) => {
    try {
        completed ? obj.completed = true : obj.completed = false
        console.log(id, obj)
        const res = await axios.put(`${process.env.BACKEND_API_BASE_URL}/api/v1/todos/${id}`, obj);

        return { success: true, todos: res.data };

    } catch (error) {
        console.error('Error Response:', error);
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