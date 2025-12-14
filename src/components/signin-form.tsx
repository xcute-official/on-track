"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import TextInput from "./text-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SigninSchema } from "@/libs/validations";
import { useState } from "react";
import PasswordInput from "./password-input";
import ErrorMessage from "./error-message";
import SuccessMessage from "./success-message";
import { LoaderCircle, Lock } from "lucide-react";
import z from "zod";
import Link from "next/link";
import clsx from "clsx";
import { signin } from "@/actions/user";
import { useRouter } from "next/navigation";
import { useUserSession } from "./user-session";
const SigninForm = () => { 
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();
  const { loadSession } = useUserSession();
  const {
    handleSubmit,
    formState:{
      errors
    },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      username: '',
      password: ''
    },
    resolver: zodResolver(SigninSchema)
  });
  
  const onSubmit: SubmitHandler<z.infer<typeof SigninSchema>> = async (data)=>{
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    try{
      const response = await signin(data);
      if(response.success){
        setSuccessMessage(response.success);
      }
      if(response.error){
        setErrorMessage(response.error);
      }
      if(response.redirected){
        if(response.status===200){
          await loadSession();
        }
        router.push(response.redirected);
      }else{
        setIsLoading(false);
      }
    }catch(error){
      setErrorMessage("uknown error occured");
      setIsLoading(false);
    }
  }
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <TextInput label="Username" id="username" value={watch("username")} onChange={(value)=>setValue('username', value)} disabled={isLoading} />
          <PasswordInput label="Password" id="password" value={watch("password")} onChange={(value)=>setValue('password', value)} disabled={isLoading} />
        </div>
        <ErrorMessage message={errorMessage} />
        <SuccessMessage message={successMessage} />
        <button disabled={isLoading} className="flex items-center justify-center gap-2 bg-[#A06DFF] text-white rounded-xl px-2 py-1.5 cursor-pointer" type="submit">{
          isLoading ? (
            <>
              <span>submitting</span>
              <LoaderCircle size={14} className="animate-spin" />
            </>
          ) : (
            <>
              <span>submit</span>
              <Lock size={14} />
            </>
          )
        }</button>
      </form>
      <div>
        <div className={clsx(
          "cursor-pointer",
        )}>
          <Link href="/account/signup">Don&apos;t have an account ? <span className="underline text-blue-600">register</span></Link>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
