import { deleteToDo, IToDo } from '@/actions/todoCrud';
import { CheckCircle, ListTodo } from 'lucide-react';
import { Input } from './ui/input';

export default function TodosList({ todos, setTodos }: { todos: IToDo[], setTodos: any }) {
    const handleDelete = (id: string) => {
        deleteToDo(id);
        setTodos((prevTodos: any[]) => prevTodos.filter((todo: { id: string; }) => todo.id !== id));
    };

    return (
        <section>
            <div className="flex gap-2 items-center border-b-1 border-slate-500 my-2">
                <ListTodo height={22} width={22} />
                <h3 className="my-3 font-bold text-2xl">Saved ToDoos ({todos?.length})</h3>
            </div>
            <div className="my-4 flex flex-col-reverse">
                {todos?.length ? todos.map((todo: IToDo) => (
                    <div key={todo.id}>
                        <Input
                            id="title"
                            name="title"
                            value={todo.title}
                            className="rounded-xl bg-white relative z-10 border-black"
                        />
                        <div className="z-0 bg-black m-auto relative w-[98%] h-5 rounded-2xl bottom-4"></div>
                        <CheckCircle height={18} width={18} className="relative float-right bottom-12 right-3 z-20 cursor-pointer" onClick={() => handleDelete(todo.id!)} />
                    </div>
                )) : <p>No Todos yet! Dobi is free</p>}
            </div>
        </section>
    );
}
