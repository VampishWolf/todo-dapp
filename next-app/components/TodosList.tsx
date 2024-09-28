'use client'

import { fetchToDos, IToDo } from '@/actions/todoCrud';
import { ListTodo } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Input } from './ui/input';



export default function TodosList() {
    const [todos, setTodos] = useState<IToDo[]>([]);

    useEffect(() => {
        const getTodos = async () => {
            const data = await fetchToDos();
            if (data.success) {
                setTodos(data.todos.data);
            }
        };
        getTodos();
    }, []);

    const handleDelete = (id: string) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    return (
        <section>
            <div className="flex gap-2 items-center border-b-1 border-slate-500 my-2">
                <ListTodo height={22} width={22} />
                <h3 className="my-3 font-bold text-2xl">Saved ToDoos ({todos?.length})</h3>
            </div>
            <div className="my-4 flex flex-col-reverse">
                {todos?.length ? todos.map((todo: any) => (
                    // <TodoInput type="readonly" data={todo} withDelete={true} onDelete={() => handleDelete(todo.id)} />
                    <div>
                        <Input
                            id="title"
                            name="title"
                            placeholder="Enter title"
                            value={todo.title}
                            // onChange={handleChange}
                            className="rounded-xl bg-white relative z-10 border-black"
                        />
                        <div className="z-0 bg-black m-auto relative w-[98%] h-5 rounded-2xl bottom-4"></div>

                    </div>
                ))
                    : <p>No Todos yet! Dobi is free</p>
                }
            </div>
        </section>
    )
}
