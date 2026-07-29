import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "../_components/loginForm";

function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-primary hover:underline font-semibold"
            >
              Register here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
export default LoginPage;
