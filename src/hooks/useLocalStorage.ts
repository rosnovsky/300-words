import { useState } from 'react';


export const useLocalStorage = (data?: string, key?: number): [string, { setValue(key: number, value: string): void, deleteKey(key: number): void, }] => {
  const [storedValue, setStoredValue] = useState(() => {
    if (!key) return data;
    try {
      const item = window.localStorage.getItem(key.toString());
      return item ? JSON.parse(item) : data;
    } catch (error) {
      console.log(error);
      return data;
    }
  });

  const setValue = (key: number, value: string,) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key.toString(), JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteKey = (key: number) => {
    try {
      window.localStorage.removeItem(key.toString());
    } catch (error) {
      console.log(error);
    }
  }

  return [storedValue, { setValue, deleteKey }];
}
