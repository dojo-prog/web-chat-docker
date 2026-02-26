import { CameraIcon, Loader2Icon, LogOutIcon } from "lucide-react";
import useAuthStore from "../stores/auth.store";
import { type ChangeEvent } from "react";

const ProfileHeader = () => {
  const { user, logout, loading, updateProfilePicture } = useAuthStore();

  const handleProfileChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64 = reader.result as string;
        updateProfilePicture(base64);
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Image upload error:", error);
    }
  };

  return (
    <div className="w-full h-20 shadow flex items-center px-4 space-x-3">
      <div className="relative w-13 h-13 border-2 border-gray-600 rounded-full group cursor-pointer">
        <img
          src={user?.profileImage.url || "/avatar.png"}
          alt="user_profile"
          className="w-full h-full object-contain"
        />
        <label
          htmlFor="profile-pic"
          className="hidden group-hover:flex items-center justify-center absolute inset-0 rounded-full bg-black/40 cursor-pointer"
        >
          <CameraIcon className="h-full text-gray-300" />

          <input
            type="file"
            id="profile-pic"
            accept="/image*"
            onChange={handleProfileChange}
            className="hidden"
          />
        </label>
        <div className="absolute top-1 right-1 w-3 h-3 bg-green-500 border-2 border-gray-600 rounded-full"></div>
      </div>
      <div className="flex-1">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-sm font-semibold">
            {user?.fname} {user?.lname}
          </h2>
          <button onClick={logout} disabled={loading} className="size-5">
            {!loading ? (
              <LogOutIcon className="h-full text-gray-400 hover:text-gray-500 cursor-pointer" />
            ) : (
              <Loader2Icon className="h-full text-gray-400 animate-spin" />
            )}
          </button>
        </div>
        <p className="text-xs text-gray-400">Online</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
