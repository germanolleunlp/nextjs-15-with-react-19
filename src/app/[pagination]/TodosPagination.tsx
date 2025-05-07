'use client';

import React, { useContext } from "react";
import clsx from "clsx";
import TodosContext from "./TodosContext";

export default function TodosPagination() {
  const { pages, currentPage, setCurrentPage } = useContext(TodosContext);

  const handleNext = () => {
    if (currentPage >= pages.length) return;
    setCurrentPage(currentPage + 1)
  }

  const handlePrevious = () => {
    if (currentPage <= 1) return;
    setCurrentPage(currentPage - 1);
  }

  return (
    <nav className="m-auto">
      <ul className="flex items-center -space-x-px h-8 text-sm">
        <li>
          <a href="#"
             onClick={(e) => {
               e.preventDefault();
               handlePrevious()
             }}
             className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span className="sr-only">Previous</span>
            <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                 fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M5 1 1 5l4 4"/>
            </svg>
          </a>
        </li>
        {pages.map((page) =>
          <li key={page}>
            <a href="#"
               onClick={(e) => {
                 e.preventDefault();
                 setCurrentPage(page)
               }}
               className={clsx(
                 "flex items-center justify-center px-3 h-8 leading-tight border hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white",
                 {
                   "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:border-gray-700 dark:text-white": currentPage === page,
                   "text-gray-500 bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400": currentPage !== page,
                 }
               )}
            >
              {page}
            </a>
          </li>
        )}
        <li>
          <a href="#"
             onClick={(e) => {
               e.preventDefault();
               handleNext()
             }}
             className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span className="sr-only">Next</span>
            <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                 fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="m1 9 4-4-4-4"/>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  )
}
