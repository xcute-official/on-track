import CalendarReport from "@/components/calendar-report";
import { connect } from "@/libs/database";
import { Goal } from "@/models/goal";
import { ITask } from "@/types";
import clsx from "clsx";
import { robotoMono } from "@/libs/fonts";
interface Props{
  params: Promise<{
    id: string;
  }>
}
const page = async ({params}: Props) => {
  const { id } = await params;
  connect();
  const goal = await Goal.findById(id);
  return (
    <div>
      <div className="pt-10 flex flex-col gap-6 w-fit">
        <h1 className="font-bold text-2xl capitalize">{goal.title}</h1>
        <p>{goal.description}</p>
        <div className="flex items-center gap-2">
          <p className={clsx(
            robotoMono.className,
            'font-medium text-green-700'
          )}>12 may</p>
          <span className="block w-full bg-gray-200 h-px"></span>
          <p className={clsx(
            robotoMono.className,
            'font-medium text-red-700'
          )}>12 may</p>
        </div>
        <div>
          <h2 className="font-medium text-xl">Your report</h2>
          <CalendarReport />
        </div>
        <div>
          <h2 className="font-medium text-xl">Tasklist</h2>
          <ul className="flex flex-col gap-2 mt-4">{
            goal.tasklist.map((tsk: ITask, index: number)=>(
              <li className="bg-[#ffe7e7] border border-[#eda6ff] rounded-2xl p-4 flex flex-col" key={index}>{tsk.title}</li>
            ))
          }</ul>
        </div>
      </div>
    </div>
  )
};

export default page;
