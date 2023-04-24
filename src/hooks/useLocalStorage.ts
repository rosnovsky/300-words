import { useState } from 'react';


export const useLocalStorage = (data?: string, key?: number): [string, { getValue(key: number): string | undefined, setValue(key: number, value: string): void, deleteKey(key: number): void, }] => {
  const [storedValue, setStoredValue] = useState(() => {
    if (!key) return data;
    try {
      const item = localStorage.getItem(key.toString());
      return item ? JSON.parse(item) : data;
    } catch (error) {
      console.log(error);
      return data;
    }
  });

  const setValue = async (key: number, value: string,) => {
    try {
      setStoredValue(() => value);
      localStorage.setItem(key.toString(), JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  const getValue = (key: number) => {
    try {
      const item = localStorage.getItem(key.toString());
      return item ? JSON.parse(item) : data;
    } catch (error) {
      console.log(error);
      return data;
    }
  }

  const deleteKey = (key: number) => {
    try {
      localStorage.removeItem(key.toString());
    } catch (error) {
      console.log(error);
    }
  }

  return [storedValue, { getValue, setValue, deleteKey }];
}
