"use client";
import React from "react";
import { Input } from "./ui/input";

interface props {
  className?: string;
}
const SearchInput = ({ className }: props) => {
  return (
    <Input
      className={`w-1/2 mx-auto flex ${className} h-10 font-bold rounded-full appearance-none border border-blue-400`}
      type="search"
      placeholder="Buscar..."
      onChange={(e) => {
        if (e.currentTarget.value === "") {
          // handleDescriptionFilter("");
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          // handleDescriptionFilter(e.currentTarget.value.toLowerCase());
        }
      }}
    />
  );
};

export default SearchInput;
