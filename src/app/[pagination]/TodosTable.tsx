'use client';

import { useContext, useState, useMemo } from "react";
import { type Todo } from "./page";
import TodosPagination from "./TodosPagination";
import TodoTableItem from "./TodoTableItem";
import TodosContext from "./TodosContext";

const PER_PAGE = 15;

function Todos() {
  const { todos } = useContext(TodosContext);
  return todos.map((todo) => <TodoTableItem key={todo.id} todo={todo} />);
}

export default function TodosTable({ todos: allTodos }: { todos: Todo[] }) {
  const [currentPage, setCurrentPage] = useState(1);

  const end = currentPage * PER_PAGE;
  const start = end - PER_PAGE;

  const numOfPages = useMemo(() => {
    return Math.ceil(allTodos.length / PER_PAGE);
  }, [allTodos.length]);

  const pages = useMemo(() => {
    return [...Array(numOfPages + 1).keys()].slice(1);
  }, [numOfPages]);

  const todos = useMemo(() => allTodos.slice(start, end), [allTodos, start, end]);

  return (
    <TodosContext.Provider value={{ todos, pages, currentPage, setCurrentPage }}>
      <div className="flex flex-col gap-4">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                User ID
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Completed
              </th>
            </tr>
            </thead>
            <tbody>
              <Todos />
            </tbody>
          </table>
        </div>
        <TodosPagination />
      </div>
    </TodosContext.Provider>
  )
}
