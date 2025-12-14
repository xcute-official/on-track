
import { ListTodo, Terminal } from "lucide-react";
import Link from "next/link";
import { IGoalItem } from "@/types";
import SlideSheet from "./slide-sheet";
import GoalsListItem from "./goals-list-item";
const GoalsList = ({goals}: {goals: IGoalItem[]}) => {
  return (
    <>
      <ul className="grid md:grid-cols-3 gap-8">{
        goals.map((g, index)=>(
          <GoalsListItem goal={{...g}} key={g._id} />
        ))
      }</ul>
    </>
  );
};

export default GoalsList;
