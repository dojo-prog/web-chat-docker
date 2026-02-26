import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="h-screen w-screen bg-linear-to-t from-blue-500 to-black flex items-center justify-center px-5">
      <div className="max-w-5xl w-full h-[90vh] bg-slate-900 rounded-xl text-white overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
