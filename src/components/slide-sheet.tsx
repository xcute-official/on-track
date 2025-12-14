"use client";
import clsx from "clsx";
import { X } from "lucide-react";
import React, { ReactNode } from "react";
interface Props{
  children: ReactNode;
  show: boolean;
  setShow: (show: boolean)=>void;
}
const SlideSheet = ({
  children,
  show,
  setShow
}: Props) => {
  return (
    <>
      <div className={clsx(
        show ? "translate-x-0" : "translate-x-full",
        "fixed top-[6vh] right-0 h-screen z-50 transform transition-transform duration-300 ease-in-out bg-purple-100 p-4 w-full md:w-1/4"
      )}>{
        show && (
          <div className="flex justify-end">
            <button onClick={()=>setShow(false)} className="p-2 cursor-pointer bg-purple-400 rounded-xl text-white">
              <X size={14} />
            </button>
          </div>
        )}
        <div>{children}</div>
      </div>
    </>
  );
};

export default SlideSheet;
