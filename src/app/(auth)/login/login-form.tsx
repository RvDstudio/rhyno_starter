"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { LoginUserInput, loginUserSchema } from "@/src/lib/user-schema";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Label } from "@/src/components/ui/label";
import Link from "next/link";

export const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const methods = useForm<LoginUserInput>({
    resolver: zodResolver(loginUserSchema),
    mode: "onChange", // Ensures errors are updated as you type
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmitHandler: SubmitHandler<LoginUserInput> = async (values) => {
    try {
      setSubmitting(true);

      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        redirectTo: callbackUrl,
      });

      setSubmitting(false);

      if (!res?.error) {
        toast.success("Successfully logged in");
        router.push(callbackUrl);
      } else {
        reset({ password: "" });
        const message = "Invalid email or password";
        toast.error(message);
        setError(message);
      }
    } catch (error: any) {
      toast.error(error.message);
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const input_style =
    "form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

  return (
    <Card className="mx-auto w-[400px] max-w-sm">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="grid gap-4 mt-8">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <input
                type="email"
                {...register("email")}
                placeholder="Email address"
                className={`${input_style} py-[10px]`}
              />
              {errors.email && (
                <span className="text-red-500 text-xs pt-1 block">
                  {errors.email?.message as string}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <input
                type="password"
                {...register("password")}
                placeholder="Password"
                className={`${input_style} py-[10px]`}
              />
              {errors.password && (
                <span className="text-red-500 text-xs pt-1 block">
                  {errors.password?.message as string}
                </span>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-500/90"
              disabled={submitting}
            >
              {submitting ? "Logging in..." : "Login"}
            </Button>
            <Button
              variant="outline"
              onClick={() => signIn("google", { callbackUrl })}
              className="w-full"
              disabled={submitting}
            >
              Login with Google
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
