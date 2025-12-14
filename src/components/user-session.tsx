"use client";

import { readUserSession } from "@/actions/user";
import { IUserSession } from "@/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export interface IUserSessionContext{
  user: IUserSession|null;
  loading: boolean;
  loadSession: ()=>Promise<void>;
}

const UserSessionContext = createContext<IUserSessionContext|undefined>(undefined);

export const UserSessionContextProvider = ({children}:{children: ReactNode})=>{
  const [user, setUser] = useState<IUserSession|null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const loadSession = async ()=>{
    if(loading){
      return;
    }
    setLoading(true);
    try{
      const session = await readUserSession();
      setUser(session);
    }catch(error){
      setUser(null);
    }finally{
      setLoading(false);
    }
  }
  useEffect(()=>{
    loadSession();
  }, []);
  return (
    <UserSessionContext.Provider value={{user, loading, loadSession}}>{children}</UserSessionContext.Provider>
  )
}
export const useUserSession = ()=>{
  const context = useContext(UserSessionContext);
  if(!context){
    throw new Error("unknown error happened in session context provider");
  }
  return context;
}