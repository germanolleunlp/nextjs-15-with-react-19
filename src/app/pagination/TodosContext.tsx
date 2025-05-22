import { createContext } from "react";
import type { Todo } from "./page";

const TodosContext = createContext<{
  todos: Todo[],
  pages: number[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
}>({
  todos: [],
  pages: [1],
  currentPage: 1,
  setCurrentPage: () => void 0,
})

export default TodosContext;
