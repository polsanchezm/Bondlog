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
          {/* <Icon
            icon="iconoir:pin-solid"
            width="24"
            height="24"
            className="mr-2"
          /> */}
          Unpin
        </>
      ) : (
        <>
          {/* <Icon icon="iconoir:pin" width="24" height="24" className="mr-2" /> */}
          Pin
        </>
      )}
    </button>
  );
}
