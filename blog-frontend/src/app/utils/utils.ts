import { Post, User } from "@/app/lib/interfaces";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const formatter = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Madrid",
  });

  return formatter.format(date);
};

const checkUpdatedAt = (object: Post | User) => {
  const updatedAt = new Date(object?.updated_at || "");
  const now = new Date();
  const diff = now.getTime() - updatedAt.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else {
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      const minutes = Math.floor(diff / (1000 * 60));
      if (minutes <= 0) {
        return "Now";
      } else {
        return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
      }
    }
  }
};

export { formatDate, checkUpdatedAt };
