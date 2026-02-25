import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import MainLayout from "./layouts/MainLayout";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
