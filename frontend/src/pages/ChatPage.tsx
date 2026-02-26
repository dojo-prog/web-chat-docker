import ChatContainer from "../components/ChatContainer";
import ChatHeader from "../components/ChatHeader";
import MessageInputs from "../components/MessageInputs";
import NoChatSelected from "../components/NoChatSelected";
import ProfileHeader from "../components/ProfileHeader";
import Tabs from "../components/Tabs";
import UserList from "../components/UserList";
import useChatStore from "../stores/chat.store";

const ChatPage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="w-full h-full flex">
      {/* User list section */}
      <div className="w-70 bg-slate-800 flex flex-col">
        <ProfileHeader />
        <Tabs />
        <div className="flex-1 overflow-y-auto pb-8">
          <UserList />
        </div>
      </div>

      {/* Messaging section  */}
      <div className="flex-1 flex flex-col h-full bg-slate-900">
        {selectedUser ? (
          <>
            <ChatHeader />
            <div className="flex-1 overflow-y-auto">
              <ChatContainer />
            </div>
            <MessageInputs />
          </>
        ) : (
          <NoChatSelected />
        )}
      </div>
    </div>
  );
};

export default ChatPage;
