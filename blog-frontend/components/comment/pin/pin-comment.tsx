import { Pin, PinOff } from "lucide-react";
import { useCallback } from "react";

export function PinComment({
  commentId,
  isPinned,
  onTogglePin,
}: {
  commentId: string;
  isPinned: boolean;
  onTogglePin: (commentId: string, isPinned: boolean) => void;
}) {
  const handlePinToggle = useCallback(() => {
    onTogglePin(commentId, !isPinned);
  }, [commentId, isPinned, onTogglePin]);

  return (
    <button
      onClick={handlePinToggle}
      aria-pressed={isPinned}
      className="flex justify-center gap-4 items-center px-11 py-2 text-sm font-medium rounded-lg transition-all"
    >
      {isPinned ? (
        <>
          <PinOff />
          <span className="hidden md:block">Unpin</span>
        </>
      ) : (
        <>
          <Pin />
          <span className="hidden md:block">Pin</span>
        </>
      )}
    </button>
  );
}
