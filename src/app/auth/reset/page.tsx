import React, { Suspense } from "react";
import { ResetForm } from "./reset-form";
import Image from "next/image";

export default function ResetPage() {
  return (
    <div className="w-full lg:grid lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center py-12">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl text-yellow-500">Forgot your password</h1>
          <p className="text-balance text-muted-foreground mb-6">
            Enter your email below to reset your account
          </p>
        </div>
        <Suspense fallback={<>Loading...</>}>
          <ResetForm />
        </Suspense>
      </div>
      <div className="hidden h-screen bg-muted lg:block">
        <div className="relative w-full h-full">
          <Image
            src="/images/login_bg.png"
            alt="Login Background"
            layout="fill" // Ensures the image covers the entire parent container
            objectFit="cover" // Same as `object-cover` in CSS
            priority={true} // Loads the image with priority
          />
        </div>
      </div>
    </div>
  );
}
