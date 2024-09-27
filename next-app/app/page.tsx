"use client"

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ListTodo, PlusCircle } from "lucide-react";

export default function Home() {

  return (
    <>
      <Header />
      <div className="m-6">
        {/* Section to add new ToDoos */}
        <section>
          <div className="flex gap-2 items-center">
            <PlusCircle height={22} width={22} />
            <h3 className="my-3 font-bold text-2xl">Add ToDoos</h3>
          </div>
          <Input type="text" placeholder="ToDoo" className="bg-white p-5 rounded-2xl border-1 border-black" />
        </section>
        {/* Already added ToDoos */}
        <section>
          <div className="flex gap-2 items-center">
            <ListTodo height={22} width={22} />
            <h3 className="my-3 font-bold text-2xl">Saved ToDoos</h3>
          </div>
          <Input type="text" placeholder="ToDoo" className="bg-white p-5 rounded-2xl border-1 border-black" />
          <Input type="text" placeholder="ToDoo" className="bg-white p-5 rounded-2xl border-1 border-black" />
        </section>
        {/* Control buttons */}
        <section className="flex gap-4 justify-end">
          <Button variant="outline" className="rounded-xl">Burn</Button>
          <Button variant="default" className="w-28 rounded-xl">Mint</Button>
        </section>
      </div>
    </>
  );
}
