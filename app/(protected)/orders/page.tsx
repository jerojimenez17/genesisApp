import SearchInput from "@/components/SearchInput";
import { Input } from "@/components/ui/input";
import React from "react";

const page = () => {
  return (
    <div className="h-screen w-screen flex p-4">
      <SearchInput className="bg-white bg-opacity-20" />
    </div>
  );
};

export default page;
