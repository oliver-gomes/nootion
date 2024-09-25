import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Not Authenticated", { status: 401 });
    }

    const createNewDoc = await db.document.create({
      data: {
        userId: userId,
        title: "New Note",
        description: [
          {
            type: "paragraph",
            content: "Welcome to this demo!",
          },
        ],
        coverImg: "/1-cover.png",
      },
    });

    revalidatePath(`/dashboard/document/${createNewDoc.id}`);
    return NextResponse.json(createNewDoc, { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
