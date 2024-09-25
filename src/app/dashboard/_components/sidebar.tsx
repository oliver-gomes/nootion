"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { DocumentProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import axios from "axios";
import { Home, NotebookPen, NotebookText } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export const Sidebar = () => {
  const params = useParams();
  const router = useRouter();

  const [userDocuments, setUserDocuments] = useState([]);

  const createDocument = async () => {
    try {
      const response = await axios.post("/api/document/new");
      router.push(`/dashboard/document/${response.data.id}`);
    } catch (error) {
      console.log("POST ERROR: error when create a document");
    }
  };

  useEffect(() => {
    const findUserDocuments = async () => {
      const response = await axios.get("/api/document");
      setUserDocuments(response.data);
    };

    findUserDocuments();
  }, []);

  return (
    <div className="fixed hidden md:w-72 md:block h-screen shadow-md p-5 border-r border-r-stone-300 bg-stone-100 dark:bg-[#1f1f1f] dark:border-r-zinc-600 dark:text-gray-300">
      <div className="flex flex-col min-h-full">
        <div className="flex justify-between items-center ">
          <UserButton />
          <NotebookPen
            className="cursor-pointer"
            onClick={createDocument}
            size={20}
          />
        </div>
        <div className="mt-10">
          <Link href="/dashboard">
            <div className="px-2 py-1 flex gap-2 items-center mb-10">
              <Home />
              <p className="text-sm">Home</p>
            </div>
          </Link>
          {userDocuments.length > 0 &&
            userDocuments.map((doc: DocumentProps, index) => (
              <div
                key={doc.id}
                className={cn(
                  "px-2 py-1 rounded-md cursor-pointer flex items-center gap-2 text-sm",
                  params.documentId === doc?.id &&
                    "bg-stone-200 dark:bg-zinc-800"
                )}
                onClick={() => router.replace(`/dashboard/document/${doc.id}`)}
              >
                <div>
                  <NotebookText color="#b6b3b3" />
                </div>
                <p className="line-clamp-1">{doc.title}</p>
              </div>
            ))}
        </div>
        <div className="mt-10">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};
