import { createBoard } from "@/actions/create-board";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import React from "react";
import Info from "./_components/info";

const OrganizationIdPage = async () => {
  return (
    <div className="w-full mb-20">
      <Info />
    </div>
  );
};

export default OrganizationIdPage;
