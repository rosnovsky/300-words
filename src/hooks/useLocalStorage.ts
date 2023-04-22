import { useState } from 'react';


export const useLocalStorage = (data?: string, key?: string): [string, { setValue(value: string, key: string): void, deleteKey(key: string): void, }] => {
  const [storedValue, setStoredValue] = useState(() => {
    if (!key) return data;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : data;
    } catch (error) {
      console.log(error);
      return data;
    }
  });

  const setValue = (key: string, value: string,) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteKey = (key: string) => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  }

  return [storedValue, { setValue, deleteKey }];
}
