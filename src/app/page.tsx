import { Key, Lock } from "lucide-react";
import Link from "next/link";
import { poppins, robotoMono } from "@/libs/fonts";
import clsx from "clsx";
const page = () => {
  return (
    <div className="w-fit mx-auto mt-64 flex flex-col gap-4 justify-center text-center px-6 py-6">
      {/* <div>
        <p className={clsx(
          "font-bold text-2xl",
          robotoMono.className
        )}>On Track</p>
      </div> */}
      <h1 className={clsx(
        "text-2xl font-bold mx-auto md:w-1/2 w-full",
        poppins.className
      )}>Achieve your goals with better consistency and focus</h1>
      <p className="">This application lets you manage your goals attend them daily and gets rewards for working with consistency</p>
      <div className="flex justify-center gap-8">
        <div className="py-2 bg-[#9156ff] rounded-xl text-white w-40 flex justify-center">
          <Link href="/account/signin">
            <div className="flex items-center gap-2">
              <p>login</p>
              <Lock size={16} />
            </div>
          </Link>
        </div>
        <div className="py-2 flex justify-center w-40 border rounded-xl">
          <Link href="/account/signup">
            <div className="flex items-center gap-2">
              <Key size={16} />
              <p>register</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default page;
