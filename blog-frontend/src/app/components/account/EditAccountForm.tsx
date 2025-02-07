"use client";

import { updateUserData } from "@/actions/user";
import { Register } from "@lib/interfaces";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useCallback, useMemo } from "react";
import { SignupFormSchema } from "@/lib/form-schema";
import { showToast } from "@/utils/utils";
import { useToast } from "../hooks/use-toast";
import { FormField } from "@/components/ui/field";
import { Icon } from "@iconify/react";

export default function EditAccountForm({ userData }: { userData: Register }) {
  const [formData, setFormData] = useState(() => ({
    username: userData.username,
    email: userData.email,
    password: "",
    password_confirmation: "",
  }));

  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const router = useRouter();
  const { toast } = useToast();

  const handleInputChange = useCallback(
    (field: keyof typeof formData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleUserUpdate = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError(null);

      const result = SignupFormSchema.safeParse(formData);
      if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors as Record<
          string,
          string[]
        >;
        setErrors(
          Object.fromEntries(
            Object.entries(fieldErrors).map(([key, value]) => [key, value[0]])
          )
        );
        showToast("validationError", toast);
        return;
      }

      setErrors({});

      try {
        const { error } = await updateUserData(formData);
        if (error) throw new Error(error.message || "Error updating account");

        showToast("success", toast);
        router.replace("/account");
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred";
        setError(errorMessage);
        showToast("genericError", toast);
        console.error("Update Error:", err);
      }
    },
    [formData, router, toast]
  );

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
          <div
            className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200"
            aria-live="polite"
          >
            {error}
          </div>
        )}

        <fieldset className="space-y-4">
          <legend className="sr-only">Edit Account Details</legend>

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
            label="New password"
            id="password"
            label_type="password"
            value={formData.password}
            setValue={(val) => handleInputChange("password", val)}
            error={errors.password}
          />

          <FormField
            label="Confirm password"
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
          <Icon icon="material-symbols:check-rounded" className="w-6 h-6" />
          <span className="hidden md:inline ml-2">Save Changes</span>
        </button>
      </form>
    </section>
  );
}
