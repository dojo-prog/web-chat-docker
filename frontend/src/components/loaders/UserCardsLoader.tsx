const UserCardsLoader = () => {
  return (
    <div className="px-3 space-y-2">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="w-full h-16 bg-gray-500/20 animate-pulse rounded-md"
        />
      ))}
    </div>
  );
};

export default UserCardsLoader;
