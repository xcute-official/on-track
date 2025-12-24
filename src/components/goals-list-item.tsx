"use client";
import { IGoalItem, TTriState } from "@/types";
import { BinaryIcon, ListTodo, Loader, Terminal, Trash } from "lucide-react";
import React, { useState } from "react";
import SlideSheet from "./slide-sheet";
import TasklistItem from "./tasklist-item";
import Link from "next/link";
import { deleteGoal } from "@/actions/goals";
interface Props{
  key: string;
  goal: IGoalItem;
}
const GoalsListItem = ({
  key,
  goal: {
    title,
    description,
    tasklist,
    tasksCompleted,
    _id,
    journey
  }
}: Props) => {
  const [showTasklist, setShowTasklist] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<TTriState>(1);
  const x = new Date(journey.start);
  const y = new Date(journey.end);
  const today = new Date();
  x.setHours(0, 0, 0, 0);
  y.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  const isActive = today.getTime()>=x.getTime() && today.getTime()<=y.getTime();
  const handleDelete = async ()=>{
    if(isDeleting===0){
      return;
    }
    try{
      setIsDeleting(0);
      const response = await deleteGoal(_id);
      if(response.status===200){
        setIsDeleting(-1);
      }else{
        setIsDeleting(1);
      }
    }catch(error){
      console.log(error);
      return;
    }
  }
  return (
    isDeleting ===-1 ? null : <li key={key} className="">
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex flex-col gap-4">
        <h2 className="font-bold text-xl capitalize">{title}</h2>
        <p className="">{description}</p>
        <div className="flex justify-end gap-2 mt-2 text-white">
          <Link href={`/user/goal/${_id}`} className="bg-purple-500 p-2 rounded-xl">
            <Terminal size={14} />
          </Link>
          <button disabled={isDeleting<1} onClick={()=>handleDelete()} className="bg-purple-500 cursor-pointer p-2 rounded-xl disabled:opacity-40">{
            isDeleting===0 ? (
              <Loader className="animate-spin" size={14} />
            ) : (
              <Trash size={14} />
            ) 
          }</button>
          <button className="bg-purple-500 cursor-pointer p-2 rounded-xl disabled:opacity-40" disabled={!isActive} onClick={()=>setShowTasklist(!showTasklist)}>
            <ListTodo size={14} />
          </button>
        </div>
      </div>
      <SlideSheet show={showTasklist} setShow={()=>setShowTasklist(!showTasklist)}>
        <div className="flex flex-col gap-2">
          <h1 className="font-medium text-xl">Tasklist</h1>
          <p><span>{tasksCompleted.length}</span>/<span>{tasklist.length}</span>, tasks are done now</p>
          <ul className="flex flex-col gap-2">{tasklist.map((task, index)=>(
            <TasklistItem goalId={_id} key={index} status={tasksCompleted.some(item=>item.id===task.id) ? 1 : -1} task={task} />
          ))}</ul>
        </div>
      </SlideSheet>
    </li>
  );
};
export default GoalsListItem;
