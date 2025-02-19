"use client";

import { useState, useEffect, useCallback, FormEvent } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate, showToast } from "@/lib/helpers";
import { Comment, PaginationType, User } from "@/lib/interfaces";
import { CommentDropdown } from "@/components/comment/dropdown/comment-dropdown";
import CreateCommentForm from "@/components/comment/create/create-comment-form";
import EditCommentForm from "@/components/comment/edit/edit-comment-form";
import { CommentSchema } from "@/lib/form-schema";
import { useToast } from "@/components/hooks/use-toast";
import { useCreateComment } from "@/components/hooks/use-create-comment";
import { useRouter } from "next/navigation";
import { updateComment, fetchComments } from "@/services/comment";
import { CommentPaginationComponent } from "@/components/ui/comment-pagination";
import CommentSkeleton from "@/components/ui/skeletons/comment";

interface PostCommentsProps {
  post_id: string;
  user?: User;
  isLoggedIn: boolean;
}

export default function PostComments({
  post_id,
  user,
  isLoggedIn,
}: PostCommentsProps) {
  const [page, setPage] = useState(1);
  const [commentsData, setCommentsData] = useState<{
    comments: Comment[];
    pagination: PaginationType;
  }>({
    comments: [],
    pagination: { current_page: 1, next_page_url: "", prev_page_url: "" },
  });
  const [loading, setLoading] = useState(false);
  // Estado para distinguir la carga inicial de actualizaciones posteriores.
  const [initialLoad, setInitialLoad] = useState(true);

  const [createFormData, setCreateFormData] = useState<Comment>({
    id: "",
    content: "",
    post_id: post_id,
    author_id: "",
    author_username: "",
    created_at: "",
    updated_at: "",
    is_pinned: false,
  });
  const [createErrors, setCreateErrors] = useState<{ [key: string]: string }>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();
  const { create } = useCreateComment();

  // Función centralizada para cargar comentarios.
  // El parámetro "showSkeleton" permite decidir si se muestra el skeleton o no.
  const loadComments = useCallback(
    async (showSkeleton: boolean = false) => {
      if (showSkeleton) setLoading(true);
      const result = await fetchComments(page, post_id);
      if (!result.error) {
        setCommentsData({
          comments: result.data,
          pagination: result.pagination,
        });
      } else {
        console.error(result.error);
      }
      if (showSkeleton) setLoading(false);
      setInitialLoad(false);
    },
    [page, post_id]
  );

  // Carga inicial: mostramos el skeleton.
  useEffect(() => {
    loadComments(true);
  }, [loadComments]);

  const handleCreateComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const result = CommentSchema.safeParse(createFormData);
    if (!result.success) {
      setCreateErrors(
        Object.fromEntries(
          Object.entries(result.error.flatten().fieldErrors).map(
            ([key, value]) => [key, value[0]]
          )
        )
      );
      setIsSubmitting(false);
      return;
    }
    setCreateErrors({});
    try {
      const { error } = await create(createFormData, post_id);
      if (error) throw new Error(error!.message);
      showToast("successCommentCreate", toast);
      // Actualizamos la lista sin mostrar skeleton, ya que ya hay comentarios.
      await loadComments();
    } catch (error: unknown) {
      showToast("genericError", toast);
      console.error("Create Comment Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    // Opcionalmente, podrías mostrar skeleton si cambias de página,
    // pero si prefieres no mostrarlo, simplemente actualizas el estado.
    loadComments(true);
  };

  return (
    <section className="mt-8 space-y-4">
      {isLoggedIn && user && (
        <CreateCommentForm
          formData={createFormData}
          errors={createErrors}
          setFormData={setCreateFormData}
          onSubmit={handleCreateComment}
          disabled={isSubmitting}
        />
      )}
      {initialLoad ? (
        <CommentSkeleton />
      ) : commentsData.comments.length === 0 ? (
        <p className="text-center text-sm text-gray-500 mt-8">
          There are no comments.
        </p>
      ) : (
        commentsData.comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            user={user}
            isLoggedIn={isLoggedIn}
            reloadComments={loadComments}
          />
        ))
      )}
      <footer className="mt-10">
        <CommentPaginationComponent
          pagination={commentsData.pagination}
          onPageChange={handlePageChange}
        />
      </footer>
    </section>
  );
}

interface CommentItemProps {
  comment: Comment;
  user?: User;
  isLoggedIn: boolean;
  reloadComments?: () => void;
}

function CommentItem({
  comment,
  user,
  isLoggedIn,
  reloadComments,
}: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState<Comment>(comment);
  const [editErrors, setEditErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
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
        await reloadComments();
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
              />
            </div>
          </CardHeader>
          <Separator className="border-t border-gray-300 dark:border-gray-600 mb-6" />
          <CardContent>
            <div
              className="text-gray-800 dark:text-white"
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
