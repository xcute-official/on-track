import { readGoals } from "@/actions/goals";
import GoalsList from "@/components/goals-list";
const page = async () => {
  const response = await readGoals();
  if(response.status!==200){
    return (
      <div>
        <h1>An error occured for fetching data</h1>
      </div>
    )
  }
  return (
    <div className="flex items-stretch py-8">
      <GoalsList goals={response.data || []} />
    </div>
  );
};

export default page;
