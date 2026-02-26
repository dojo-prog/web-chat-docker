import useAuthStore from "../stores/auth.store";

const HomePage = () => {
  const { logout } = useAuthStore();

  return (
    <div>
      HomePage
      <button className="text-white" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default HomePage;
