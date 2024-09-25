"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DocumentEditor } from "../../_components/document-editor";
import { Loader } from "lucide-react";

const DocumentPage = () => {
  const [userDocumentData, setUserDocumentData] = useState();
  const { documentId } = useParams();

  useEffect(() => {
    const findUserDocument = async () => {
      const response = await axios.get(`/api/document/${documentId}`);
      setUserDocumentData(response.data);
    };
    findUserDocument();
  }, [documentId]);

  return (
    <div>
      {userDocumentData ? (
        <DocumentEditor currentDocument={userDocumentData} />
      ) : (
        <Loader className="animate-spin" />
      )}
    </div>
  );
};

export default DocumentPage;
