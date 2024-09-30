'use client'

import { fetchToDos } from "@/actions/todoCrud";
import CreateToDo from "@/components/CreateToDo";
import Header from "@/components/Header";
import NftsList from "@/components/NftsList";
import TodosList from "@/components/TodosList";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppKit } from "@reown/appkit/react";
import { ListTodo } from "lucide-react";
import { useEffect, useState } from 'react';
import { toast } from "sonner";
import { useAccount, useDisconnect, useSignMessage, useWriteContract } from "wagmi";
import erc721Abi from "../../smart-contracts/ERC721Abi.json";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState<number>(0);
  const [isMinting, setIsMinting] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const { writeContract } = useWriteContract();



  const { isConnected, isConnecting, isDisconnected } = useAccount();
  const { open } = useAppKit();
  const { signMessage } = useSignMessage()
  const { disconnect } = useDisconnect();

  useEffect(() => {
    const getTodos = async () => {
      setLoading(true); // Start loading
      const data = await fetchToDos();
      if (data.success) {
        setTodos(data.todos.data);
      }

      setLoading(false); // End loading
    };
    getTodos();
  }, []);

  useEffect(() => {
    setCompletedTodos(todos.filter((todo: { completed: boolean; }) => todo.completed).length);
    console.log(completedTodos, todos, 'aewq')
  }, [todos])


  useEffect(() => {
    const signViaWallet = () => {
      if (isConnected) {
        try {
          signMessage({ message: 'Welcome to ToDoos' });
        } catch (error) {
          // disconnect(); // Disconnect if there's an error (e.g., user cancels)
          console.error("Error signing message:", error);
        }
      }
    }
    signViaWallet()
  }, [isConnected]);


  const mintNft = async () => {
    setIsMinting(true);

    if (completedTodos < 2) {
      toast("Complete more Todos!", {
        description: "You need at least 2 completed todos to mint an NFT",
      })

      setIsMinting(false);
      return
    }
    try {
      const tx = await writeContract({
        abi: erc721Abi,
        address: '0x8E1096fd5C8Ca1EFdC1BC2F64Ae439E0888b1A46',
        functionName: 'mint',
      })

      toast("NFT Minted!", {
        description: "You just earned an NFT!",
      })
    } catch (error) {
      console.error(error);
      toast("Something went wrong", {
        description: error as string,
      })
    } finally {
      setIsMinting(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="font-geistSans relative flex flex-col gap-4 items-center justify-center h-full p-[25%]">
        <section className="flex flex-col items-center justify-center">
          <h1 className="font-sylvia text-[140px] leading-[140px]">ToDoos</h1>
          <p>A special place which can hold all your ToDoos safely and also give you a chance to earn NFT and Tokens.</p>
        </section>
        {isDisconnected ?
          <Button variant="default" onClick={() => open()}>
            Connect Wallet
          </Button>
          : <Skeleton className="w-[133px] h-9 rounded-lg bg-zinc-600" />
        }
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="m-6 font-geistSans">
        <CreateToDo setTodos={setTodos} />
        <div className="flex gap-2 items-center border-b-1 border-slate-500 mt-8 mb-5 pb-4">
          <ListTodo height={22} width={22} />
          <h3 className="font-bold text-2xl">Saved ToDoos ({todos?.length})</h3>
        </div>
        <div className="my-4">
          {loading ? (
            <div className="flex flex-col gap-4">
              {/* Show loading indicator */}
              {[1, 2, 3].map((item) => <Skeleton key={item} className='w-full h-12' />)}
            </div>
          ) : (
            <TodosList todos={todos} setTodos={setTodos} />
          )}
        </div>
        <section className="flex gap-4 justify-end items-center">
          <p className="text-md">You finish two ToDoos to mint an NFT.</p>
          <Button variant="default" className="w-28 rounded-xl" onClick={mintNft} disabled={isMinting || completedTodos < 2}>
            {/* Fix this isMinting */}
            {isMinting ? "Minting..." : "Mint"}
          </Button>
        </section>
        <section>
          {/* NFTs to be shown with burn option */}
          <NftsList />
        </section>
      </div>
    </>
  );
}
