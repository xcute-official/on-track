import { Document, Types } from "mongoose";
export interface IUserSession{
  id: string;
  username: string;
  nickname?: string;
  picUrl?: string;
}
export type TTriState = 0|1|-1;
export interface IJourney{
  start: string;
  end: string;
  skips: {
    onWeeks: number[];
    onEvents: string[];
  }
}
export interface IGoalItem{
  _id: string;
  title: string;
  description: string;
  updatedAt: string;
  tasklist: ITask[];
  tasksCompleted: ITaskCompleted[];
}
export interface ITask{
  id: number;
  title: string;
  description?: string;
}

export interface IGoalCheck{
  id: number;
  isChecked: boolean;
  term: string;
}
export interface ITaskCompleted{
  id: number;
  updatedAt: string;
}

export interface IActionResponse<T=unknown>{
  error?: string;
  success?: string;
  data?: T;
  redirected?: string;
  status: number;
}



export interface IUserModel{
  _id: string;
  username: string;
  passwordHash: string;
  email: string;
  nickname?: string;
  picUrl?: string;
  createdAt: string;
  updatedAt: string;

  // references to optional references to sub documents
  goalsIds: string[];
}

export interface IGoal{
  // _id: Types.ObjectId;
  title: string;
  description: string;
  journey: {
    start: string;
    end: string;
    skips: {
      onWeeks: number[],
      onEvents: string[]
    }
  };
  tasklist: ITask[];
  // createdAt: Date;
  // updatedAt: Date;
  completionsIds: Types.ObjectId[];
  userId: Types.ObjectId;
}
export interface ICompletionModel{
  _id: string;
  forDay: string;
  completes: {
    id: number;
    updatedAt: string;
  }[];
  goalId: string;
}







