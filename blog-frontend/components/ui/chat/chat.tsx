// import { Message, UserData } from "@/components/ui/chat/hooks/data";
// import ChatTopbar from "./chat-topbar";
// import { ChatList } from "./chat-list";
// import React, { useEffect, useState } from "react";
// import useChatStore from "@/components/ui/chat/hooks/useChatStore";
// import ChatBottombar from "./chat-bottombar";

// interface ChatProps {
//   messages?: Message[];
//   selectedUser: UserData;
//   isMobile: boolean;
// }

// export function Chat({ messages, selectedUser, isMobile }: ChatProps) {
//   const messagesState = useChatStore((state) => state.messages);

//   const sendMessage = (newMessage: Message) => {
//     useChatStore.setState((state) => ({
//       messages: [...state.messages, newMessage],
//     }));
//   };

//   return (
//     <div className="flex flex-col justify-between w-full h-full">
//       <ChatTopbar selectedUser={selectedUser} />

//       <ChatList
//         messages={messagesState}
//         selectedUser={selectedUser}
//         sendMessage={sendMessage}
//         isMobile={isMobile}
//       />

//       <ChatBottombar isMobile={isMobile} />
//     </div>
//   );
// }

import { UserData } from "@/components/ui/chat/hooks/data";
import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";
import React from "react";
import useChatStore from "@/components/ui/chat/hooks/useChatStore";
import ChatBottombar from "./chat-bottombar";
import { ArrowLeft } from "lucide-react";
import { Message } from "@/lib/interfaces";

interface ChatProps {
  messages?: Message[];
  selectedUser: UserData;
  isMobile: boolean;
  onBack?: () => void;
}

export function Chat({ messages, selectedUser, isMobile, onBack }: ChatProps) {
  const messagesState = useChatStore((state) => state.messages);
  const sendMessage = (newMessage: Message) => {
    useChatStore.setState((state) => ({
      messages: [...state.messages, newMessage],
    }));
  };

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <div className="flex items-center gap-2 p-4 border-b bg-gray-100 dark:bg-gray-900">
        {isMobile && (
          <button
            onClick={onBack}
            className="p-2 text-gray-600 dark:text-gray-300"
          >
            <ArrowLeft size={24} />
          </button>
        )}
        <ChatTopbar selectedUser={selectedUser} />
      </div>

      <ChatList
        messages={messagesState}
        selectedUser={selectedUser}
        sendMessage={sendMessage}
        isMobile={isMobile}
      />

      <ChatBottombar isMobile={isMobile} />
    </div>
  );
}
