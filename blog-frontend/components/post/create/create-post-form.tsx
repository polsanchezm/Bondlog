"use client";

import { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { SquarePen } from "lucide-react";
import TipTap from "@/components/editor/tiptap-editor";
import { Comment } from "@/lib/interfaces";

interface CreatePostFormProps {
  errors: { [key: string]: string };
  formData: {
    title: string;
    subtitle: string;
    body: string;
    id: string;
    author_username: string;
    author_id: string;
    date: string;
    created_at: string;
    updated_at: string;
    is_pinned: boolean;
    comments: Comment[];
  };
  setFormData: (data: {
    title: string;
    subtitle: string;
    body: string;
    id: string;
    author_username: string;
    author_id: string;
    date: string;
    created_at: string;
    updated_at: string;
    is_pinned: boolean;
    comments: Comment[];
  }) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export default function CreatePostForm({
  errors,
  formData,
  setFormData,
  onSubmit,
}: CreatePostFormProps) {
  return (
    <Card className="border border-border overflow-hidden mb-20 bg-gray-100 dark:bg-gray-800">
      <CardContent className="grid p-0">
        <form
          className="p-6 md:p-8 rounded-lg text-gray-700 dark:text-white"
          onSubmit={onSubmit}
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-bold">Create a post</h1>
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

          <Button type="submit" className="w-full rounded-lg mt-6">
            <SquarePen className="block md:hidden" size={48} />
            <span className="hidden md:block">Create post</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
