'use client'

import { fetchToDos } from "@/actions/todoCrud";
import CreateToDo from "@/components/CreateToDo";
import Header from "@/components/Header";
import TodosList from "@/components/TodosList";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from 'react';

export default function Home() {
  const [todos, setTodos] = useState([]);

  // Fetch todos on component mount
  useEffect(() => {
    const getTodos = async () => {
      const data = await fetchToDos();
      if (data.success) {
        setTodos(data.todos.data);
      }
    };
    getTodos();
  }, []);

  return (
    <>
      <Header />
      <div className="m-6">
        <CreateToDo setTodos={setTodos} />
        <TodosList todos={todos} setTodos={setTodos} />
        <section className="flex gap-4 justify-end">
          <Button variant="outline" className="rounded-xl" disabled>Burn</Button>
          <Button variant="default" className="w-28 rounded-xl" disabled>Mint</Button>
        </section>
      </div>
    </>
  );
}
