import useAuthStore, { type User } from "../stores/auth.store";
import useChatStore from "../stores/chat.store";

const UserCard = ({ user }: { user: User }) => {
  const { setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <button
      className="w-full h-16 bg-blue-500/20 px-3 flex items-center rounded-md transition-colors duration-150 hover:bg-blue-700/50 cursor-pointer"
      onClick={() => setSelectedUser(user)}
    >
      <div className="relative w-13 h-13 border-2 border-gray-600 rounded-full group cursor-pointer mr-3">
        <img
          src={user?.profileImage.url || "/avatar.png"}
          alt="user_profile"
          className="w-full h-full object-contain"
        />
        {onlineUsers.includes(user._id) && (
          <div className="absolute top-1 right-1 w-3 h-3 bg-green-500 border-2 border-gray-600 rounded-full" />
        )}
      </div>
      <div className="flex-1">
        <h2 className="text-left text-sm font-semibold truncate">
          {user?.fname} {user?.lname}
        </h2>
      </div>
    </button>
  );
};

export default UserCard;
