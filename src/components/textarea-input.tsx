"use client";

import clsx from "clsx";
import { FC } from "react";

interface Props{
  value: string;
  onChange: (value: string)=>void;
  label?: string;
  placeholder?: string;
  disabled: boolean;
  id: string;
  error?: string;
}
const TextareaInput: FC<Props> = ({
  value, onChange, label, placeholder, disabled, id, error
}) => {
  return (
    <div>
      {
        label && (
          <label htmlFor={id}>{label}</label>
        )
      }
      <div>
        <div className={clsx(
          "border rounded-xl px-2 py-1.5 mt-0.5",
          disabled && "opacity-35"
        )}>
          <textarea className="w-full resize-none outline-none" rows={3} placeholder={placeholder} disabled={disabled} value={value} onChange={(e)=>onChange(e.target.value)}></textarea>
        </div>
      </div>
      <p className="text-[#aa2626] mt-2">{error && (
        <span>{error}</span>
      )}</p>
    </div>
  );
};

export default TextareaInput;
