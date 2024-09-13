"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Label } from "@/src/components/ui/label";

type ResetRequestInput = {
  email: string;
};

export const ResetRequestForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetRequestInput>();

  const onSubmit: SubmitHandler<ResetRequestInput> = async (data) => {
    try {
      const response = await fetch("/api/request-reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Password reset email sent.");
      } else {
        toast.error(result.message || "Failed to send reset email.");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Card className="mx-auto w-[400px] max-w-sm">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 mt-8">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Email address"
                className="form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white border border-gray-300 rounded"
              />
              {errors.email && (
                <span className="text-red-500 text-xs pt-1 block">
                  {errors.email.message}
                </span>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-500/90"
            >
              Send Reset Email
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
