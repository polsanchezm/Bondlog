"use server";
import { cookies } from "next/headers";
import { ChatLayout } from "@/components/ui/chat/chat-layout";

export default async function Home() {
  const layout = (await cookies()).get("react-resizable-panels:layout");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

  return (
    <main className="flex h-[calc(100dvh)] sm:h-[calc(90dvh)] flex-col items-center justify-center">
      <div className="z-10 border rounded-lg w-full h-full text-sm flex pb-20 sm:p-0">
        <div className="w-full">
          <ChatLayout defaultLayout={defaultLayout} navCollapsedSize={8} />
        </div>
      </div>
    </main>
  );
}
