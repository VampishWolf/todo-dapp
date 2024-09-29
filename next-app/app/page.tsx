'use client'

import { fetchToDos } from "@/actions/todoCrud";
import CreateToDo from "@/components/CreateToDo";
import Header from "@/components/Header";
import TodosList from "@/components/TodosList";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from 'react';
import { useWriteContract } from "wagmi";
import erc721Abi from "../../smart-contracts/ERC721Abi.json";

export default function Home() {
  const [todos, setTodos] = useState([]);

  const { writeContract } = useWriteContract()

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

  const mintNft = async () => {
    const request = await writeContract({
      abi: erc721Abi,
      address: '0x8E1096fd5C8Ca1EFdC1BC2F64Ae439E0888b1A46',
      functionName: 'mint',
    })

    // const { request } = await publicClient.simulateContract({
    //   account,
    //   address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
    //   abi: erc721Abi,
    //   functionName: 'mint',
    // })
    // await walletClient.writeContract(request)
    console.log(request, 'minted')
  }

  return (
    <>
      <Header />
      <div className="m-6">
        <CreateToDo setTodos={setTodos} />
        <TodosList todos={todos} setTodos={setTodos} />
        <section className="flex gap-4 justify-end">
          <Button variant="outline" className="rounded-xl" disabled>Burn</Button>
          <Button variant="default" className="w-28 rounded-xl" onClick={mintNft}>Mint</Button>
        </section>
      </div>
    </>
  );
}
