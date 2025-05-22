import { Suspense, use } from "react";
import TodosTable from "./TodosTable";

export interface Todo {
  id: number;
  userId: number,
  title: string;
  completed: boolean;
}

async function getTodos(): Promise<Todo[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos');
  return await res.json();
}

function TodosPaginated({ todosPromise }: { todosPromise: Promise<Todo[]> }) {
  const todos = use(todosPromise);
  return <TodosTable todos={todos}/>
}

export default function Pagination() {
  const todosPromise = getTodos();

  return (
    <div className="flex gap-4 items-start flex-col">
      <Suspense fallback={<p>Loading...</p>}>
        <TodosPaginated todosPromise={todosPromise}/>
      </Suspense>
    </div>
  );
}
