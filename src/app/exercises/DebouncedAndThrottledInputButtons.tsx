'use client';

import { useRef } from "react";

type AnyFunction = (this: unknown, ...args: unknown[]) => unknown;

function debounce(func: AnyFunction, delay: number): AnyFunction {
  let lastFunc: ReturnType<typeof setTimeout>;
  return function(this: unknown, ...args: unknown[]) {
    clearTimeout(lastFunc);
    lastFunc = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  }
}

function throttle(func: AnyFunction, limit: number): AnyFunction {
  let lastFunc: ReturnType<typeof setTimeout>;
  let lastRan: number = 0;

  return function(this: unknown, ...args: unknown[]) {
    if (!lastRan) {
      func.apply(this, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func.apply(this, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

export default function DebouncedAndThrottledInputButtons() {
  const debouncedBtn = useRef<HTMLButtonElement>(null);
  const throttledBtn = useRef<HTMLButtonElement>(null);

  const handleDebounce = debounce(() => {
    if (!debouncedBtn.current) return;
    const textContent = debouncedBtn.current.textContent?.split(' ')?.[1];
    debouncedBtn.current.textContent = `Debounce ${Number(textContent) + 1}`;
  }, 1000);

  const handleThrottle = throttle(() => {
    if (!throttledBtn.current) return;
    const textContent = throttledBtn.current.textContent?.split(' ')?.[1];
    throttledBtn.current.textContent = `Throttled ${Number(textContent) + 1}`;
  }, 1000);

  return (
    <div className="flex w-full gap-2">
      <button type="button"
              ref={debouncedBtn}
              onClick={handleDebounce}
              className="py-1 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
        Debounce 0
      </button>

      <button type="button"
              ref={throttledBtn}
              onClick={handleThrottle}
              className="py-1 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
        Throttled 0
      </button>
    </div>
  )
}
