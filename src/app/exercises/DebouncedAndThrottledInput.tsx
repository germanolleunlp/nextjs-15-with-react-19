'use client';

import { useState } from "react";
import useDebounce from "@/app/shared/useDebounce";
import useThrottle from "@/app/shared/useThrottle";

export default function DebouncedAndThrottledInput() {
  const [name, setName] = useState('');
  const debounced = useDebounce(name, 1000);
  const throttled = useThrottle(name, 1000);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
        Name
        <input type="text"
               id="name"
               value={name}
               onChange={(e) => setName(e.target.value)}
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               placeholder="John"
               required />
      </label>

      <h2 className="text-gray-900 dark:text-white">Debounced: {debounced}</h2>
      <h2 className="text-gray-900 dark:text-white">Throttled: {throttled}</h2>
    </div>
  )
}
