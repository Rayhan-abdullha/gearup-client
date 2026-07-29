import type { Metadata } from "next";
import { RegisterForm } from "../_components/registerForm";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export const metadata: Metadata = {
  title: "Register",
  description: "Create a new account",
};

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>
            Sign up to get started with your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary hover:underline font-semibold"
            >
              Login here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
