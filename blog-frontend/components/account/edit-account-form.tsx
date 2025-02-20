"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/hooks/use-toast";
import { LoginFormSchema } from "@/lib/form-schema";
import { showToast } from "@/lib/helpers";
import { FormEvent, useState } from "react";
import { Register } from "@/lib/interfaces";
import { useUpdateUser } from "@/components/hooks/use-edit-user";
import { Card, CardContent } from "@/components/ui/card";
import { SquarePen } from "lucide-react";

interface EditAccountFormProps {
  userData: Register;
}

export default function EditAccountForm({ userData }: EditAccountFormProps) {
  const [formData, setFormData] = useState<Register>({
    username: userData.username,
    email: userData.email,
    password: userData.password,
    password_confirmation: userData.password_confirmation,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { toast } = useToast();
  const { updateUser } = useUpdateUser();
  const router = useRouter();

  const handleEditAccount = async (e: FormEvent<HTMLFormElement>) => {
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
      const { error } = await updateUser(formData);
      if (error) throw new Error(error!.message);
      showToast("successEditAccount", toast);
      router.push("/account");
    } catch (error: unknown) {
      showToast("genericError", toast);
      console.error("Edit account Error:", error);
    }
  };

  return (
    <Card className="overflow-hidden border border-border mb-28">
      <CardContent className="grid p-0">
        <form className="p-6 md:p-8" onSubmit={handleEditAccount}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-bold">Edit account</h1>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="JohnDoe96"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                required
              />
            </div>
            {errors.username && (
              <p id={`$username-error`} className="mt-1 text-red-500 text-sm">
                {errors.username}
              </p>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="johndoe@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            {errors.email && (
              <p id={`$email-error`} className="mt-1 text-red-500 text-sm">
                {errors.email}
              </p>
            )}
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>
            {errors.password && (
              <p id={`$password-error`} className="mt-1 text-red-500 text-sm">
                {errors.password}
              </p>
            )}
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password-confirm">Confirm Password</Label>
              </div>
              <Input
                id="password-confirm"
                type="password"
                placeholder="••••••••"
                value={formData.password_confirmation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password_confirmation: e.target.value,
                  })
                }
                required
              />
            </div>
            {errors.password_confirmation && (
              <p
                id={`$password-confirm-error`}
                className="mt-1 text-red-500 text-sm"
              >
                {errors.password_confirmation}
              </p>
            )}
            <Button type="submit" className="w-full">
              <SquarePen size={48} />
              <span className="hidden md:block">Edit account</span>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
