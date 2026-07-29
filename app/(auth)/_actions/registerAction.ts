"use server";
import { redirect } from "next/navigation";

type RegisterState = {
  success: true;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

export const RegisterAction = async (
  prevState: RegisterState,
  formData: FormData,
) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const role = formData.get("role");
  const password = formData.get("password");

  const payload = {
    name,
    email,
    role,
    password,
  };

  const res = await fetch(`${process.env.BACKEND_API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    redirect("/login");
  }

  return result;
};
