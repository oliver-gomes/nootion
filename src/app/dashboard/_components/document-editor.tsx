import { DocumentProps } from "@/lib/types";
import Image from "next/image";
import React, { useState } from "react";
import { BlockNoteEditor } from "./blocknote-editor";
import { CoverImage } from "./cover-image";
import { DocumentNav } from "./document-nav";

export const DocumentEditor = ({
  currentDocument,
}: {
  currentDocument: DocumentProps;
}) => {
  const [updateCover, setUpdateCover] = useState(currentDocument.coverImg);

  return (
    <div>
      <CoverImage setUpdatedCover={setUpdateCover}>
        {currentDocument && (
          <DocumentNav document={currentDocument}></DocumentNav>
        )}
        <Image
          src={updateCover}
          width={400}
          height={400}
          alt="cover image"
          className="w-full h-[150px] object-cover"
        ></Image>
      </CoverImage>

      {currentDocument && (
        <BlockNoteEditor
          userDocumentData={currentDocument?.description}
        ></BlockNoteEditor>
      )}
    </div>
  );
};
