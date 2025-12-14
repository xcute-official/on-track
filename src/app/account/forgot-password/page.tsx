import GoalCreateForm from "@/components/goal-create-form";
import React from "react";

const page = () => {
  return (
    <div className="md:w-1/4 mx-auto mt-24 flex flex-col gap-4 justify-center px-6 py-6">
      <GoalCreateForm />
    </div>
  );
};

export default page;
