'use client'

import { fetchToDos } from "@/actions/todoCrud";
import CreateToDo from "@/components/CreateToDo";
import Header from "@/components/Header";
import TodosList from "@/components/TodosList";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAppKit } from "@reown/appkit/react";
import { Suspense, useEffect, useState } from 'react';
import { useAccount, useWriteContract } from "wagmi";
import erc721Abi from "../../smart-contracts/ERC721Abi.json";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [isMinting, setIsMinting] = useState<boolean>(false);
  const { toast } = useToast()
  const { writeContract } = useWriteContract()

  const { isConnected } = useAccount()
  const { open, close } = useAppKit()

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

  const mintNft = () => {
    setIsMinting(true);
    try {
      const tx = writeContract({
        abi: erc721Abi,
        address: '0x8E1096fd5C8Ca1EFdC1BC2F64Ae439E0888b1A46',
        functionName: 'mint',
      })

      toast({
        title: "NFT Minted!",
        description: "You just earned an NFT!",
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Something went wrong",
        description: error as string,
      })
    } finally {
      setIsMinting(false);
    }
  }

  const burnNft = async () => {
    try {
      const request = writeContract({
        abi: erc721Abi,
        address: '0x8E1096fd5C8Ca1EFdC1BC2F64Ae439E0888b1A46',
        functionName: 'burn',
        args: [54]
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Something went wrong",
        description: error as string,
      })
    }
  }

  if (!isConnected) {
    return (
      <div className="font-geistSans relative flex flex-col gap-4 items-center justify-center h-full">
        <section className="flex flex-col items-center justify-center">
          <h1 className="font-sylvia text-[140px] leading-[140px]">ToDoos</h1>
          <p >A special place which can hold all your ToDoos safely and also give you a chance to earn NFT and Tokens.</p>
        </section>
        {/* <Image src="../..." alt="checklist" width={800} height={400} /> */}
        <Button variant="default" onClick={() => open()}>
          Connect Wallet
        </Button>
      </div>
    )
  }

  return (
    <>
      <Header />
      <div className="m-6">
        <CreateToDo setTodos={setTodos} />
        <Suspense fallback={<div>Loading...</div>}>
          <TodosList todos={todos} setTodos={setTodos} />
        </Suspense>
        <section className="flex gap-4 justify-end">
          <Button variant="outline" className="rounded-xl" onClick={burnNft}>Burn</Button>
          <Button variant="default" className="w-28 rounded-xl" onClick={mintNft} disabled={isMinting}>{isMinting ? "Minting..." : "Mint"}</Button>
        </section>
      </div>
    </>
  );
}
