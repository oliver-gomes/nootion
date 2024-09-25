import { Logo } from "@/components/logo";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col min-h-[100dvh] text-black bg-white">
      <header className="px-4 lg:px-6 h-14 flex justify-between items-center">
        <Logo />
        {/* Signin/Signout */}
        <SignedOut>
          <SignInButton forceRedirectUrl={"/dashboard"}></SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      <div className="flex mx-auto mt-20 flex-col px-4 text-center">
        <h2 className="text-6xl font-bold">Write, plan, organize and play</h2>
      </div>
      <Image
        src={"/hero-1.png"}
        width={600}
        height={600}
        alt="Hero Iamge"
        className="mx-auto"
      />
    </main>
  );
}
