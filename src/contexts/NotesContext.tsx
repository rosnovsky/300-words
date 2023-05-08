"use client";

import React, { createContext, Dispatch, useContext } from 'react';
import { Action, appReducer, initialState } from '@/utils/reducers';

type AppContextType = {
  state: typeof initialState;
  dispatch: Dispatch<Action>;
};

interface AppProviderProps { }

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<React.PropsWithChildren<AppProviderProps>> = ({ children }) => {
  const [state, dispatch] = React.useReducer(appReducer, initialState);
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};
