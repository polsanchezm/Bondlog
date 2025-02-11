"use client";

import { FormEvent, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createSession, createUser } from "@lib/session";
import { LoginFormSchema } from "@/lib/form-schema";
import { useToast } from "@/components/hooks/use-toast";
import { showToast } from "@/utils/utils";
import { FormField } from "@/components/ui/field";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useAuthStore } from "@/stores/auth";

export default function LoginForm() {
  const { login } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

  const handleLogin = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setErrorMessage(null);

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

      // Usamos la función login de la store (se debe await, ya que es async)
      const loginSuccess = await login(formData);
      if (!loginSuccess) {
        setErrorMessage("Invalid email or password. Please try again.");
        showToast("genericError", toast);
        return;
      }

      // Una vez que login() se ha completado, obtenemos la sesión actualizada desde la store
      const { session, user } = useAuthStore.getState();
      const userToken = session?.token;
      const userRole = session?.user!.role;
      if (!session || !session.token || !session.user!.role) {
        setErrorMessage("Invalid session data");
        showToast("genericError", toast);
        return;
      }

      // Creamos la sesión (cookie) usando el token y rol obtenidos
      await createSession(userToken!, userRole!);
      // Si además dispones de la información del usuario, la almacenamos
      await createUser(user!);
      showToast("successLogin", toast);
      router.replace("/");
    },
    [formData, login, router, toast]
  );

  return (
    <section className="dark:bg-gray-900 p-6 max-w-3xl mx-auto">
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white text-center">
        Sign in to your account
      </h2>

      <form
        onSubmit={handleLogin}
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
          <legend className="sr-only">Login Form</legend>

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
        </fieldset>

        <button
          type="submit"
          className="w-full flex justify-center items-center gap-2 h-14 px-5 py-3 text-white font-medium text-sm rounded-lg bg-green-600 hover:bg-green-700 focus:ring focus:ring-green-300 dark:focus:ring-green-700 transition transform active:scale-95"
        >
          <Icon icon="lucide:log-in" className="w-6 h-6" />
          <span className="hidden md:inline ml-2">Sign In</span>
        </button>

        <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
          Don&apos;t have an account yet?{" "}
          <Link
            href="/signup"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Sign up
          </Link>
        </p>
      </form>
    </section>
  );
}
