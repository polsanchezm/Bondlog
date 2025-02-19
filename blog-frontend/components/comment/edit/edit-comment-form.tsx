"use client";

import { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SquarePen } from "lucide-react";
import TipTap from "@/components/editor/tiptap-editor";

interface EditCommentFormProps {
  errors: { [key: string]: string };
  formData: {
    id: string;
    content: string;
    post_id: string;
    author_id: string;
    author_username: string;
    created_at: string;
    updated_at: string;
    is_pinned: boolean;
  };
  setFormData: (data: {
    id: string;
    content: string;
    post_id: string;
    author_id: string;
    author_username: string;
    created_at: string;
    updated_at: string;
    is_pinned: boolean;
  }) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  disabled: boolean;
}

export default function EditCommentForm({
  errors,
  formData,
  setFormData,
  onSubmit,
  disabled,
}: EditCommentFormProps) {
  return (
    <Card className="border border-border overflow-hidden bg-gray-100 dark:bg-gray-800">
      <CardContent className="grid p-0">
        <form
          className="p-6 md:p-8 rounded-lg text-gray-700 dark:text-white"
          onSubmit={onSubmit}
        >
          <div className="grid gap-2">
            <TipTap
              description={formData.content}
              onChange={(newContent) =>
                setFormData({ ...formData, content: newContent })
              }
            />
            {errors.content && (
              <p className="mt-1 text-red-500 text-sm">{errors.content}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full rounded-lg mt-6"
            disabled={disabled}
          >
            <SquarePen className="block md:hidden" size={48} />
            <span className="hidden md:block">Update</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
