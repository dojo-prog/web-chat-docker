import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ChatPage from "./pages/ChatPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import MainLayout from "./layouts/MainLayout";
import useAuthStore from "./stores/auth.store";
import { useEffect } from "react";
import PageLoader from "./components/loaders/PageLoader";

const App = () => {
  const { checkAuth, checkingAuth, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) return <PageLoader />;

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={user ? <ChatPage /> : <Navigate to={"/signin"} />}
          />
          <Route
            path="/signin"
            element={!user ? <SignInPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/signup"
            element={!user ? <SignUpPage /> : <Navigate to={"/"} />}
          />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
