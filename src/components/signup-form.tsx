"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import TextInput from "./text-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "@/libs/validations";
import { useState } from "react";
import PasswordInput from "./password-input";
import ErrorMessage from "./error-message";
import SuccessMessage from "./success-message";
import { LoaderCircle, Lock } from "lucide-react";
import z from "zod";
import Link from "next/link";
import { signup } from "@/actions/user";
import { useRouter } from "next/navigation";
import { useUserSession } from "./user-session";
const SignupForm = () => { 
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
      password: '',
      email: ''
    },
    resolver: zodResolver(SignupSchema)
  });
  const onSubmit: SubmitHandler<z.infer<typeof SignupSchema>> = async (data)=>{
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    try{
      const response = await signup(data);
      console.log(response);
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
      setErrorMessage("unknown error occured");
      console.log(error);
      setIsLoading(false);
    }
  }
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <TextInput label="Username" id="username" value={watch("username")} onChange={(value)=>setValue('username', value)} disabled={isLoading} error={errors['username']?.message?.toString()} />
          <TextInput label="Email" id="email" value={watch("email")} onChange={(value)=>setValue('email', value)} disabled={isLoading} error={errors['email']?.message?.toString()} />
          <PasswordInput label="Password" id="password" value={watch("password")} onChange={(value)=>setValue('password', value)} disabled={isLoading} error={errors['password']?.message?.toString()} />
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
        <div className="cursor-pointer">
          <Link href="/account/signin">Don&apos;t have an account ? <span className="underline text-blue-600">login</span></Link>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
