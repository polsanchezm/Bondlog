"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { userLogin } from "@/actions/auth";
import { createSession } from "@lib/session";
import { LoginFormSchema } from "@/lib/form-schema";
import { useToast } from "@/components/hooks/use-toast";
import { showToast } from "@/utils/utils";
import { FormField } from "@/components/ui/field";
import { Icon } from "@iconify/react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const { toast } = useToast();

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const userData = { email, password };

    const result = LoginFormSchema.safeParse(userData);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors as Record<
        string,
        string[]
      >;
      setErrors(
        Object.keys(fieldErrors).reduce((acc, key) => {
          acc[key] = fieldErrors[key]?.[0] || "";
          return acc;
        }, {} as { [key: string]: string })
      );
      return;
    }

    setErrors({});
    try {
      const response = await userLogin(userData);
      await createSession(response.token);
      showToast("successSignup", toast);
      router.push("/");
    } catch (error: unknown) {
      showToast("genericError", toast);
      console.error("Error:", error);
    }
  }

  return (
    <section className="dark:bg-gray-900 p-6 max-w-3xl mx-auto">
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white text-center">
        Sign in to your account{" "}
      </h2>
      <form
        onSubmit={handleLogin}
        className="max-w-3xl mx-auto bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-6"
      >
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

        <button
          type="submit"
          className="w-full flex justify-center items-center h-16 px-5 py-3 text-white font-medium text-sm rounded-lg bg-green-600 hover:bg-green-800 transition"
        >
          <Icon icon="lucide:log-in" className="w-9 h-9" />
        </button>

        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Don&apos;t have an account yet?{" "}
          <a
            href="signup"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Sign up
          </a>
        </p>
      </form>
    </section>
  );
}
