import { MessageCircleIcon } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-10 text-center space-y-4">
      <div className="size-40 bg-blue-500/10 rounded-full flex items-center justify-center">
        <MessageCircleIcon className="size-20 text-blue-500" />
      </div>
      <div>
        <h2 className="text-4xl text-slate-200 font-bold italic mb-3">
          No Chat Room Selected
        </h2>
        <p className="max-w-sm text-slate-400 px-10">
          Start a new chat by selecting a user from the contacts or all users
          tab.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
