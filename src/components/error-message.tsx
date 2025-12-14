"use client";
import { FC } from "react";
interface Props{
  message?: string;
}
const ErrorMessage: FC<Props> = ({
  message
}) => {
  if(!message){
    return null;
  }
  return (
    <div className="bg-[#FFBFBD] text-[#6F2100] px-4 py-1.5 rounded-xl border-[#FFBFBD]">
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;
