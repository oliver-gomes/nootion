import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import coverImage from "@/lib/cover-image-data";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams } from "next/navigation";

export const CoverImage = ({ children, setUpdatedCover }) => {
  const { documentId } = useParams();
  const [selectedCover, setSelectedCover] = useState();

  const handleUpdateCover = async () => {
    setUpdatedCover(selectedCover);
    const response = await axios.put(`/api/document/${documentId}`, {
      documentId: documentId,
      updatedCover: selectedCover,
    });
  };
  return (
    <Dialog>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Cover</DialogTitle>
          <DialogDescription>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-3">
              {coverImage.map((cover, index) => (
                <div
                  key={index}
                  className={cn(
                    selectedCover === cover?.imageUrl &&
                      "border-primary border-2",
                    "p-1 rounded-md cursor-pointer"
                  )}
                  onClick={() => setSelectedCover(cover?.imageUrl)}
                >
                  <Image
                    src={cover?.imageUrl}
                    width={200}
                    height={140}
                    alt="cover image"
                    className="h=[70px] w-full rounded-md object-cover"
                  ></Image>
                </div>
              ))}
            </div>
          </DialogDescription>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button type="button" variant={"secondary"}>
                Close
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="button" onClick={handleUpdateCover}>
                Update
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
