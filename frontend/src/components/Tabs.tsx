import useChatStore from "../stores/chat.store";

const tabs = [
  { title: "My Contacts", value: "contacts" },
  { title: "All Users", value: "all" },
];

const Tabs = () => {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="w-full px-4 flex space-x-2 my-5">
      {tabs.map((t) => (
        <button
          onClick={() => setActiveTab(t.value)}
          className={`w-full ${
            activeTab === t.value
              ? "bg-blue-500/20 text-blue-500"
              : "bg-gray-500/20 text-gray-400"
          } text-center font-medium text-sm py-1.5 rounded-md cursor-pointer`}
        >
          {t.title}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
