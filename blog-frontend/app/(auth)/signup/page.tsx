"use client";

import { useRouter } from "next/navigation";
import { useToast } from "@/components/hooks/use-toast";
import { SignupFormSchema } from "@/lib/form-schema";
import { createSession } from "@/lib/session";
import { showToast } from "@/lib/helpers";
import { FormEvent, useCallback, useState } from "react";
import { Register } from "@/lib/interfaces";
import { SignupForm } from "@/components/auth/signup-form";
import { useSignup } from "@/components/hooks/use-signup";

export default function SignupPage() {
  const [formData, setFormData] = useState<Register>({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { toast } = useToast();
  const { signup, loading, error } = useSignup();
  const router = useRouter();

  const handleLogin = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const result = SignupFormSchema.safeParse(formData);
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
        const { data, error } = await signup(formData);
        if (error) throw new Error(error!.message);

        await createSession(data.token, data.user.role);
        showToast("successLogin", toast);

        router.push("/");
      } catch (error: any) {
        showToast("genericError", toast);
        console.error("Login Error:", error);
      }
    },
    [formData, signup, toast, router]
  );

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <SignupForm
          errors={errors}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleLogin}
        />
      </div>
    </div>
  );
}
