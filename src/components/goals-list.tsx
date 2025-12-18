
import { IGoalItem } from "@/types";
import GoalsListItem from "./goals-list-item";
const GoalsList = ({goals}: {goals: IGoalItem[]}) => {
  return (
    <>
      <ul className="grid md:grid-cols-3 gap-8">{
        goals.map((g)=>(
          <GoalsListItem goal={{...g}} key={g._id} />
        ))
      }</ul>
    </>
  );
};

export default GoalsList;
