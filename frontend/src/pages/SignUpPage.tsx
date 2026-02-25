import { LockIcon, MailIcon, UserCheck2Icon, UserIcon } from "lucide-react";
import { useForm } from "../hooks/useForm";
import CustomInput from "../component/CustomInput";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const { formData, handleChange } = useForm({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
  });

  return (
    <div className="w-full h-full flex">
      {/* Left Section */}
      <div className="flex-1 h-full border-r border-gray-800 flex items-center justify-center">
        <div className="w-full space-y-5 px-10">
          {/* Header */}
          <div className="flex flex-col items-center space-y-3">
            <UserCheck2Icon size={100} color="white" />
            <h1 className="text-4xl font-bold">Create an Account!</h1>
            <p className="text-gray-500 ">Sign up to access chat up</p>
          </div>

          {/* Form Input */}
          <form onSubmit={() => {}}>
            <div className="space-y-4 mb-6">
              <div className="flex space-x-3">
                <CustomInput
                  label="First Name"
                  placeholder="John"
                  id="fname"
                  Icon={UserIcon}
                  value={formData.fname}
                  onChange={handleChange}
                />
                <CustomInput
                  label="Last Name"
                  placeholder="Doe"
                  id="lname"
                  Icon={UserIcon}
                  value={formData.lname}
                  onChange={handleChange}
                />
              </div>
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
              <CustomInput
                label="Confirm Password"
                type="password"
                id="cpassword"
                Icon={LockIcon}
                value={formData.cpassword}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-blue-500 flex items-center justify-center rounded-md hover:bg-blue-700 transition-all durtion-200 cursor-pointer"
            >
              Signup
            </button>
            <div className="mt-5">
              <p className="text-center">
                Already have an account?{" "}
                <Link
                  to={"/signin"}
                  className="text-blue-500 hover:text-blue-700 font-semibold transition-colors duration-10 cursor-pointer"
                >
                  Sign In
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
              src="/signup.png"
              alt="signup_image"
              className="w-full object-contain"
            />
            <h2 className="text-xl text-blue-500 font-bold my-5">
              Connect anytime, anywhere.
            </h2>
            <div className="flex items-center space-x-3">
              {["free", "easy setup", "private"].map((i) => (
                <div className="bg-blue-500/20 px-3 py-1.5 text-xs text-blue-500 font-semibold rounded-full capitalize hover:scale-120 transition-all duration-150">
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

export default SignUpPage;
