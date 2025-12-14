"use server";
import { connect } from '@/libs/database';
import { SigninSchema, SignupSchema } from '@/libs/validations';
import { User } from '@/models/user';
import { IActionResponse, IUserSession } from '@/types';
import * as z from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
export const readUserSession = async (): Promise<IUserSession|null>=>{
  try{
    const token = (await cookies()).get('authKey')?.value;
    if(!token){
      return null;
    }
    const user_session = jwt.verify(token, process.env.AUTH_SECRET!);
    return user_session as IUserSession;
  }catch(error){
    return null;
  }
}
export const createUserSession = async (userSession: IUserSession): Promise<boolean>=>{
  try{
    const token = jwt.sign(userSession, process.env.AUTH_SECRET!);
    const setToken = (await cookies()).set('authKey', token);
    if(!setToken.get('authKey')){
      return false;
    }
    return true;
  }catch(error){
    return false;
  }
}
export const deleteUserSession = async (): Promise<boolean>=>{
  try{
    const deleteToken = (await cookies()).delete('authKey');
    if(deleteToken.get('authKey')){
      return false;
    }return true;
  }catch(error){
    return false;
  }
}
export const signin = async (data: z.infer<typeof SigninSchema>): Promise<IActionResponse>=>{
  try{
    const validation = SigninSchema.safeParse(data);
    if(!validation.success){
      return {
        error: "bad request",
        status: 410
      }
    }
    const { username, password } = validation.data;
    connect();
    const user = await User.findOne({
      username
    });
    if(!user?._id){
      return {
        error: "user not found",
        status: 410
      }
    }
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if(!passwordMatch){
      return {
        status: 201,
        error: "wrong password"
      }
    }
    const session = await createUserSession({
      id: user._id,
      username: user.username,
      nickname: user.nickname,
      picUrl: user.picUrl
    });
    if(!session){
      return {
        status: 410,
        error: "session creation failed"
      }
    }
    return {
      status: 200,
      redirected: "/user",
      success: "login success, being redirected"
    }
  }catch(error){
    console.log(error);
    return {
      status: 500,
      error: "internal server error"
    }
  }
}
export const signup = async (data: z.infer<typeof SignupSchema>): Promise<IActionResponse>=>{
  try{
    const validation = SignupSchema.safeParse(data);
    if(!validation.success){
      return {
        error: "bad request",
        status: 410
      }
    }
    const { email, username, password } = validation.data;
    connect();
    const user = await User.exists({
      username
    })
    if(user?._id){
      return {
        error: "user exist",
        status: 410
      }
    }
    const passwordHash = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      passwordHash,
      email
    });
    if(!newUser){
      return {
        status: 500, 
        error: "internal database error"
      }
    }
    const signInUser = await signin({
      username,
      password,
    });
    return signInUser;
  }catch(error){
    console.log(error);
    return {
      status: 500,
      error: "internal server error"
    }
  }
}

