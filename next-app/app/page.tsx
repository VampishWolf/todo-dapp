import CreateToDo from "@/components/CreateToDo";
import Header from "@/components/Header";
import TodosList from "@/components/TodosList";
import { Button } from "@/components/ui/button";

export default async function Home() {

  if (!process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL) {
    console.error("Missing API endpoint")
  }

  return (
    <>
      <Header />
      <div className="m-6">
        {/* Section to add new ToDoos */}

        <CreateToDo />

        {/* Already added ToDoos */}
        <TodosList />

        {/* Control buttons */}
        <section className="flex gap-4 justify-end">
          <Button variant="outline" className="rounded-xl" disabled>Burn</Button>
          <Button variant="default" className="w-28 rounded-xl" disabled>Mint</Button>
        </section>
      </div>
    </>
  );
}
