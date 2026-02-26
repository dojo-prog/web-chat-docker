import { XIcon } from "lucide-react";
import useChatStore from "../stores/chat.store";
import useAuthStore from "../stores/auth.store";

const ChatHeader = () => {
  const { selectedUser: user, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const isOnline = user && onlineUsers.includes(user!._id);

  return (
    <div className="w-full h-20 shadow flex items-center justify-between bg-slate-800/50 px-6">
      <div className="flex items-center">
        <div className="relative w-12 h-12 border-2 border-gray-600 rounded-full group cursor-pointer mr-3">
          <img
            src={user?.profileImage.url || "/avatar.png"}
            alt="user_profile"
            className="w-full h-full object-contain"
          />
          {isOnline && (
            <div className="absolute top-1 right-1 w-3 h-3 bg-green-500 border-2 border-gray-600 rounded-full" />
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-sm font-semibold">
            {user?.fname} {user?.lname}
          </h2>
          <p className="text-xs text-gray-400">
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>
      <button
        className="size-4 text-gray-400 hover:text-gray-500 cursor-pointer"
        onClick={() => setSelectedUser(null)}
      >
        <XIcon className="h-full" />
      </button>
    </div>
  );
};

export default ChatHeader;
