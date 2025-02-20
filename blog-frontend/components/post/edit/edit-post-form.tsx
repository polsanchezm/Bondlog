"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { SquarePen } from "lucide-react";
import TipTap from "@/components/editor/tiptap-editor";
import { Post } from "@/lib/interfaces";
import { useEditPost } from "@/components/hooks/use-edit-post";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/hooks/use-toast";
import { showToast } from "@/lib/helpers";
import { FormEvent, useState, useTransition } from "react";
import { PostSchema } from "@/lib/form-schema";

interface EditPostFormProps {
  postData: Post;
}

export default function EditPostForm({ postData }: EditPostFormProps) {
  const [formData, setFormData] = useState<Post>({
    title: postData.title,
    subtitle: postData.subtitle,
    body: postData.body,
    id: postData.id,
    author_username: postData.author_username,
    author_id: postData.author_id,
    date: postData.date,
    created_at: postData.created_at,
    updated_at: postData.updated_at,
    is_pinned: postData.is_pinned,
    comments: postData.comments,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { toast } = useToast();
  const { edit } = useEditPost();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleEditPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = PostSchema.safeParse(formData);
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
    startTransition(async () => {
      try {
        const { error } = await edit(formData, formData.id);
        if (error) throw new Error(error!.message);
        showToast("successEditAccount", toast);
        router.push(`/post/${formData.id}`);
      } catch (error: unknown) {
        showToast("genericError", toast);
        console.error("Edit account Error:", error);
      }
    });
  };

  return (
    <Card className="overflow-hidden border border-border mb-20 bg-gray-100 dark:bg-gray-800">
      <CardContent className="grid p-0">
        <form className="p-6 md:p-8 rounded-lg" onSubmit={handleEditPost}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-bold">Edit post</h1>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="title" className="text-gray-700 dark:text-white">
                Title
              </Label>
              <Input
                className="rounded-lg bg-gray-200 dark:bg-gray-700"
                id="title"
                type="text"
                placeholder="Post title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
              {errors.title && (
                <p className="mt-1 text-red-500 text-sm">{errors.title}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="subtitle"
                className="text-gray-700 dark:text-white"
              >
                Subtitle
              </Label>
              <Input
                id="subtitle"
                className="rounded-lg bg-gray-200 dark:bg-gray-700"
                type="text"
                placeholder="Post subtitle"
                value={formData.subtitle}
                onChange={(e) =>
                  setFormData({ ...formData, subtitle: e.target.value })
                }
                required
              />
              {errors.subtitle && (
                <p className="mt-1 text-red-500 text-sm">{errors.subtitle}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="body" className="text-gray-700 dark:text-white">
                Body
              </Label>
              <TipTap
                description={formData.body}
                onChange={(newBody) =>
                  setFormData({ ...formData, body: newBody })
                }
              />
              {errors.body && (
                <p className="mt-1 text-red-500 text-sm">{errors.body}</p>
              )}
            </div>
          </div>

          <Button
            disabled={isPending}
            type="submit"
            className="w-full rounded-lg mt-6"
          >
            <SquarePen size={48} />
            <span className="hidden md:block">Update Post</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
