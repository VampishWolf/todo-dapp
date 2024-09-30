'use client'

import { deleteToDo, fetchToDos, IToDo, updateToDo } from '@/actions/todoCrud';
import { cn } from '@/lib/utils';
import { CheckCircle, Trash2 } from 'lucide-react'; // Importing CheckCircle
import { useState } from 'react';
import { toast } from 'sonner';
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

    return (
        <div className="flex flex-col-reverse">
            {todos?.length ? todos.map((todo: IToDo) => (
                <div key={todo.id} className='relative cursor-pointer'>
                    <UpdateDialog todo={todo} setTodos={setTodos} />
                </div>
            )) : <p>No Todos yet! Dobi is free</p>}
        </div>
    );
}

const UpdateDialog = ({ todo, setTodos }: { todo: IToDo, setTodos: any }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [todoData, setTodoData] = useState<ToDoData>({
        title: todo.title,
        description: todo.description,
        dueDate: todo.dueDate,
        priority: todo.priority
    });

    const [updateSuccess, setUpdateSuccess] = useState(false); // For showing "Updated"

    const handleOpen = () => {
        if (todo.completed) {
            toast("History can't be rewritten!", {
                description: "Completed tasks can't be edited.",
            })
            return
        }
        setIsOpen(true);
        setUpdateSuccess(false); // Reset success message when reopening dialog
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleDelete = (event: React.MouseEvent, id: string) => {
        event.stopPropagation()
        deleteToDo(id);
        setTodos((prevTodos: any[]) => prevTodos.filter((todo: { id: string; }) => todo.id !== id));
        if (todo.completed) {
            toast("Voila, Erased!", {
                description: "Made space for some new Todoos.",
            })
        } else {
            toast("Meh, Removed!", {
                description: "You just deleted a ToDoo.",
            })
        }
    };

    const handleComplete = async (event: React.MouseEvent, id: string) => {
        event.stopPropagation(); // Prevent event from opening the dialog
        if (todo.completed) return;

        await updateToDo(id, {
            title: todoData.title,
            description: todoData.description,
            dueDate: todoData.dueDate,
            priority: todoData.priority
        }, true);

        toast("Whoa, you crushed!", {
            description: "A todoo was marked as completed.",
        })
        // Refetch the updated todos list
        const updatedTodos = await fetchToDos();
        setTodos(updatedTodos.todos.data); // Update the todos state with new data
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
                {/* Add stopPropagation to prevent the dialog from opening on CheckCircle click */}
                <CheckCircle height={16} width={16} className={cn(`absolute bottom-[30px] left-[10px] z-20 cursor-pointer`, todo.completed && 'text-green-500')}
                    onClick={(event) => handleComplete(event, todo.id!)} />
                <div className="rounded-xl bg-white relative z-10 border-black border-1 p-2 text-sm pl-10">{todo.title}</div>
                <div className="z-0 bg-black m-auto relative w-[98%] h-5 rounded-2xl bottom-4"></div>
                <Trash2 height={16} width={16} className="absolute float-right bottom-[30px] right-[10px] z-20 cursor-pointer" onClick={(event) => handleDelete(event, todo.id!)} />
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
