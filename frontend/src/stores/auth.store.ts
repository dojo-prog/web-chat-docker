import { create } from "zustand";
import axios from "../lib/axios.ts";
import returnMissingFields from "../utils/returnMissingFields.ts";
import { isEmailFormatValid } from "../utils/formatValid.ts";
import { toast, type Id } from "react-toastify";
import { capitalize } from "../utils/capitalize.ts";
import { io, type Socket } from "socket.io-client";

interface User {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  password?: string;
  profileImage: Record<string, string | null>;
  createdAt?: string;
  updatedAt?: string;
}

interface LoginInput {
  email: string;
  password: string;
}

interface SignupInput extends LoginInput {
  fname: string;
  lname: string;
  cpassword: string;
}

interface AuthState {
  user: User | null;
  socket: Socket | null;
  checkingAuth: boolean;
  loading: boolean;
  onlineUsers: string[];

  checkAuth: () => Promise<void>;
  login: (loginCredentials: LoginInput) => Promise<void | Id>;
  signup: (signupCredentials: SignupInput) => Promise<void | Id>;
  logout: () => Promise<void>;
  updateProfilePicture: (image: string) => Promise<void | Id>;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

const BASE_URL = import.meta.env.VITE_SOCKET_URL ?? "http://localhost:5000";

const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  socket: null,
  checkingAuth: false,
  loading: false,
  onlineUsers: [],

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const res = await axios.get("/v1/auth/profile");
      const { user } = res.data;
      set({ user });
    } catch (error) {
      console.error("Error authenticating user: ", error);
    } finally {
      set({ checkingAuth: false });
    }
  },

  login: async (loginCredentials) => {
    const { email, password } = loginCredentials;

    const missing = returnMissingFields({ email, password });
    if (missing.length > 0) {
      return toast.error(
        `Incomplete fields passed. Missing value(s): ${missing.join(", ")}`,
      );
    }

    const n = {
      email: email.toLowerCase().trim(),
    };

    const validEmail = isEmailFormatValid(n.email);
    if (!validEmail) {
      return toast.error(
        "Invalid email format. Please enter a valid email address (e.g., name@example.com)",
      );
    }

    if (password.length < 8) {
      return toast.error("Password must at least be 8 characters long");
    }

    set({ loading: true });
    try {
      const res = await axios.post("/v1/auth/login", {
        email: n.email,
        password,
      });
      const { user } = res.data;

      set({ user });
      get().connectSocket();
      toast.success("Login successful");
    } catch (error: any) {
      toast.error(
        error.response.data.message ||
          "Error signing you in. Please try again.",
      );
      console.error("Error logging in user: ", error);
    } finally {
      set({ loading: false });
    }
  },

  signup: async (signupCredentials) => {
    const { fname, lname, email, password, cpassword } = signupCredentials;

    const missing = returnMissingFields({
      fname,
      lname,
      email,
      password,
      cpassword,
    });
    if (missing.length > 0) {
      return toast.error(
        `Incomplete fields passed. Missing value(s): ${missing.join(", ")}`,
      );
    }

    const n = {
      fname: capitalize(fname),
      lname: capitalize(lname),
      email: email.toLowerCase().trim(),
    };

    const validEmail = isEmailFormatValid(n.email);
    if (!validEmail) {
      return toast.error(
        "Invalid email format. Please enter a valid email address (e.g., name@example.com)",
      );
    }

    if (password.length < 8) {
      return toast.error("Passwords must at least be 8 characters long");
    }

    if (password !== cpassword) {
      return toast.error("Passwords don't match");
    }

    set({ loading: true });
    try {
      const res = await axios.post("/v1/auth/signup", {
        ...signupCredentials,
        ...n,
      });
      const { user } = res.data;

      set({ user });
      get().connectSocket();
      toast.success("Signup successful");
    } catch (error: any) {
      toast.error(
        error.response.data.message ||
          "Error signing you up. Please try again.",
      );
      console.error("Error in signing up user: ", error);
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await axios.post("/v1/auth/logout");
      set({ user: null });
      get().disconnectSocket();
      toast.success("Logout successful");
    } catch (error) {
      toast.error("Error logging you out. Please try again");
      console.error("Error logging out user: ", error);
    }
  },

  updateProfilePicture: async (image) => {
    if (!image) {
      return toast.error("Please select an image");
    }

    set({ loading: true });
    try {
      const res = await axios.patch("/v1/auth/profile-picture", { image });
      const { user } = res.data;
      set({ user });
      toast.success("Profile picture updated");
    } catch (error: any) {
      toast.error(
        error.response.data.message ||
          "Error in updating your profile picture. Please try again.",
      );
      console.error("Error in updating user progile pic: ", error);
    } finally {
      set({ loading: false });
    }
  },

  connectSocket: () => {
    const { user } = get();
    if (!user || get().socket?.connected) return;

    const socket = io(BASE_URL, { withCredentials: true });
    socket.connect();
    set({ socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket?.connected) socket.disconnect();
  },
}));

export default useAuthStore;
