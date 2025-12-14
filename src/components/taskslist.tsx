"use client";
import { ITask, ITaskCompleted } from "@/types";
import { Square, SquareCheck } from "lucide-react";
const Taskslist = ({taskslist, tasksCompleted}: {taskslist: ITask[], tasksCompleted: ITaskCompleted[]}) => {
  return (
    <div className="">
      <div>
        <p><span>12</span>/<span>12</span> tasks completed, today</p>
      </div>
      <ul className="w-full flex flex-col gap-2 mt-4">{
        taskslist.map((task, index)=>{
          const completed: boolean = tasksCompleted.some((value: ITaskCompleted, index: number)=>value.id===task.id);
          return (
            <li key={index} className="flex items-center gap-2 bg-[#f8f8f8] px-4 py-2 rounded-xl w-full">
              <button>{
                completed ? (
                  <SquareCheck size={14} />
                ) : (
                  <Square size={14} />
                )
              }</button>
              <div>
                <p>{task.title}</p>
                <p>at 12:00 am</p>
              </div>
            </li>
          )
        })
      }</ul>
    </div>
  );
};

export default Taskslist;
