"use client";
import { MONTH_NAMES, WEEK_DAYS } from "@/constants";
import { ICompletion, IJourney } from "@/types";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Props{
  journey: IJourney;
  performances: ICompletion[];
  nTasks: number;
}
const CalendarReport = ({
  journey, performances, nTasks
}: Props) => {
  const [start, setStart] = useState<Date>(new Date(journey.start));
  const [end, setEnd] = useState<Date>(new Date(journey.end));
  const isInJourney = (day: number): boolean=>{
    const forDay = new Date(viewDate.getFullYear(), viewDate.getMonth(), day, 0, 0, 0, 0);
    if(start.getTime()<=forDay.getTime() && end.getTime()>=forDay.getTime()){
      return true;
    }
    return false;
  }
  const isToday = (day: number)=>{
    const today = new Date();
    const toCompare = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    today.setHours(0, 0, 0, 0);
    toCompare.setHours(0, 0, 0, 0);
    if(today.getTime()===toCompare.getTime()){
      return true;
    }else{
      return false;
    }
  }
  const isPerformedForDay = (day: number)=>{
    return performances.find((p)=>{
      const d = new Date(p.forDay);
      return (
        d.getFullYear()===viewDate.getFullYear() &&
        d.getMonth()===viewDate.getMonth() &&
        d.getDate()===day
      )
    });
  }
  const [viewDate, setViewDate] = useState<Date>(new Date());
  const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth()+1, 0).getDate();
  const handleMonthChange = (dir: number)=>{
    setViewDate((prev: Date)=>{
      let month = prev.getMonth()+dir;
      let year = prev.getFullYear();
      if(month>11){
        month=0;
        year++;
      }else if(month<0){
        month=11;
        year--;
      }
      const nextDate = new Date(year, month, 1);
      nextDate.setHours(0, 0, 0, 0);
      return nextDate;
    })
  }
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-end">
        <div className="flex items-center gap-0.5 border border-slate-200 bg-slate-50 w-fit px-4 py-2 rounded-full">
          <button onClick={()=>handleMonthChange(-1)} className="cursor-pointer">
            <ChevronLeft size={18} />
          </button>
          <p>
            <span>{MONTH_NAMES[viewDate.getMonth()]}</span>
            <span>{viewDate.getFullYear()}</span>
          </p>
          <button onClick={()=>handleMonthChange(+1)} className="cursor-pointer">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <div className="">
        <ul className="grid grid-cols-7 border border-gray-200 h-14 items-center rounded-md">{
          WEEK_DAYS.map((day: string, index: number)=>(
            <li className="text-center border-r capitalize" key={index}>{day}</li>
          ))  
        }</ul>
        <div className="grid grid-cols-7 gap-2 mt-2">{Array.from({length: firstDayOfMonth}).map((_, i: number)=>(
          <div className="" key={i} />
        ))}{
          Array.from({length: daysInMonth}).map((_, i: number)=>{
            const day = i+1;
            const performance = isPerformedForDay(day);
            return (
              <button className={clsx(
                isInJourney(day) ? "bg-gray-200 rounded-xl" : (
                  isToday(day) ? "rounded-xl" : "bg-gray-50"
                ),
                "flex items-center gap-0.5 flex-col cursor-pointer h-16 justify-center border border-gray-400",
              )} key={day}>
                <>
                  <span className="">{day}</span>
                  <div>
                    <span></span>
                    <span className="text-xs">{performance && `${(performance.completes.length/nTasks)*100}%`}</span>
                  </div>{
                    isToday(day) && (
                      <span className="block w-2 h-2 rounded-full bg-blue-700"></span>
                    )
                  }
                </>
              </button>
            )
          })
        }</div>
      </div>
    </div>
  );
};

export default CalendarReport;
