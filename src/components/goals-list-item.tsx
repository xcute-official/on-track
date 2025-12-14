"use client";
import { IGoalItem } from "@/types";
import { ListTodo, Terminal } from "lucide-react";
import React, { useState } from "react";
import SlideSheet from "./slide-sheet";
import TasklistItem from "./tasklist-item";
import Link from "next/link";
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
  }
}: Props) => {
  const [showTasklist, setShowTasklist] = useState<boolean>(false);
  return (
    <li key={key} className="">
      <div className="bg-[#ffe7e7] border-4 border-[#eda6ff] rounded-2xl p-4 flex flex-col">
        <h2 className="font-bold text-xl">{title}</h2>
        <p className="font-medium mt-1">{description}</p>
        <div className="flex justify-end gap-2 mt-2">
          <Link href={`/user/goal/${_id}`} className="bg-[#ffa6a6] p-2 rounded-xl">
            <Terminal size={14} />
          </Link>
          <button className="bg-[#ffa6a6] p-2 rounded-xl" onClick={()=>setShowTasklist(!showTasklist)}>
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
