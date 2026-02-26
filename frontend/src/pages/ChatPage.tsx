import useAuthStore from "../stores/auth.store";

const ChatPage = () => {
  const { logout } = useAuthStore();

  return (
    <div>
      ChatPage
      <button className="text-white" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default ChatPage;
