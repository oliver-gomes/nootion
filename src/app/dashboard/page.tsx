import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

const DashboardPage = async () => {
  const { userId } = auth();
  const user = await currentUser();

  const getDocuments = await db.document.findMany({
    where: {
      userId: userId as string,
    },
  });

  console.log("DATA IN DASHBOARD", getDocuments);

  return (
    <div className="w-9/12 mx-auto">
      <h2 className="text-4xl font-medium text-center pt-10">
        Hello, {user && user.firstName}
      </h2>
      <div className="mt-10">
        {getDocuments.length > 0 ? (
          <Carousel className="w-full">
            <CarouselContent className="-ml-1">
              {getDocuments &&
                getDocuments.map((document, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-1 md:basis-1/4 lg:basis-1/4"
                  >
                    <div className="p-1">
                      <Link href={`/dashboard/document/${document.id}`}>
                        <Card className="relative rounded-3xl w-11/12 shadow-md dark:bg-[#1f1f1f] dark:border-zinc-600">
                          <Image
                            src={document.coverImg}
                            width={600}
                            height={20}
                            alt="cover image"
                            className="rounded-t-3xl absolute max-h-14"
                          />
                          <CardContent className="flex aspect-square items-center justify-center p-6 mt-10">
                            <span className="text-sm font-semibold truncate">
                              {document.title}
                            </span>
                          </CardContent>
                        </Card>
                      </Link>
                    </div>
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <p className="text-sm text-center">Your notes will appear here.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
