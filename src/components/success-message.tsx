"use client";
import { FC } from "react";
interface Props{
  message?: string;
}
const SuccessMessage: FC<Props> = ({
  message
}) => {
  if(!message){
    return null;
  }
  return (
    <div className="bg-[#BDFFD3] text-[#006F14] px-4 py-1.5 rounded-xl border-[#006F14]">
      <span>{message}</span>
    </div>
  );
};

export default SuccessMessage;
