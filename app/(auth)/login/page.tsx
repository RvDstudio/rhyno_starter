import { LoginForm } from "./login-form";
import { Suspense } from "react";
import Image from "next/image";

export default async function LoginPage() {
  return (
    <div className="w-full lg:grid  lg:grid-cols-2 ">
      <div className="flex flex-col items-center justify-center py-12">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-balance text-muted-foreground mb-6">
            Enter your email below to login to your account
          </p>
        </div>
        <Suspense fallback={<>Loading...</>}>
          <LoginForm />
        </Suspense>
      </div>
      <div className="hidden h-screen bg-muted lg:block">
        <div className="w-full h-screen relative pt-[100%]">
          <Image
            src="/images/login_bg.png"
            alt="profile"
            fill
            className="w-full h-full top-0 left-0 object-cover"
          />
        </div>
      </div>
    </div>
  );
}
