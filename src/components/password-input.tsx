"use client";

import clsx from "clsx";
import { Eye, EyeClosed } from "lucide-react";
import { FC, useState } from "react";

interface Props{
  value: string;
  onChange: (value: string)=>void;
  label?: string;
  placeholder?: string;
  disabled: boolean;
  id: string;
  error?: string;
}
const PasswordInput: FC<Props> = ({
  value, onChange, label, placeholder, disabled, id, error
}) => {
  const [passwordType, setPasswordType] = useState<"password"|"text">("password");
  return (
    <div>
      {
        label && (
          <label htmlFor={id}>{label}</label>
        )
      }
      <div>
        <div className={clsx(
          "border rounded-xl px-2 py-1.5 mt-0.5 flex items-center",
          disabled && "opacity-35"
        )}>
          <input className="outline-none w-full" type={passwordType} placeholder={placeholder} disabled={disabled} value={value} onChange={(e)=>onChange(e.target.value)} />
          {/* below, onClick, is there a better way because in setPasswordType, we have to go to passwordType first*/}
          <button type="button" disabled={disabled} onClick={()=>setPasswordType(passwordType==="password"?"text":"password")} className="cursor-pointer">{
            passwordType==="password" ? (
              <EyeClosed size={18} />
            ) : (
              <Eye size={18} />
            )
          }</button>
        </div>
      </div>
      <p className={clsx("text-[#aa2626] mt-2")}>{error && (
        <span>{error}</span>
      )}</p>
    </div>
  );
};

export default PasswordInput;
