"use client";

import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [fallbackValue] = useState(initialValue);
  const [value, setValue] = useState(fallbackValue);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedValue = window.localStorage.getItem(key);

      if (storedValue !== null) {
        setValue(JSON.parse(storedValue));
      }
    } catch {
      setValue(fallbackValue);
    } finally {
      setIsHydrated(true);
    }
  }, [fallbackValue, key]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    const serializedValue = JSON.stringify(value);
    const currentStoredValue = window.localStorage.getItem(key);

    if (currentStoredValue === serializedValue) {
      return;
    }

    window.localStorage.setItem(key, serializedValue);
  }, [isHydrated, key, value]);

  return { isHydrated, setValue, value };
}
