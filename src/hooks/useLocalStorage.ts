// hooks/useLocalStorage.ts
import { useCallback } from 'react';

const useLocalStorage = () => {
  const setValue = useCallback((key: string | number, value: string) => {
    localStorage.setItem(`noteContent-${key}`, value);
  }, []);

  const getValue = useCallback((key: string | number) => {
    return localStorage.getItem(`noteContent-${key}`);
  }, []);

  const deleteKey = useCallback((key: string | number) => {
    localStorage.removeItem(`noteContent-${key}`);
  }, []);

  return { setValue, getValue, deleteKey };
};

export default useLocalStorage;
