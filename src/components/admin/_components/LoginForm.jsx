"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import FormErrorText from "./forms/FormErrorText";
import { useLoginHandler } from "@/hooks/useLoginHandler";
import { Loader } from "@/components/common/Loader";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function LoginForm({ className, ...props }) {

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { handleLoginFormSubmit, isSubmitting, errorMessage, successMessage } = useLoginHandler();

  const onSubmit = async (data) => {
    const result = await handleLoginFormSubmit(data);
    console.log("Result Data========>", result);
    if (result.success) {
      // optionally do something with result.data (user)
      toast.success("Login Successfully");
      router.push("/admin/dashboard/home/banners");
    } else {
      //error message coming
      console.log("Executed the log");
      toast.error(errorMessage || "Login Failed")
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-white">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3 relative my-1">
          <Label htmlFor="email" className={"text-white"}>Email</Label>
          <Input id="email" type="email" placeholder="m@example.com"
            {...register("email", { required: "Email is required" })}
            className={"bg-white"}
          />
          {errors.email && (
            <FormErrorText errorText={errors.email.message} />
            // <p className="text-sm text-red-500 absolute"></p>
          )}
        </div>
        <div className="grid gap-3 relative my-1">
          <div className="flex items-center">
            <Label htmlFor="password" className={"text-white"}>Password</Label>
          </div>
          <Input id="password" type="password"
            placeholder="Enter Your Password"
            {...register("password", { required: "Password is required" })}
            className={"bg-white"}
          />
          {errors.password && (
            <FormErrorText errorText={errors.password.message} />
            // <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <Loader /> : "Login"}
        </Button>
      </div>
    </form>
  );
}
