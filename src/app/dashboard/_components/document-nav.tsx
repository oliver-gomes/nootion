import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DocumentProps } from "@/lib/types";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import axios from "axios";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

export const DocumentNav = ({ document }: { document: DocumentProps }) => {
  const router = useRouter();
  const deleteDocument = async () => {
    await axios.delete(`/api/document/${document.id}`);
    router.push("/dashboard");
  };

  return (
    <nav className="h-10 p-4 flex justify-between items-center">
      <h2>{document?.title}</h2>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreHorizontal />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="dark:bg-[#1f1f1f]">
            <DropdownMenuItem onClick={deleteDocument}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};
