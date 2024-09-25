import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import { Sidebar } from "./_components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();
  if (!userId) redirect("/");

  return (
    <div className="dark:bg-[#1f1f1f] dark:text-gray-300">
      <Sidebar />
      <div className="md:ml-72 h-screen">{children}</div>
    </div>
  );
};

export default DashboardLayout;
