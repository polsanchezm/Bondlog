import { Post, User } from "@/lib/interfaces";

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

type ToastVariant = "default" | "destructive" | null;

const toastMessages: Record<
  string,
  { variant?: ToastVariant; title: string; description: string }
> = {
  successSignup: {
    title: "Success",
    description: "Account created successfully!",
  },
  successLogin: {
    title: "Success",
    description: "Logged in successfully!",
  },
  successLogout: {
    title: "Success",
    description: "Logged out successfully!",
  },
  successEditAccount: {
    title: "Success",
    description: "Account updated successfully!",
  },
  successPostCreate: {
    title: "Success",
    description: "Post created successfully!",
  },
  successPostEdit: {
    title: "Success",
    description: "Post updated successfully!",
  },
  successPostDelete: {
    title: "Success",
    description: "Post deleted successfully!",
  },
  userExists: {
    variant: "destructive",
    title: "Uh oh! Something went wrong.",
    description: "User already exists. Please login instead.",
  },
  genericError: {
    variant: "destructive",
    title: "Uh oh! Something went wrong.",
    description: "There was a problem with your request. Please try again.",
  },
  validationError: {
    variant: "destructive",
    title: "Validation Error",
    description: "Please check your input and try again.",
  },
};

const showToast = (type: string, toast: unknown) => {
  if (typeof toast === "function") {
    toast(toastMessages[type] || toastMessages.genericError);
  } else {
    console.error("Toast is not a function:", toast);
  }
};

export { formatDate, checkUpdatedAt, showToast };
