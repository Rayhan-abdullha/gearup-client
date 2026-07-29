"use client";

import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { loginSchema, type LoginInput } from "@/lib/auth";
import { loginAction } from "../_actions/loginActions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message ?? "Login successful");
    } else {
      toast.error(state.message ?? "Login failed");
    }
  }, [state]);

  const handleFormSubmit = (data: LoginInput) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    startTransition(() => {
      action(formData);
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {state && !state.success && (
        <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {state.message}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          disabled={pending}
          {...register("email")}
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          disabled={pending}
          {...register("password")}
          className={errors.password ? "border-red-500" : ""}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full cursor-pointer"
        disabled={pending}
      >
        {pending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
export default LoginForm;
