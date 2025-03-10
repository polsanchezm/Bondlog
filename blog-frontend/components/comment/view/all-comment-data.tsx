"use client";

import { useState, useEffect, useCallback, FormEvent } from "react";
import { showToast } from "@/lib/helpers";
import { Comment, PaginationType, User } from "@/lib/interfaces";
import CreateCommentForm from "@/components/comment/create/create-comment-form";
import { CommentSchema } from "@/lib/form-schema";
import { useToast } from "@/components/hooks/use-toast";
import { useCreateComment } from "@/components/hooks/use-create-comment";
import { fetchComments } from "@/services/comment";
import { CommentPaginationComponent } from "@/components/ui/comment-pagination";
import CommentSkeleton from "@/components/ui/skeletons/comment";
import { CommentItem } from "@/components/comment/view/comment-item";

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
      if (error) throw new Error(error!.status);
      showToast("successCommentCreate", toast);
      await loadComments();
    } catch (error: unknown) {
      if (String(error).includes("422")) {
        showToast("validationError", toast);
      } else {
        showToast("genericError", toast);
      }
      console.error("Create Comment Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
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
      {initialLoad || loading ? (
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
