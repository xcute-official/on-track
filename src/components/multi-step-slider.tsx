"use client";

import { createContext, FC, ReactNode, useContext, useMemo, useState } from "react";

type ContextType = {
  nextStep: (totalSteps: number)=>void;
  prevStep: ()=>void;
  stepsIndex: number;
}
const Context = createContext<ContextType|undefined>(undefined);
export const StepContextProvder = ({children}:{children: ReactNode})=>{
  const [stepsIndex, setStepsIndex] = useState<number>(0);
  const nextStep = (totalSteps: number)=>{
    if(stepsIndex<totalSteps-1){
      setStepsIndex(stepsIndex+1);
    }
  }
  const prevStep = ()=>{
    if(stepsIndex>0){
      setStepsIndex(stepsIndex-1);
    }
  }
  const value = useMemo(()=>({nextStep, prevStep, stepsIndex}), [stepsIndex]);
  return (
    <Context.Provider value={value}>{children}</Context.Provider>
  )
}

export const useMultiStepSlider = ()=>{
  const things = useContext(Context);
  if(!things){
    throw new Error("");
  }
  return things;
}


interface Props{
  children: ReactNode[];
}
const MultiStepSlider: FC<Props> = ({
  children
})=>{
  const { stepsIndex } = useMultiStepSlider();
  return (
    <div>
      <div>
        <div className="relative overflow-hidden">
          <div className="flex transition-transform duration-500 ease-in-out w-full" style={{
            transform: `translateX(-${stepsIndex*100}%)`
          }}>{
            children.map((child: ReactNode, index: number)=>(
              <div className="w-full shrink-0" key={index}>{child}</div>
            ))
          }</div>
        </div>
      </div>
    </div>
  )
}
export default MultiStepSlider;