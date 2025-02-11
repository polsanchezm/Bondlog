"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { SignupFormSchema } from "@/lib/form-schema";
import { createSession, createUser } from "@lib/session";
import { useToast } from "@/components/hooks/use-toast";
import { showToast } from "@/utils/utils";
import { FormField } from "@/components/ui/field";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useAuthStore } from "@/stores/auth";

export default function SignupForm() {
  const { signup } = useAuthStore();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();
  const { toast } = useToast();

  const handleInputChange = useCallback(
    (field: keyof typeof formData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleRegister = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErrorMessage(null);

      const result = SignupFormSchema.safeParse(formData);
      if (!result.success) {
        setErrors(
          Object.fromEntries(
            Object.entries(result.error.flatten().fieldErrors).map(
              ([key, value]) => [key, value[0]]
            )
          )
        );
        showToast("validationError", toast);
        return;
      }

      setErrors({});

      const signupSuccess = await signup(formData);
      if (!signupSuccess) {
        setErrorMessage("Invalid email or password. Please try again.");
        showToast("genericError", toast);
        return;
      }

      const { session, user } = useAuthStore.getState();
      const userToken = session?.token;
      const userRole = session?.user!.role;
      if (!session || !session.token || !session.user!.role) {
        setErrorMessage("Invalid session data");
        showToast("genericError", toast);
        return;
      }

      await createSession(userToken!, userRole!);
      // Si además dispones de la información del usuario, la almacenamos
      await createUser(user!);
      showToast("successSignup", toast);
      router.replace("/");
    },
    [formData, router, toast]
  );

  return (
    <section className="dark:bg-gray-900 p-6 max-w-3xl mx-auto">
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white text-center">
        Create an account
      </h2>

      <form
        onSubmit={handleRegister}
        className="max-w-3xl mx-auto bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-6"
      >
        {errorMessage && (
          <div
            className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200"
            aria-live="polite"
          >
            {errorMessage}
          </div>
        )}

        <fieldset className="space-y-4">
          <legend className="sr-only">Signup Form</legend>

          <FormField
            label="Your username"
            id="username"
            label_type="text"
            value={formData.username}
            setValue={(val) => handleInputChange("username", val)}
            error={errors.username}
          />

          <FormField
            label="Your email"
            id="email"
            label_type="email"
            value={formData.email}
            setValue={(val) => handleInputChange("email", val)}
            error={errors.email}
          />

          <FormField
            label="Your password"
            id="password"
            label_type="password"
            value={formData.password}
            setValue={(val) => handleInputChange("password", val)}
            error={errors.password}
          />

          <FormField
            label="Confirm your password"
            id="confirm-password"
            label_type="password"
            value={formData.password_confirmation}
            setValue={(val) => handleInputChange("password_confirmation", val)}
            error={errors.password_confirmation}
          />
        </fieldset>

        <button
          type="submit"
          className="w-full flex justify-center items-center gap-2 h-14 px-5 py-3 text-white font-medium text-sm rounded-lg bg-green-600 hover:bg-green-700 focus:ring focus:ring-green-300 dark:focus:ring-green-700 transition transform active:scale-95"
        >
          <Icon icon="ion:person-add-outline" className="w-6 h-6" />
          <span className="hidden md:inline ml-2">Sign Up</span>
        </button>

        <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Login here
          </Link>
        </p>
      </form>
    </section>
  );
}
