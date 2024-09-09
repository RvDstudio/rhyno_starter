"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { CreateUserInput, createUserSchema } from "@/lib/user-schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export const RegisterForm = () => {
  const [submitting, setSubmitting] = useState(false);

  const methods = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
    mode: "onChange", // Errors update as user types
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmitHandler: SubmitHandler<CreateUserInput> = async (values) => {
    try {
      setSubmitting(true);
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();

        if (Array.isArray(errorData.errors) && errorData.errors.length > 0) {
          errorData.errors.forEach((error: any) => {
            toast.error(error.message);
          });
          return;
        }

        toast.error(errorData.message);
        return;
      }

      signIn(undefined, { callbackUrl: "/" });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const input_style =
    "form-control block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

  return (
    <Card className="mx-auto w-[400px] max-w-sm">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="grid gap-4 mt-8">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <input
                  {...register("name")}
                  placeholder="Name"
                  className={input_style}
                />
                {errors.name && (
                  <span className="text-red-500 text-xs pt-1 block">
                    {errors.name?.message as string}
                  </span>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <input
                type="email"
                {...register("email")}
                placeholder="Email address"
                className={input_style}
              />
              {errors.email && (
                <span className="text-red-500 text-xs pt-1 block">
                  {errors.email?.message as string}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <input
                type="password"
                {...register("password")}
                placeholder="Password"
                className={input_style}
              />
              {errors.password && (
                <span className="text-red-500 text-xs pt-1 block">
                  {errors.password?.message as string}
                </span>
              )}
            </div>
            <div className="grid gap-2 mb-4">
              <Label htmlFor="passwordConfirm">Confirm Password</Label>
              <input
                type="password"
                {...register("passwordConfirm")}
                placeholder="Confirm Password"
                className={input_style}
              />
              {errors.passwordConfirm && (
                <span className="text-red-500 text-xs pt-1 block">
                  {errors.passwordConfirm?.message as string}
                </span>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-500/90"
              disabled={submitting} // Disable button while submitting
            >
              {submitting ? "Creating account..." : "Create an account"}
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
