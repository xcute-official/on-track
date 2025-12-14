"use client";
import { GoalCreateSchema } from "@/libs/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import TextInput from "../text-input";
import TextareaInput from "../textarea-input";
import { ArrowRight, Square, SquareCheck } from "lucide-react";
import CalendarInput from "./calendar-input";
import { GOAL_CHECKS } from "@/constants";
import { IGoalCheck } from "@/types";
import MultiStepSlider, { useMultiStepSlider } from "../multi-step-slider";
import TaskslistInput from "./taskslist-input";
import { createGoal } from "@/actions/goals";
import { useRouter } from "next/navigation";
import ErrorMessage from "../error-message";
import SuccessMessage from "../success-message";
const GoalCreateForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [checks, setChecks] = useState<IGoalCheck[]>(GOAL_CHECKS);
  const { stepsIndex, nextStep } = useMultiStepSlider();
  const router = useRouter();
  const handleTermCheckingInput = (id: number)=>{
    setChecks(checks=>
      checks.map((check)=>(
        check.id===id ? {
          ...check, isChecked: !check.isChecked
        } : check
      ))
    )
  }
  const {
    handleSubmit,
    formState: {
      errors,
    },
    setValue,
    watch,
    trigger,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      journey: {
        start: '',
        end: '',
        skips: {
          onWeeks: [],
          onEvents: []
        }
      },
      tasklist: []
    },
    resolver: zodResolver(GoalCreateSchema)
  })
  const handleNexting = async (fields: ("title"|"description"|"journey"|"tasklist")[])=>{
    const areValid = await trigger(fields);
    if(areValid){
      nextStep(4);
    }
    console.log(watch());
  }
  const handleFinalSubmit = async ()=>{
    setErrorMessage("");
    setSuccessMessage("");
    if(checks.some(({isChecked})=>!isChecked)){
      setErrorMessage("Check your all terms");
      return;
    }
    const data = watch();
    const validation = GoalCreateSchema.safeParse(data);
    if(!validation.success){
      return;
    }
    try{
      const response = await createGoal(validation.data);
      if(response.success){
        setSuccessMessage(response.success);
      }
      if(response.error){
        setErrorMessage(response.error);
      }
      if(response.redirected){
        router.push(response.redirected);
      }else{
        setIsLoading(false);
      }
    }catch(error){
      setErrorMessage("An unknown error occurred");
      return;
    }
  }
  return (
    <div>
      <h1 className="font-bold text-2xl">Create your goal</h1>
      <MultiStepSlider>
        <div className="h-full grid">
          <h3 className="font-medium my-2">Basic configurations for your goal</h3>
          <div className="flex flex-col gap-2">
            <TextInput placeholder="write one line that can motivate you" error={errors['title']?.message?.toString()} label="Title" id="title" value={watch("title")} onChange={(value)=>setValue('title', value)} disabled={isLoading} />
            <TextareaInput placeholder="Describe, the changes you want in yourself" error={errors['description']?.message?.toString()} label="Description" id="description" value={watch("description") || ""} onChange={(value)=>setValue('description', value)} disabled={isLoading} />
          </div>
          <button onClick={()=>handleNexting(["title", "description"])} className="cursor-pointer flex items-center justify-center w-full py-2 bg-[#a06dff] rounded-xl gap-2 text-white mt-4 h-fit" type="button">
            <span>Next</span>
            <ArrowRight size={14} />
          </button>
        </div>
        <div>
          <h3 className="font-medium my-2">Select time range on calendar</h3>
          <div className="">
            {/* TODO: calendar input */}
            <CalendarInput value={watch('journey')} onChange={(value)=>setValue('journey', value)} />
          </div>
          <button onClick={()=>handleNexting(["journey"])} className="cursor-pointer flex items-center justify-center w-full py-2 bg-[#a06dff] rounded-xl gap-2 text-white mt-4" type="button">
            <span>Next</span>
            <ArrowRight size={14} />
          </button>
        </div>
        <div>
          <h3 className="my-2 font-medium">Define your taskslist here</h3>
          <div>
            <TaskslistInput value={watch('tasklist')} onChange={(value)=>setValue('tasklist', value)} />
          </div>
          <button onClick={()=>handleNexting(["journey"])} className="cursor-pointer flex items-center justify-center w-full py-2 bg-[#a06dff] rounded-xl gap-2 text-white mt-4" type="button">
            <span>Next</span>
            <ArrowRight size={14} />
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-medium my-2">Declarations to your goal</h3>
          <ul>{
            checks.map((value, index)=>(
              <li key={index} className="flex items-center gap-2">
                <button onClick={()=>handleTermCheckingInput(value.id)}>{
                  value.isChecked ? (
                    <SquareCheck size={14} />
                  ) : (
                    <Square size={14} />
                  )
                }</button>
                <p>{value.term}</p>
              </li>
            ))
          }</ul>
          <ErrorMessage message={errorMessage} />
          <SuccessMessage message={successMessage} />
          <button onClick={handleFinalSubmit} className="cursor-pointer flex items-center justify-center w-full py-2 bg-[#a06dff] rounded-xl gap-2 text-white mt-4" type="button">
            <span>Submit</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </MultiStepSlider>
    </div>
  );
};

export default GoalCreateForm;
