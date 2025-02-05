"use client";

import { updateUserData } from "@/actions/user";
import { Register } from "@lib/interfaces";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { SignupFormSchema } from "@/lib/form-schema";
import { showToast } from "@/utils/utils";
import { useToast } from "../hooks/use-toast";
import { FormField } from "@/components/ui/field";
import { Icon } from "@iconify/react";

export default function EditAccountForm({ userData }: { userData: Register }) {
  const [username, setUsername] = useState(userData.username);
  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const router = useRouter();
  const { toast } = useToast();

  async function handleUserUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = {
      username: username,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
    };

    const result = SignupFormSchema.safeParse(formData);

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
      const { error } = await updateUserData(formData);

      if (error) {
        throw new Error(
          error.message ||
            "An error occurred while updating your account. Please try again later."
        );
      }
      showToast("success", toast);

      router.push("/account");
    } catch (error: unknown) {
      setError(
        "An error occurred while updating your account. Please try again later."
      );
      if (error instanceof Error) {
        const messageType = error.message.includes("400")
          ? "userExists"
          : "genericError";
        showToast(messageType, toast);
        console.error("Error:", error);
      } else {
        console.error("An unknown error occurred", error);
      }
    }
  }

  return (
    <section className="dark:bg-gray-900 p-6 max-w-3xl mx-auto">
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white text-center">
        Edit Your Account
      </h2>
      <form
        onSubmit={handleUserUpdate}
        className="max-w-3xl mx-auto bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-6"
      >
        {error && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
            {error}
          </div>
        )}
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
          value={password}
          label_type="password"
          setValue={setPassword}
          error={errors.password}
        />

        <FormField
          label="Confirm password"
          id="confirm-password"
          label_type="password"
          value={passwordConfirmation}
          setValue={setPasswordConfirmation}
          error={errors.password_confirmation}
        />

        <button
          type="submit"
          className="w-full flex justify-center items-center h-16 px-5 py-3 text-white font-medium text-sm rounded-lg bg-green-600 hover:bg-green-800 transition"
        >
          <Icon icon="material-symbols:check-rounded" className="w-9 h-9" />
        </button>
      </form>
    </section>
  );
}
