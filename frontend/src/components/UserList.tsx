import { useEffect } from "react";
import useChatStore from "../stores/chat.store";
import UserCard from "./UserCard";
import UserCardsLoader from "./loaders/UserCardsLoader";

const UserList = () => {
  const {
    activeTab,
    allUsers,
    contacts,
    fetchContacts,
    fetchAllUsers,
    fetchingUsers,
  } = useChatStore();

  useEffect(() => {
    if (activeTab === "contacts") fetchContacts();
    if (activeTab === "all") fetchAllUsers();
  }, [activeTab]);

  if (fetchingUsers) return <UserCardsLoader />;

  return (
    <div className="px-3 space-y-2">
      {activeTab === "all"
        ? allUsers.map((u) => <UserCard user={u} />)
        : activeTab === "contacts" &&
          contacts.map((u) => <UserCard user={u} />)}
    </div>
  );
};

export default UserList;
