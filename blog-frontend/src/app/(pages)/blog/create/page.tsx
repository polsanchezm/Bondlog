import { isAuthenticated } from "@/actions/auth";
import CreatePostForm from "@/components/posts/CreatePostForm";
import { redirect } from "next/navigation";

export default async function CreatePost() {
  const authCheck = await isAuthenticated();
  if (!authCheck) {
    redirect("/login");
  } else {
    return <CreatePostForm />;
  }
}
