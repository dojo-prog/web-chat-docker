import { useEffect, useRef } from "react";
import useChatStore from "../stores/chat.store";
import useAuthStore from "../stores/auth.store";
import ChatLoader from "./loaders/ChatLoader";
import EmptyChat from "./EmptyChat";

const ChatContainer = () => {
  const { user } = useAuthStore();
  const {
    fetchMessagesByUserId,
    messages,
    selectedUser,
    loadingMessages,
    subscribeToMessages,
    unsubscribeToMessages,
  } = useChatStore();
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchMessagesByUserId();
    subscribeToMessages();

    return () => unsubscribeToMessages();
  }, [
    selectedUser,
    fetchMessagesByUserId,
    subscribeToMessages,
    unsubscribeToMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (loadingMessages) return <ChatLoader />;
  if (messages.length === 0) return <EmptyChat />;

  return (
    <div className="w-full px-5 py-4 space-y-3">
      {messages.map((m) => (
        <div
          className={`w-full flex ${
            m.senderId === user?._id ? "justify-end" : "justify-start"
          }`}
        >
          <div>
            <div className="max-w-50">
              {/* Bubble */}
              <div
                className={`px-4 py-2 rounded-xl ${
                  m.senderId === user?._id
                    ? "bg-blue-700/80 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                {m.image && (
                  <img src={m.image} alt="image_sent" className="w-full" />
                )}
                {m.text && <p>{m.text}</p>}
              </div>

              {/* Timestamp */}
              <p
                className={`w-full text-xs mt-1 opacity-75 ${
                  m.senderId === user?._id ? "text-right" : "text-left"
                }`}
              >
                {new Date(m.createdAt!).toLocaleTimeString(undefined, {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>
      ))}
      <div ref={messageEndRef} />
    </div>
  );
};

export default ChatContainer;
