import { readGoals } from "@/actions/goals";
import { readUserSession } from "@/actions/user";
import GoalsList from "@/components/goals-list";
const page = async () => {
  const response = await readGoals();
  if(response.status!==200 || !response.data){
    return (
      <div>
        <h1>An error occured for fetching data</h1>
      </div>
    )
  }
  const user = await readUserSession();
  if(!user){
    return (
      <div>
        <h1>An error occured related to user session</h1>
      </div>
    )
  }
  return (
    <div className="pt-6">
      <h1 className="font-medium text-xl">Hi {user.username}</h1>
      <div className="mt-4">{
        response.data.length===0 ? (
          <p>You don't have any goals yet, create one</p>
        ) : (
          <div>
            <h1 className="my-2">Your goals</h1>
            <GoalsList goals={response.data} />
          </div>
        )
      }</div>
    </div>
  );
};

export default page;
