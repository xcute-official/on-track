"use client";
import { makeMyTaskStatus } from "@/actions/goals";
import { ITask, TTriState } from "@/types";
import { CheckSquare, Loader, Square } from "lucide-react";
import React, { useState } from "react";
interface Props{
  status: TTriState;
  task: ITask;
  goalId: string;
}
const TasklistItem = ({status, task, goalId}: Props) => {
  const [stts, setStts] = useState<0|-1|1>(status);
  const handleTaskStatus = async ()=>{
    try{
      setStts(0);
      let taskStatus: boolean = false;
      if(stts===-1){
        taskStatus = true;
      }
      const isoDay: string = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
      const response = await makeMyTaskStatus(task.id, taskStatus, goalId, isoDay);
      console.log(response);
      if(response.success){
        setStts(1);
      }else{
        setStts(-1);
      }
    }catch(error){
      setStts(-1);
    }
  }
  return (
    <li className="flex items-center gap-2 p-2 rounded-xl bg-purple-200 cursor-pointer">
      <button disabled={stts===0} onClick={()=>handleTaskStatus()}>{
        stts===1 ? (
          <CheckSquare size={14} />
        ) : (
          stts===-1 ? (
            <Square size={14} className="" />
          ) : (
            <Loader size={14} className="" />
          )
        )
      }</button>
      <p className="">{task.title}</p>
    </li>
  );
};

export default TasklistItem;
