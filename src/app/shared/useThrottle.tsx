import { useState, useEffect, useRef } from "react";

export default function useThrottle<T>(value: T, interval: number): T {
  const [throttleValue, setThrottleValue] = useState<T>(value);
  const lastExecuted = useRef<number>(Date.now());

  useEffect(() => {
    if (Date.now() >= lastExecuted.current + interval) {
      lastExecuted.current = Date.now();
      setThrottleValue(value);
      return;
    }

    const timeout = setTimeout(() => {
      lastExecuted.current = Date.now();
      setThrottleValue(value);
    }, interval - (Date.now() - lastExecuted.current));

    return () => clearTimeout(timeout);
  }, [value, interval]);

  return throttleValue;
}
