import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Not Authenticated", { status: 401 });

    const getUserDocument = await db.document.findUnique({
      where: {
        id: params?.documentId,
      },
    });

    revalidatePath(`/dashboard/document/${params.documentId}`);

    return NextResponse.json(getUserDocument, { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { userId } = auth();
    const { documentId, updatedCover } = await req.json();

    if (!userId) return new NextResponse("Not Authenticated", { status: 401 });

    const updateDoc = await db.document.update({
      where: {
        id: documentId,
        userId: userId,
      },
      data: {
        coverImg: updatedCover,
      },
    });

    revalidatePath(`/dashboard/document/${documentId}`);
    revalidatePath(`/dashboard`);
    return NextResponse.json(updateDoc, { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Not Authenticated", { status: 401 });

    const deleteDoc = await db.document.delete({
      where: {
        id: params?.documentId,
        userId: userId,
      },
    });

    revalidatePath(`/dashboard`);
    return NextResponse.json(deleteDoc, { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
