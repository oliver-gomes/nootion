import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Not Authenticated", { status: 401 });

    const getUserDocument = await db.document.findMany({
      where: {
        userId: userId,
      },
    });

    revalidatePath("/");
    return NextResponse.json(getUserDocument, { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { userId } = auth();
    const { documentId, document, title } = await req.json();

    if (!userId) return new NextResponse("Not Authenticated", { status: 401 });

    const updatedDoc = await db.document.update({
      where: {
        id: documentId,
        userId: userId,
      },
      data: {
        title: title,
        description: document,
      },
    });

    revalidatePath(`/dashboard/document/${documentId}`);
    revalidatePath(`/dashboard`);

    return NextResponse.json(updatedDoc, { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
