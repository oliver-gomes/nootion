"use client";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

import { DocumentProps } from "@/lib/types";
import { Block } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import axios from "axios";

import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export const BlockNoteEditor = ({ userDocumentData }: DocumentProps) => {
  const { resolvedTheme } = useTheme();
  const params = useParams();
  const [blocks, setBlocks] = useState<Block[]>([]);

  useEffect(() => {
    const updateBlocks = async () => {
      await axios.put(`/api/document`, {
        title: blocks[0]?.content[0]?.text,
        document: blocks,
        documentId: params.documentId,
      });
    };
    blocks.length > 0 && updateBlocks();
  });

  const editor = useCreateBlockNote({
    initialContent: userDocumentData,
  });

  return (
    <>
      <BlockNoteView
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        editor={editor}
        content={userDocumentData}
        onChange={() => {
          setBlocks(editor.document);
        }}
      ></BlockNoteView>
    </>
  );
};
