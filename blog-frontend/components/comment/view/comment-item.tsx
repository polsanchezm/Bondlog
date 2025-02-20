import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CommentDropdown } from "@/components/comment/dropdown/comment-dropdown";
import EditCommentForm from "@/components/comment/edit/edit-comment-form";
import { useRouter } from "next/navigation";
import { updateComment } from "@/services/comment";
import { Comment, User } from "@/lib/interfaces";
import { FormEvent, useState, useTransition } from "react";
import { useToast } from "@/components/hooks/use-toast";
import { CommentSchema } from "@/lib/form-schema";
import { formatDate, showToast } from "@/lib/helpers";
import { useDeleteComment } from "@/components/hooks/use-delete-comment";

interface CommentItemProps {
  comment: Comment;
  user?: User;
  isLoggedIn: boolean;
  reloadComments?: () => void;
}

export function CommentItem({
  comment,
  user,
  isLoggedIn,
  reloadComments,
}: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState<Comment>(comment);
  const [editErrors, setEditErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { commentDelete } = useDeleteComment();
  const { toast } = useToast();
  const router = useRouter();

  const handleUpdateComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const result = CommentSchema.safeParse(editFormData);
    if (!result.success) {
      setEditErrors(
        Object.fromEntries(
          Object.entries(result.error.flatten().fieldErrors).map(
            ([key, value]) => [key, value[0]]
          )
        )
      );
      setIsSubmitting(false);
      return;
    }
    setEditErrors({});
    try {
      await updateComment(editFormData, editFormData.id);
      setIsEditing(false);
      if (reloadComments) {
        reloadComments();
      } else {
        router.refresh();
      }
    } catch (error: unknown) {
      showToast("genericError", toast);
      console.error("Update Comment Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = (commentId: string) => {
    startTransition(async () => {
      try {
        const { error } = await commentDelete(commentId);
        if (error) throw new Error(error.message);
        showToast("successCommentDelete", toast);
        if (reloadComments) {
          reloadComments();
        } else {
          router.refresh();
        }
      } catch (error: unknown) {
        showToast("genericError", toast);
        console.error("Delete Comment Error:", error);
      }
    });
  };

  return (
    <div className="max-w-3xl w-full mx-auto">
      {isEditing ? (
        <EditCommentForm
          errors={editErrors}
          formData={editFormData}
          setFormData={setEditFormData}
          onSubmit={handleUpdateComment}
          disabled={isSubmitting}
        />
      ) : (
        <Card className="shadow-md border border-border bg-gray-100 dark:bg-gray-800">
          <CardHeader>
            <div className="flex justify-end items-center">
              <CommentDropdown
                comment={comment}
                user={user}
                isLoggedIn={isLoggedIn}
                initialIsPinned={comment.is_pinned}
                onEdit={() => setIsEditing(true)}
                handleDeleteComment={() => handleDeleteComment(comment.id)}
                isPending={isPending}
              />
            </div>
          </CardHeader>
          <Separator className="border-t border-gray-300 dark:border-gray-600 mb-6" />
          <CardContent>
            <div
              className="prose prose-neutral dark:prose-invert text-gray-800 dark:text-white"
              dangerouslySetInnerHTML={{ __html: comment.content }}
            />
          </CardContent>
          <Separator className="border-t border-gray-300 dark:border-gray-600 mb-6" />
          <div className="px-6 pb-4 flex flex-col sm:flex-row justify-between text-sm text-gray-500 dark:text-gray-400">
            <p className="font-medium">{comment.author_username}</p>
            <p>{formatDate(comment.created_at)}</p>
          </div>
        </Card>
      )}
    </div>
  );
}
