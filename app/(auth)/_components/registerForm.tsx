"use client";

import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { registerSchema, type RegisterInput } from "@/lib/auth";
import { RegisterAction } from "../_actions/registerAction";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function RegisterForm() {
  const [state, action, pending] = useActionState(RegisterAction, null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "CUSTOMER",
    },
  });

  const role = watch("role");

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message ?? "Registration successful");
    } else {
      toast.error(state.message ?? "Registration failed");
    }
  }, [state]);

  const onSubmit = (data: RegisterInput) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    startTransition(() => {
      action(formData);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {state && !state.success && (
        <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {state.message}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          disabled={pending}
          {...register("name")}
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

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
        <Label htmlFor="role">Role</Label>

        <Select
          value={role}
          onValueChange={(value) =>
            setValue("role", value as RegisterInput["role"], {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
          disabled={pending}
        >
          <SelectTrigger className={errors.role ? "border-red-500" : ""}>
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="CUSTOMER">Customer</SelectItem>
            <SelectItem value="PROVIDER">Provider</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
          </SelectContent>
        </Select>

        {errors.role && (
          <p className="text-sm text-red-500">{errors.role.message}</p>
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

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          disabled={pending}
          {...register("confirmPassword")}
          className={errors.confirmPassword ? "border-red-500" : ""}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full cursor-pointer"
        disabled={pending}
      >
        {pending ? "Creating account..." : "Register"}
      </Button>
    </form>
  );
}
