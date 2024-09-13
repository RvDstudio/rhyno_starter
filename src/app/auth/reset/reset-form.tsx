"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { LoginUserInput, loginUserSchema } from "@/src/lib/user-schema";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Label } from "@/src/components/ui/label";
import Link from "next/link";

export const ResetForm = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const methods = useForm<LoginUserInput>({
    resolver: zodResolver(loginUserSchema),
    mode: "onChange", // Ensures errors are updated as you type
    shouldUnregister: true,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmitHandler: SubmitHandler<LoginUserInput> = async (values) => {
    try {
      setSubmitting(true);

      // Call the reset password API
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          newPassword: values.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        router.push("/auth/login"); // Redirect to login after successful reset
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
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
                {...register("email", { required: true })}
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
              <Label htmlFor="newPassword">New Password</Label>
              <input
                type="password"
                {...register("password", { required: true })}
                placeholder="New password"
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
              {submitting ? "Resetting password..." : "Reset password"}
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
