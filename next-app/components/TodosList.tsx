'use client'

import { deleteToDo, fetchToDos, IToDo, updateToDo } from '@/actions/todoCrud';
import { CheckCircle, ListTodo } from 'lucide-react'; // Importing CheckCircle
import { useState } from 'react';
import TodoContainer from './TodoContainer';
import { Button } from './ui/button';
import Dialog from './ui/dialog';

interface ToDoData {
    title: string;
    description: string;
    dueDate: string;
    priority: string;
}

export default function TodosList({ todos, setTodos }: { todos: IToDo[], setTodos: any }) {
    const handleDelete = (id: string) => {
        deleteToDo(id);
        setTodos((prevTodos: any[]) => prevTodos.filter((todo: { id: string; }) => todo.id !== id));
    };

    return (
        <section>
            <div className="flex gap-2 items-center border-b-1 border-slate-500 mt-8 mb-5 pb-4">
                <ListTodo height={22} width={22} />
                <h3 className="font-bold text-2xl">Saved ToDoos ({todos?.length})</h3>
            </div>
            <div className="flex flex-col-reverse">
                {todos?.length ? todos.map((todo: IToDo) => (
                    <div key={todo.id} className='relative cursor-pointer'>
                        <UpdateDialog todo={todo} handleDelete={handleDelete} setTodos={setTodos} />
                    </div>
                )) : <p>No Todos yet! Dobi is free</p>}
            </div>
        </section>
    );
}

const UpdateDialog = ({ todo, handleDelete, setTodos }: { todo: IToDo, handleDelete: (id: string) => void, setTodos: any }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [todoData, setTodoData] = useState<ToDoData>({
        title: todo.title,
        description: todo.description,
        dueDate: todo.dueDate,
        priority: todo.priority
    });

    const [updateSuccess, setUpdateSuccess] = useState(false); // For showing "Updated"

    const handleOpen = () => {
        setIsOpen(true);
        setUpdateSuccess(false); // Reset success message when reopening dialog
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { name: string; value: string }) => {
        if ('target' in event) {
            const { name, value } = event.target;
            setTodoData(prev => ({ ...prev, [name]: value }));
        } else {
            setTodoData(prev => ({ ...prev, [event.name]: event.value }));
        }
    };

    const updateEntry = async () => {
        try {
            await updateToDo(todo.id!, {
                title: todoData.title,
                description: todoData.description,
                dueDate: todoData.dueDate,
                priority: todoData.priority
            });

            setUpdateSuccess(true); // Show "Updated" message

            // Refetch the updated todos list
            const updatedTodos = await fetchToDos();
            // console.log(updatedTodos, 'updatedTodos');
            setTodos(updatedTodos.todos.data); // Update the todos state with new data

            // After 2 seconds, close the dialog
            setTimeout(() => {
                handleClose();
            }, 2000);

        } catch (error) {
            console.error('Update failed:', error);
        }
    };

    return (
        <div>
            <div onClick={handleOpen}>
                <div className="rounded-xl bg-white relative z-10 border-black border-1 p-2 text-sm">{todo.title}</div>
                <div className="z-0 bg-black m-auto relative w-[98%] h-5 rounded-2xl bottom-4"></div>
                <CheckCircle height={18} width={18} className="absolute float-right bottom-[30px] right-[10px] z-20 cursor-pointer" onClick={() => handleDelete(todo.id!)} />
            </div>
            <Dialog isOpen={isOpen} onClose={handleClose} title="Update Todoo">
                <TodoContainer todoData={todoData} handleChange={handleChange} />
                <Button onClick={updateEntry} className="w-full bg-black text-white rounded-xl">
                    {updateSuccess ? <><CheckCircle className="mr-2" size={16} /> Updated</> : "Update ToDoo"} {/* Added CheckCircle icon before Updated */}
                </Button>
            </Dialog>
        </div>
    )
}
