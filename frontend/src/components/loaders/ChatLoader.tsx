const ChatLoader = () => {
  return (
    <div className="w-full px-5 py-4 space-y-3">
      <div className={`w-full flex justify-start`}>
        <div
          className={`px-4 py-2 w-35 h-10 bg-gray-800 rounded-xl animate-pulse`}
        />
      </div>
      <div className={`w-full flex justify-start`}>
        <div
          className={`px-4 py-2 w-50 h-20 bg-gray-800 rounded-xl animate-pulse`}
        />
      </div>
      <div className={`w-full flex justify-end`}>
        <div
          className={`px-4 py-2 w-40 h-10 bg-blue-800/50 rounded-xl animate-pulse`}
        />
      </div>
      <div className={`w-full flex justify-end`}>
        <div
          className={`px-4 py-2 w-30 h-10 bg-blue-800/50 rounded-xl animate-pulse`}
        />
      </div>
      <div className={`w-full flex justify-start`}>
        <div
          className={`px-4 py-2 w-40 h-10 bg-gray-800 rounded-xl animate-pulse`}
        />
      </div>
      <div className={`w-full flex justify-start`}>
        <div
          className={`px-4 py-2 w-50 h-10 bg-gray-800 rounded-xl animate-pulse`}
        />
      </div>
      <div className={`w-full flex justify-end`}>
        <div
          className={`px-4 py-2 w-50 h-10 bg-blue-800/50 rounded-xl animate-pulse`}
        />
      </div>
    </div>
  );
};

export default ChatLoader;
