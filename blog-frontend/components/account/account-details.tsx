import { User } from "@/lib/interfaces";
import { formatDate, checkUpdatedAt } from "@/lib/helpers";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AccountDetails({ userData }: { userData: User }) {
  const initialLetter = userData.username?.charAt(0).toUpperCase() || "?";

  return (
    <section className="flex flex-col items-center justify-center p-6">
      <Card className="max-w-lg w-full border border-border rounded-lg">
        <CardHeader className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            User Profile
          </h2>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-lg bg-blue-500 text-white flex items-center justify-center font-semibold text-2xl">
              {initialLetter}
            </div>
            <div>
              <p className="text-lg font-medium text-gray-800 dark:text-white">
                {userData.username}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {userData.email}
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-400">
                Joined on {formatDate(userData.created_at || "")}
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-400">
                Last updated {checkUpdatedAt(userData)}
              </p>
            </div>
          </div>
          {userData.role !== "admin" && (
            <Link href="/account/edit" className="mt-6 block">
              <Button className="w-full flex items-center justify-center gap-2 py-3 transition duration-300">
                <Pencil />
                <span className="hidden md:inline ml-2">Edit Profile</span>
              </Button>
            </Link>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
