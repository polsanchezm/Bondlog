"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { userSignup } from "@/actions/auth";
import { SignupFormSchema } from "@/lib/form-schema";
import { createSession } from "@lib/session";
import { useToast } from "@/components/hooks/use-toast";
import { showToast } from "@/utils/utils";
import { FormField } from "@/components/ui/field";
import { Icon } from "@iconify/react";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const router = useRouter();
  const { toast } = useToast();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    const userData = { username, email, password, password_confirmation };
    const result = SignupFormSchema.safeParse(userData);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors as Record<
        string,
        string[]
      >;

      setErrors(
        Object.keys(fieldErrors).reduce<Record<string, string>>((acc, key) => {
          acc[key] = fieldErrors[key]?.[0] || "";
          return acc;
        }, {})
      );
      showToast("validationError", toast);
      return;
    }

    setErrors({});

    try {
      const response = await userSignup(userData);
      await createSession(response.token);
      showToast("successSignup", toast);
      router.push("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        const messageType = error.message.includes("400")
          ? "userExists"
          : "genericError";
        showToast(messageType, toast);
        console.error("Error:", error);
      }
    }
  }

  return (
    <section className="dark:bg-gray-900 p-6 max-w-3xl mx-auto">
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white text-center">
        Create an account{" "}
      </h2>

      <form
        onSubmit={handleRegister}
        className="max-w-3xl mx-auto bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-6"
      >
        <FormField
          label="Your username"
          id="username"
          label_type="text"
          value={username}
          setValue={setUsername}
          error={errors.username}
        />

        <FormField
          label="Your email"
          id="email"
          label_type="email"
          value={email}
          setValue={setEmail}
          error={errors.email}
        />

        <FormField
          label="Your password"
          id="password"
          label_type="password"
          value={password}
          setValue={setPassword}
          error={errors.password}
        />

        <FormField
          label="Confirm your password"
          id="confirm-password"
          label_type="password"
          value={password_confirmation}
          setValue={setPasswordConfirmation}
          error={errors.passwordConfirmation}
        />

        <button
          type="submit"
          className="w-full flex justify-center items-center h-16 px-5 py-3 text-white font-medium text-sm rounded-lg bg-green-600 hover:bg-green-800 transition"
        >
          <Icon icon="ion:person-add-outline" className="w-9 h-9" />
        </button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Login here
          </a>
        </p>
      </form>
    </section>
  );
}
