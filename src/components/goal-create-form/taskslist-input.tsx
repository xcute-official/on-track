"use client";
import { TaskSchema } from "@/libs/validations";
import { ITask } from "@/types";
import { Plus, X } from "lucide-react";
import React, { FC, useEffect, useState } from "react";
interface Props{
  value: ITask[];
  onChange: (value: ITask[])=>void;
}
const TaskslistInput: FC<Props> = ({
  value, onChange
}) => {
  const [newTask, setNewTask] = useState<string>('');
  const handleAddTask = ()=>{
    if(!newTask){
      return;
    }
    onChange([...value, {
      id: value.length,
      title: newTask
    }]);
    setNewTask('');
  }
  const handleRemoveTask = (id: number)=>{
    const updated = value.filter((tsk)=>tsk.id!==id);
    onChange(updated);
  }
  return (
    <div>
      <div>
        <div className="flex items-stretch border border-[#a7a7a7] rounded-xl p-1">
          <input className="w-full outline-none pl-2" spellCheck="false" type="text" onChange={(e)=>setNewTask(e.target.value)} value={newTask} />
          <button onClick={handleAddTask} className="cursor-pointer bg-[#fefefe] py-1 px-2 rounded-xl">
            <Plus size={14} />
          </button>
        </div>
        <ul className="mt-4 flex flex-col gap-2">{
          value.map((vl, index)=>(
            <li key={index} className="flex items-center justify-between px-2 py-1 bg-[#f8f8f8]">
              <p className="w-full text-black">{vl.title}</p>
              <button className="cursor-pointer" onClick={()=>handleRemoveTask(vl.id)}>
                <X size={14}/>
              </button>
            </li>
          ))
        }</ul>
      </div>
    </div>
  );
};

export default TaskslistInput;
