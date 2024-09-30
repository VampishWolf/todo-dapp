'use client'

import { createToDo, fetchToDos } from "@/actions/todoCrud"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import TodoContainer from "./TodoContainer"
import { Button } from "./ui/button"

interface ToDoData {
    title: string;
    description: string;
    dueDate: string;
    priority: string;
}

function CreateToDo({ setTodos }: { setTodos: any }) {
    const [todoData, setTodoData] = useState<ToDoData>({
        title: '',
        description: '',
        dueDate: new Date().toISOString().slice(0, 10),
        priority: 'low'
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { name: string; value: string }) => {
        if ('target' in event) {
            const { name, value } = event.target;
            setTodoData(prev => ({ ...prev, [name]: value }));
        } else {
            setTodoData(prev => ({ ...prev, [event.name]: event.value }));
        }
    };

    const createEntry = async () => {
        console.log(todoData)
        await createToDo({
            title: todoData.title,
            description: todoData.description,
            dueDate: todoData.dueDate,
            priority: todoData.priority
        });

        // Refetch the todos list after creation
        const data = await fetchToDos();
        if (data.success) {
            toast("Woohoo, created!", {
                description: "You just created a Todoo.",
            })
            setTodos(data.todos.data);
        }
    };

    return (
        <>
            <div className="flex gap-2 items-center border-b-1 border-slate-500 my-4">
                <PlusCircle height={22} width={22} />
                <h3 className="my-3 font-bold text-2xl">Add ToDoos</h3>
            </div>
            <section>
                <TodoContainer handleChange={handleChange} todoData={todoData} />

                <Button onClick={createEntry} className="w-full bg-black text-white rounded-xl">
                    Create ToDoo
                </Button>
            </section>
        </>
    );
}

export default CreateToDo
