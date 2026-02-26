import {
  Loader2Icon,
  LockIcon,
  MailIcon,
  MessageCircleCheckIcon,
} from "lucide-react";
import CustomInput from "../components/CustomInput";
import { useForm } from "../hooks/useForm";
import { Link } from "react-router-dom";
import useAuthStore from "../stores/auth.store";

const SignInPage = () => {
  const { login, loading } = useAuthStore();

  const { formData, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    login({ email: formData.email, password: formData.password });
  };

  return (
    <div className="w-full h-full flex">
      {/* Left Section */}
      <div className="flex-1 h-full border-r border-gray-800 flex items-center justify-center py-5 overflow-auto">
        <div className="w-full space-y-5 px-10">
          {/* Header */}
          <div className="flex flex-col items-center space-y-3">
            <MessageCircleCheckIcon size={150} color="white" />
            <h1 className="text-4xl font-bold">Welcome Back!</h1>
            <p className="text-gray-500 ">Login to access your account</p>
          </div>

          {/* Form Input */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 mb-6">
              <CustomInput
                label="Email"
                type="email"
                placeholder="example@dojo.com"
                id="email"
                Icon={MailIcon}
                value={formData.email}
                onChange={handleChange}
              />
              <CustomInput
                label="Password"
                type="password"
                id="password"
                Icon={LockIcon}
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-blue-500 flex items-center justify-center rounded-md hover:bg-blue-700 transition-all durtion-200 cursor-pointer"
            >
              {!loading ? (
                "Login"
              ) : (
                <Loader2Icon className="h-full text-white animate-spin" />
              )}
            </button>
            <div className="mt-5">
              <p className="text-center">
                Don't have an account?{" "}
                <Link
                  to={"/signup"}
                  className="text-blue-500 hover:text-blue-700 font-semibold transition-colors duration-10 cursor-pointer"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 h-full hidden sm:flex items-center justify-center ">
        <div className="w-[80%]">
          <div className="flex flex-col items-center space-y-2 mb-4">
            <img
              src="/login.png"
              alt="login_image"
              className="w-full object-contain"
            />
            <h2 className="text-xl text-blue-500 font-bold my-5">
              Connect anytime, anywhere.
            </h2>
            <div className="flex items-center space-x-3">
              {["free", "easy setup", "private"].map((i) => (
                <div
                  key={i}
                  className="bg-blue-500/20 px-3 py-1.5 text-xs text-blue-500 font-semibold rounded-full capitalize hover:scale-120 transition-all duration-150"
                >
                  {i}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
