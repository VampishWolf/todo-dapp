import { IToDo } from '@/actions/todoCrud';
import { DatePicker } from './DatePicker';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

function TodoContainer(
    { handleChange, todoData }:
        {
            handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { name: string; value: string }) => void,
            todoData: IToDo
        }) {
    return (
        <div>
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
                        <DatePicker
                            handleOnChange={handleChange}
                            selectedDate={todoData.dueDate}
                        />
                    </span>


                    <span className="w-1/2">
                        <select
                            className="bg-white z-10 relative w-full border-black rounded-xl p-2 border-1 outline-none"
                            onChange={(e) => handleChange({ name: 'priority', value: e.target.value })}
                            value={todoData.priority}>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                        <div className="z-0 bg-black m-auto relative w-[98%] h-5 rounded-2xl bottom-4"></div>

                    </span>
                </div>
            </section>
        </div>
    )
}

export default TodoContainer