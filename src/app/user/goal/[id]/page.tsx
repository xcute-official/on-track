import { getBriefGoal } from "@/actions/goals";
import { readUserSession } from "@/actions/user";
import CalendarReport from "@/components/calendar-report";
import { getReadableByIso } from "@/libs/utils";
import { Pencil } from "lucide-react";
interface Props{
  params: Promise<{
    id: string;
  }>
}
const page = async ({params}: Props) => {
  const { id } = await params;
  const user = await readUserSession();
  if(!user){
    return (
      <div>user not logged in</div>
    )
  }
  const response = await getBriefGoal(id);
  if(response.status!==200 || !response.data){
    return (
      <div>An unknown error occured</div>
    )
  }
  const { title, description, journey, tasklist, completions } = response.data;
  return (
    <div className="">
      <div className="flex items-start flex-col-reverse md:flex-row gap-4">
        <div className="w-full flex flex-col gap-4 px-4 md:px-8 bg-gray-50 pt-8 md:min-h-[94vh]">
          <h1 className="text-2xl font-bold capitalize">{title}</h1>
          <p>{description}</p>
          <div className="flex items-center gap-1.5">
            <p className="text-start font-medium">{getReadableByIso(journey.start)}</p>
            <span className="block w-full h-px bg-black"></span>
            <p className="text-end font-medium">{getReadableByIso(journey.end)}</p>
          </div>
          <div className="">
            <h1 className="font-medium">Tasklist</h1>
            <ul className="mt-2 flex flex-col gap-2 justify-start">{tasklist.map((tsk, index: number)=>(
              <li key={index} className="px-4 py-2 rounded-md bg-slate-100 border border-slate-200 flex justify-between items-center">
                <p>{tsk.title}</p>
              </li>
            ))}</ul>
          </div>
        </div>
        <div className="px-4 md:px-8 w-full pt-8 md:min-h-[94vh]">
          <CalendarReport journey={journey} nTasks={tasklist.length} performances={completions} />
        </div>
      </div>
    </div>
  )
};

export default page;
