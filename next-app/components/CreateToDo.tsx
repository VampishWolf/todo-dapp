'use client'

import { createToDo } from "@/actions/todoCrud"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import { DatePicker } from "./DatePicker"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"

interface ToDoData {
    title: string;
    description: string;
    dueDate: string;
    priority: string;
}

function CreateToDo() {
    const [todoData, setTodoData] = useState<ToDoData>({
        title: '',
        description: '',
        dueDate: '',
        priority: ''
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
        console.log(todoData);  // Submit the form here
        await createToDo({
            title: todoData.title,
            description: todoData.description,
            dueDate: todoData.dueDate,
            priority: todoData.priority
        })
    };

    return (
        <>
            <div className="flex gap-2 items-center border-b-1 border-slate-500 my-2">
                <PlusCircle height={22} width={22} />
                <h3 className="my-3 font-bold text-2xl">Add ToDoos</h3>
            </div>
            <section className="space-y-3">
                <div>
                    <Input
                        id="title"
                        name="title"
                        placeholder="Enter title"
                        value={todoData.title}
                        onChange={handleChange}
                        className="rounded-xl bg-white relative z-10 border-black"
                    />
                    <div className="z-0 bg-black m-auto relative w-[98%] h-5 rounded-2xl bottom-4"></div>

                </div>
                <section className="float-right relative w-full">
                    <div>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Enter description"
                            value={todoData.description}
                            onChange={handleChange}
                            className="rounded-xl bg-white relative z-10 border-black"
                        />
                        <div className="z-0 bg-black m-auto relative w-[98%] h-5 rounded-2xl bottom-4"></div>

                    </div>

                    <div className="flex gap-2">
                        <span className="w-1/2">
                            <DatePicker handleOnChange={handleChange} />
                        </span>


                        <span className="w-1/2">
                            <select
                                className="bg-white z-10 relative w-full border-black rounded-xl p-2 border-1"
                                onChange={(e) => handleChange({ name: 'priority', value: e.target.value })}>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                            <div className="z-0 bg-black m-auto relative w-[98%] h-5 rounded-2xl bottom-4"></div>

                        </span>
                    </div>
                </section>

                <Button onClick={createEntry} className="w-full bg-black text-white rounded-xl">
                    Create ToDoo
                </Button>
            </section>
        </>
    );
}

export default CreateToDo