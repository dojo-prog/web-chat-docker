import { create } from "zustand";
import type { User } from "./auth.store";
import axios from "../lib/axios";
import { toast, type Id } from "react-toastify";
import useAuthStore from "./auth.store";

interface Message {
  _id: string;
  senderId: string | undefined;
  receiverId: string | undefined;
  text?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ChatState {
  messages: Message[];
  allUsers: User[];
  contacts: User[];
  selectedUser: User | null;
  activeTab: string;

  loadingMessages: boolean;
  fetchingUsers: boolean;
  sendingMessage: boolean;

  fetchMessagesByUserId: () => Promise<void>;
  fetchAllUsers: () => Promise<void>;
  fetchContacts: () => Promise<void>;
  sendMessage: (text: string, image: string) => Promise<void | Id>;

  setSelectedUser: (user: User | null) => void;
  setActiveTab: (tab: string) => void;

  subscribeToMessages: () => void;
  unsubscribeToMessages: () => void;
}

const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  allUsers: [],
  contacts: [],
  selectedUser: null,
  activeTab: "all",
  loadingMessages: false,
  fetchingUsers: false,
  sendingMessage: false,

  fetchMessagesByUserId: async () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    set({ loadingMessages: true });
    try {
      const res = await axios.get(`/v1/messages/${selectedUser?._id}`);
      const { messages } = res.data;

      set({ messages });
    } catch (error) {
      toast.error(
        "Error fetching messages with this user. Please refresh and try again",
      );
      console.error("Error fetching messages: ", error);
    } finally {
      set({ loadingMessages: false });
    }
  },

  fetchAllUsers: async () => {
    set({ fetchingUsers: true });
    try {
      const res = await axios.get("/v1/messages");
      const { users } = res.data;

      set({ allUsers: users });
    } catch (error) {
      toast.error("Error fetching users list. Please refresh and try again.");
      console.error("Error fetching all users:", error);
    } finally {
      set({ fetchingUsers: false });
    }
  },

  fetchContacts: async () => {
    set({ fetchingUsers: true });
    try {
      const res = await axios.get("/v1/messages/contacts");
      const { users } = res.data;

      set({ contacts: users });
    } catch (error) {
      toast.error(
        "Error in fetching contact list. Please refresh and try again.",
      );
      console.error("Error in fetching user contacts:", error);
    } finally {
      set({ fetchingUsers: false });
    }
  },

  sendMessage: async (text, image) => {
    const { selectedUser, messages } = get();
    const { user } = useAuthStore.getState();
    if (!selectedUser) return;

    if (!text && !image) {
      return toast.error("Please provide contents to your message.");
    }

    const optMessage = {
      _id: `temp-${Date.now()}`,
      senderId: user?._id.toString(),
      receiverId: selectedUser._id.toString(),
      text,
      image,
      createdAt: new Date().toISOString(),
    };
    set({ messages: [...messages, optMessage] });

    set({ sendingMessage: true });
    try {
      const res = await axios.post(`/v1/messages/${selectedUser?._id}`);
      const { newMessage } = res.data;

      set({ messages: messages.concat(newMessage) });
      toast.success("Message sent");
    } catch (error) {
      set({ messages });
      toast.error("Error in sending your message. Please try again.");
      console.error("Error in user sending message: ", error);
    } finally {
      set({ sendingMessage: false });
    }
  },

  setSelectedUser: (user) => set({ selectedUser: user }),
  setActiveTab: (tab) => set({ activeTab: tab }),

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const { socket } = useAuthStore.getState();

    socket?.on("newMessage", (newMessage) => {
      set((state) => ({
        messages: [...state.messages, newMessage],
      }));
    });
  },

  unsubscribeToMessages: () => {
    const { socket } = useAuthStore.getState();
    socket?.off("newMessage");
  },
}));

export default useChatStore;
