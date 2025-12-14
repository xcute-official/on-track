"use client";
import { MONTH_NAMES, WEEK_DAYS } from "@/constants";
import { getUtcDate } from "@/libs/utils";
import { IJourney } from "@/types";
import clsx from "clsx";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { FC, useEffect, useState } from "react";
interface Props{
  value: IJourney;
  onChange: (value: IJourney)=>void;
}
const CalendarInput: FC<Props> = ({
  value, onChange
}) => {
  const [viewDate, setViewDate] = useState<Date>(new Date());
  const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth()+1, 0).getDate();
  const today = new Date();
  const [start, setStart] = useState<Date|null>(null);
  const [end, setEnd] = useState<Date|null>(null);
  const handleDaySelection = (day: number)=>{
    console.log("touched");
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    if(!start || (start && end)){
      setStart(newDate);
      onChange({
        start: newDate.toISOString(),
        end: '',
        skips: {
          onWeeks: [],
          onEvents: []
        }
      });
      setEnd(null);
    }else{
      const startTime = new Date(start).setHours(0, 0, 0, 0);
      const endTime = newDate.setHours(0, 0, 0, 0);
      if(endTime<startTime){
        setEnd(start);
        setStart(newDate);
        onChange({
          start: newDate.toISOString(),
          end: start.toISOString(),
          skips: {
            onWeeks: [],
            onEvents: []
          }
        })
      }else{
        setEnd(newDate);
        onChange({
          start: start.toISOString(),
          end: newDate.toISOString(),
          skips: {
            onWeeks: [],
            onEvents: []
          }
        })
      }
    }
  }
  const isCurrentMonth = viewDate.getMonth()===new Date().getMonth() && viewDate.getFullYear()===new Date().getFullYear();
  const isPastDay = (day: number)=>{
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    const currentDate = new Date(
      viewDate.getFullYear(),
      viewDate.getMonth(),
      day
    );
    currentDate.setHours(0, 0, 0, 0);
    return currentDate<todayDate;
  }
  const isInSelection = (day: number)=>{
    if(!start){
      return false;
    }
    const selectedTime = new Date(viewDate.getFullYear(), viewDate.getMonth(), day).setHours(0, 0, 0, 0);
    const startTime = new Date(start).setHours(0, 0, 0, 0);
    if(!end){
      return selectedTime===startTime;
    }
    const endTime = new Date(end).setHours(0, 0, 0, 0);
    return selectedTime>=startTime && selectedTime<=endTime;
  }
  const handleMonthChange = (dir: number)=>{
    const today = new Date();
    today.setDate(1);
    today.setHours(0, 0, 0, 0);
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
      if(nextDate<today){
        return prev;
      }
      return nextDate;
    });
  }
  const isToday = (day: number)=>{
    return (
      today.getDate()===day && today.getMonth()===viewDate.getMonth() && today.getFullYear()===viewDate.getFullYear()
    )
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center font-medium justify-between gap-2 bg-[#f8f8] text-sm px-4 text-[#00b3ff] py-2 rounded-xl">
        <p className="text-nowrap">{start ? `${start.getDate()} ${MONTH_NAMES[start.getMonth()]}` : "FROM"}</p>
        <span className="block w-full h-px bg-[#00b3ff]"></span>
        <p className="text-nowrap">{end ? `${end.getDate()} ${MONTH_NAMES[end.getMonth()]}` : "TO"}</p>
      </div>
      <div className="mt-2">
        <div className="flex items-center gap-1 font-medium">
          <button disabled={isCurrentMonth} type="button" className="cursor-pointer" onClick={()=>handleMonthChange(-1)}>
            <ChevronLeft size={14} />
          </button>
          <p>
            <span>{MONTH_NAMES[viewDate.getMonth()]} </span>
            <span>{viewDate.getFullYear()}</span>
          </p>
          <button type="button" className="cursor-pointer" onClick={()=>handleMonthChange(1)}>
            <ChevronRight size={14} />
          </button>
        </div>
        <div className="flex flex-col justify-center gap-2 mt-4">
          <div className="grid grid-cols-7 gap-1 text-center capitalize">{WEEK_DAYS.map((value, index: number)=>(
            <p key={index} className="">{value}</p>
          ))}</div>
          <div className="grid grid-cols-7 text-center gap-1 justify-center items-center">{
            Array.from({length: firstDayOfMonth}).map((_, i: number)=>(
              <div className="h-14 w-full" key={i} />
            ))  
          }{
            Array.from({length: daysInMonth}).map((_, i: number)=>{
              const day = i+1;
              return (
                <button disabled={isPastDay(day) || isToday(day)} className={clsx(
                  'w-full h-14 rounded-xl',
                  isInSelection(day) ? 'font-bold bg-[#c0ff9e] text-[#2ec500]' : "bg-[#f8f8f8]",
                  isToday(day) && "font-bold bg-blue-200 text-blue-600",
                  isPastDay(day) ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
                )} type="button" key={i} onClick={()=>handleDaySelection(day)}>{day}</button>
              )
            })
          }</div>
        </div>
      </div>
    </div>
  );
};

export default CalendarInput;
