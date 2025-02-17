"use client";

import { LoginForm } from "@/components/auth/login-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/hooks/use-toast";
import { useLogin } from "@/components/hooks/use-login";
import { LoginFormSchema } from "@/lib/form-schema";
import { createSession } from "@/lib/session";
import { showToast } from "@/lib/helpers";
import { FormEvent, useState } from "react";
import { Login } from "@/lib/interfaces";

export default function LoginPage() {
  const [formData, setFormData] = useState<Login>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { toast } = useToast();
  const { login } = useLogin();
  const router = useRouter();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = LoginFormSchema.safeParse(formData);
    if (!result.success) {
      setErrors(
        Object.fromEntries(
          Object.entries(result.error.flatten().fieldErrors).map(
            ([key, value]) => [key, value[0]]
          )
        )
      );
      return;
    }

    setErrors({});
    try {
      const { data, error } = await login(formData);
      if (error) throw new Error(error!.message);
      await createSession(data.token, data.user.role);
      showToast("successLogin", toast);
      router.push("/");
    } catch (error: unknown) {
      showToast("genericError", toast);
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm
          errors={errors}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleLogin}
        />
      </div>
    </div>
  );
}
