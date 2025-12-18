"use server";
import { connect } from "@/libs/database";
import { GoalCreateSchema } from "@/libs/validations";
import { IActionResponse, IGoalItem, ITaskCompleted, IDocCompletion, ITask, } from "@/types";
import { Completion, Goal } from "@/models/goal";
import * as z from 'zod';
import { readUserSession } from "./user";
interface IBriefGoal{
  title: string;
  description: string;
  journey: {
    start: string;
    end: string;
    skips: {
      onWeeks: number[];
      onEvents: string[];
    }
  };
  tasklist: {
    id: number;
    title: string;
    description?: string;
  }[];
  completions: {
    forDay: string;
    completes: {
      id: number;
      updatedAt: string;
    }[];
  }[];
  createdAt: string;
}
export const getBriefGoal = async (goalId: string): Promise<IActionResponse<IBriefGoal>>=>{
  try{
    connect();
    const goal = await Goal.findById(goalId).lean();
    if(!goal?._id){
      return {
        status: 210,
        error: "goal not found"
      }
    }
    const completions = await getGoalReport(goalId);
    return {
      status: 200,
      success: "ok",
      data: {
        title: goal.title,
        description: goal.description,
        journey: {
          start: goal.journey.start.toString(),
          end: goal.journey.end.toString(),
          skips: {
            onWeeks: [],
            onEvents: []
          }
        },
        tasklist: goal.tasklist.map((itm: ITask)=>({
          id: itm.id,
          title: itm.title,
          description: itm.description
        })),
        completions: completions,
        createdAt: goal.createdAt.toString()
      }
    }
  }catch(error){
    return {
      status: 500,
      error: "internal server error"
    }
  }
}
export const getGoalReport = async (goalId: string): Promise<{
  forDay: string;
  completes: {
    id: number;
    updatedAt: string;
  }[];
}[]>=>{
  try{
    connect();
    const goal = await Goal.findById(goalId).lean();
    if(!goal?._id){
      return [];
    }
    const completions: IDocCompletion[] = await Completion.find({
      goalId: goal._id
    });
    const serialized: {
      forDay: string;
      completes: {
        id: number;
        updatedAt: string;
      }[];
    }[] = completions.map((itm)=>({
      completes: itm.completes.map((itm)=>({
        id: itm.id,
        updatedAt: itm.updatedAt.toString()
      })),
      forDay: itm.forDay 
    }));
    return serialized;
  }catch(error){
    return [];
  }
}

export const createGoal = async (data: z.infer<typeof GoalCreateSchema>): Promise<IActionResponse>=>{
  try{  
    const validation = GoalCreateSchema.safeParse(data);
    if(!validation.success){
      return {
        error: "bad request",
        status: 410,
      }
    }
    connect();
    const user = await readUserSession();
    if(!user){
      return {
        error: "user not logged in",
        status: 401
      }
    }
    const newGoal = await Goal.create({
      ...validation.data,
      userId: user.id
    });
    if(!newGoal?._id){
      return {
        status: 201,
        error: "goal creation failed"
      }
    }
    return {
      status: 200,
      success: "goal created",
      redirected: '/user'
    }
  }catch(error){
    return {
      status: 500,
      error: "internal server error"
    }
  }
}
export const makeMyTaskStatus = async (taskId: number, taskStatus: boolean, goalId: string, isoDay: string): Promise<IActionResponse>=>{
  try{
    await connect();
    let completion = await Completion.findOne({
      goalId,
      forDay: isoDay
    });
    if(!completion?._id){
      completion = await Completion.create({
        forDay: isoDay,
        goalId,
        tasksCompleted: []
      });
    }
    if(taskStatus){
      completion.completes.push({
        id: taskId
      })
    }else{
      completion.completes = completion.completes.filter((item: {id: number, updatedAt: string})=>item.id!==taskId);
    }
    await completion.save();
    return {
      status: 200,
      success: "updated"
    }
  }catch(error){
    console.log(error);
    return {
      status: 500,
      error: "internal server error"
    };
  }
}
export const readGoals = async (): Promise<IActionResponse<IGoalItem[]>>=>{
  try{
    const user = await readUserSession();
    if(!user){
      return {
        status: 410,
        error: "user not logged in"
      };
    }
    connect();
    const goals = await Goal.find({
      userId: user.id
    }).lean();
    const isoDate = new Date(
      new Date().setHours(0, 0, 0, 0)
    ).toISOString();
    const serialized = await Promise.all(
      goals.map(async (g)=>{
        const completion = await Completion.findOne({
          goalId: g._id.toString(),
          forDay: isoDate
        }).lean();
        let completes: ITaskCompleted[] = [];
        if(completion?._id){
          completes = completion.completes;
        }
        return {
          _id: g._id.toString(),
          title: g.title,
          description: g.description,
          updatedAt: g.updatedAt.toISOString(),
          tasklist: g.tasklist,
          tasksCompleted: completes
        }
      }
    ));
    return {
      success: "ok",
      data: serialized,
      status: 200
    };
  }catch(error){
    console.log(error);
    return {
      error: "internal server error",
      status: 500
    };
  }
}