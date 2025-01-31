"use client";

import { updateUserData } from "@/actions/user";
import { Register } from "@lib/interfaces";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { SignupFormSchema } from "@/lib/form-schema";
import { showToast } from "@/utils/utils";
import { useToast } from "../hooks/use-toast";

export default function EditAccountForm({ userData }: { userData: Register }) {
  const [name, setName] = useState(userData.name);
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
      name: name,
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
      const { data, error } = await updateUserData(formData);

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
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Edit your account
            </h1>
            {error && (
              <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                {error}
              </div>
            )}
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleUserUpdate}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your name
                </label>
                <input
                  defaultValue={name}
                  onChange={(e) => setName(e.target.value)}
                  type="name"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Jhon"
                  required
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  defaultValue={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              {errors.password_confirmation && (
                <p className="text-red-500 text-sm">
                  {errors.password_confirmation}
                </p>
              )}
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Edit your account
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
