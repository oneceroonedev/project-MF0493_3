import { useState, useEffect } from "react";
/**
 * useDebounce: returns the "debounced" value after the delay.
 * Uso: const debounced = useDebounce(value, 500);
 */
export default function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return debouncedValue;
}