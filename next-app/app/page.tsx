'use client'

import { fetchToDos } from "@/actions/todoCrud";
import CreateToDo from "@/components/CreateToDo";
import Header from "@/components/Header";
import NftsList from "@/components/NftsList";
import TodosList from "@/components/TodosList";
import { Button } from "@/components/ui/button";
import Dialog from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppKit } from "@reown/appkit/react";
import { CheckCheck, ListTodo, Loader2Icon } from "lucide-react";
import { useEffect, useState } from 'react';
import { toast } from "sonner";
import { useAccount, useSignMessage, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import erc721Abi from "../../smart-contracts/ERC721Abi.json";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const { data: hash, isPending, writeContract } = useWriteContract();

  const { isConnected, isConnecting, isDisconnected } = useAccount();
  const { open } = useAppKit();
  const { signMessage } = useSignMessage()
  const [isOpen, setIsOpen] = useState(false);

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

  const handleClose = () => {
    setIsOpen(false);
  };


  const mintNft = async () => {
    if (completedTodos < 2) {
      toast("Complete more Todos!", {
        description: "You need at least 2 completed todos to mint an NFT",
      })
      return
    }
    try {
      writeContract({
        abi: erc721Abi,
        address: '0x8E1096fd5C8Ca1EFdC1BC2F64Ae439E0888b1A46',
        functionName: 'mint',
      })
    } catch (error) {
      console.error(error, 'qeq');
      toast("Something went wrong", {
        description: error as string,
      })
    }
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: hash,
    })

  useEffect(() => {
    if (hash && isConfirming) {
      setIsOpen(true)
    } else if (isConfirmed) {
      toast("NFT Minted!", {
        description: "You just earned an NFT!",
      })
    }
  }, [isConfirming, isConfirmed])

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
          <Button variant="default" className="w-28 rounded-xl" onClick={mintNft} disabled={isPending || completedTodos < 2}>
            {isPending ? "Minting..." : "Mint"}
          </Button>
        </section>
        <Dialog isOpen={isOpen} onClose={handleClose} title="Congratulations!">
          <div className="text-center p-6 gap-4 flex flex-col items-center">
            {hash && isConfirming && !isConfirmed ? (
              <>
                <h4 className="text-2xl font-bold">Your NFT is on its way</h4>
                <p>Mint in progress...</p>
                <Loader2Icon className="animate-spin" size={32} />
              </>
            ) : (
              <>
                <h4 className="text-2xl font-bold">Hooray, You earned it</h4>
                <p>NFT minted!</p>
                <CheckCheck className="animate-bounce text-green-600" size={32} />
              </>
            )}
          </div>
        </Dialog>
        <section>
          {/* NFTs to be shown with burn option */}
          <NftsList isConfirmed={isConfirmed} />
        </section>
      </div>
    </>
  );
}
