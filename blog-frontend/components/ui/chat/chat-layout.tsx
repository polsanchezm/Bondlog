// "use client";

// import { userData } from "@/components/ui/chat/hooks/data";
// import React, { useEffect, useState } from "react";
// import {
//   ResizableHandle,
//   ResizablePanel,
//   ResizablePanelGroup,
// } from "@/components/ui/resizable";
// import { cn } from "@/lib/utils";
// import { Sidebar } from "@/components/ui/sidebar";
// import { Chat } from "@/components/ui/chat/chat";

// interface ChatLayoutProps {
//   defaultLayout: number[] | undefined;
//   defaultCollapsed?: boolean;
//   navCollapsedSize: number;
// }

// export function ChatLayout({
//   defaultLayout = [320, 480],
//   defaultCollapsed = false,
//   navCollapsedSize,
// }: ChatLayoutProps) {
//   const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
//   const [selectedUser, setSelectedUser] = React.useState(userData[0]);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkScreenWidth = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };

//     // Initial check
//     checkScreenWidth();

//     // Event listener for screen width changes
//     window.addEventListener("resize", checkScreenWidth);

//     // Cleanup the event listener on component unmount
//     return () => {
//       window.removeEventListener("resize", checkScreenWidth);
//     };
//   }, []);

//   return (
//     <ResizablePanelGroup
//       direction="horizontal"
//       onLayout={(sizes: number[]) => {
//         document.cookie = `react-resizable-panels:layout=${JSON.stringify(
//           sizes
//         )}`;
//       }}
//       className="h-full w-full items-stretch"
//     >
//       <ResizablePanel
//         defaultSize={defaultLayout[0]}
//         collapsedSize={navCollapsedSize}
//         collapsible={false}
//         minSize={isMobile ? 0 : 14}
//         maxSize={isMobile ? 8 : 36}
//         // onCollapse={() => {
//         //   setIsCollapsed(true);
//         //   document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
//         //     true
//         //   )}`;
//         // }}
//         onExpand={() => {
//           setIsCollapsed(false);
//           document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
//             false
//           )}`;
//         }}
//         className={cn(
//           isCollapsed &&
//             "min-w-[50px] md:min-w-[70px] transition-all duration-300 ease-in-out"
//         )}
//       >
//         <Sidebar
//           isCollapsed={isCollapsed || isMobile}
//           chats={userData.map((user) => ({
//             name: user.name,
//             messages: user.messages ?? [],
//             avatar: user.avatar,
//             variant: selectedUser.name === user.name ? "secondary" : "ghost",
//           }))}
//           isMobile={isMobile}
//         />
//       </ResizablePanel>
//       <ResizableHandle withHandle />
//       <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
//         <Chat
//           messages={selectedUser.messages}
//           selectedUser={selectedUser}
//           isMobile={isMobile}
//         />
//       </ResizablePanel>
//     </ResizablePanelGroup>
//   );
// }

"use client";

import { userData } from "@/components/ui/chat/hooks/data";
import { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/ui/sidebar";
import { Chat } from "@/components/ui/chat/chat";
import { User } from "@/lib/interfaces";

interface ChatLayoutProps {
  defaultLayout?: number[];
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function ChatLayout({
  defaultLayout = [320, 480],
  defaultCollapsed = false,
  navCollapsedSize,
}: ChatLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const checkScreenWidth = () => {
    const isMobileView = window.innerWidth <= 768;
    setIsMobile(isMobileView);
  };

  useEffect(() => {
    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);

    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  return (
    <div className="h-full w-full">
      {isMobile ? (
        selectedUser ? (
          <Chat
            messages={selectedUser.messages}
            selectedUser={selectedUser}
            isMobile={isMobile}
            onBack={() => setSelectedUser(null)}
          />
        ) : (
          <Sidebar
            isCollapsed={isCollapsed}
            chats={userData.map((user) => ({
              username: user.username,
              role: user.role,
              email: user.email,
              messages: user.messages ?? [],
              avatar: user.avatar,
              created_at: user.created_at,
              updated_at: user.updated_at,
              variant:
                selectedUser?.username === user.username
                  ? "secondary"
                  : "ghost",
              onClick: () => setSelectedUser(user),
            }))}
            isMobile={isMobile}
          />
        )
      ) : (
        <ResizablePanelGroup
          direction="horizontal"
          onLayout={(sizes: number[]) => {
            document.cookie = `react-resizable-panels:layout=${JSON.stringify(
              sizes
            )}`;
          }}
          className="h-full w-full items-stretch"
        >
          <ResizablePanel
            defaultSize={defaultLayout[0]}
            collapsedSize={navCollapsedSize}
            collapsible={false}
            minSize={14}
            maxSize={36}
            onExpand={() => {
              setIsCollapsed(false);
              document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                false
              )}`;
            }}
            className={cn(
              isCollapsed &&
                "min-w-[50px] md:min-w-[70px] transition-all duration-300 ease-in-out"
            )}
          >
            <Sidebar
              isCollapsed={isCollapsed}
              chats={userData.map((user) => ({
                username: user.username,
                role: user.role,
                email: user.email,
                messages: user.messages ?? [],
                avatar: user.avatar,
                created_at: user.created_at,
                updated_at: user.updated_at,
                variant:
                  selectedUser?.username === user.username
                    ? "secondary"
                    : "ghost",
                onClick: () => setSelectedUser(user),
              }))}
              isMobile={isMobile}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
            {selectedUser ? (
              <Chat
                messages={selectedUser.messages}
                selectedUser={selectedUser}
                isMobile={isMobile}
              />
            ) : (
              <div className="flex justify-center items-center h-full text-gray-500">
                Select a chat to start
              </div>
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      )}
    </div>
  );
}
