import { Pin, PinOff } from "lucide-react";
import { useCallback } from "react";

export function PinPost({
  postId,
  isPinned,
  onTogglePin,
}: {
  postId: string;
  isPinned: boolean;
  onTogglePin: (postId: string, isPinned: boolean) => void;
}) {
  const handlePinToggle = useCallback(() => {
    onTogglePin(postId, !isPinned);
  }, [postId, isPinned, onTogglePin]);

  return (
    <button
      onClick={handlePinToggle}
      aria-pressed={isPinned}
      className="flex justify-center items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all"
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
