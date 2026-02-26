import { ImageIcon, Loader2Icon, SendIcon, XIcon } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import useChatStore from "../stores/chat.store";

const MessageInputs = () => {
  const { sendMessage, sendingMessage } = useChatStore();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64 = reader.result as string;
        setImagePreview(base64);
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Image upload error:", error);
    }
  };

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    sendMessage(text, imagePreview);
    setText("");
    setImagePreview("");
  };

  return (
    <div className="w-full py-3 border-t border-gray-800 px-4">
      {/* Image Preview */}
      {imagePreview !== "" && (
        <div className="relative w-25 h-25 border border-gray-700 rounded-sm mb-3">
          <img src={imagePreview} />

          <button
            className="absolute top-1 right-2 w-4 h-4"
            onClick={() => setImagePreview("")}
          >
            <XIcon className="text-gray-500 h-full hover:text-gray-400 cursor-pointer" />
          </button>
        </div>
      )}

      <form
        onSubmit={handleSendMessage}
        className="w-full flex items-center space-x-2"
      >
        <input
          type="text"
          placeholder="Type message here..."
          name="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          autoComplete="off"
          className="flex-1 h-9 bg-slate-800 px-4 rounded-md text-sm"
        />
        <label
          htmlFor="image"
          className="h-9 w-9 bg-slate-800/40 rounded-md cursor-pointer flex items-center justify-center"
        >
          <ImageIcon className="h-full text-gray-500" />

          <input
            type="file"
            id="image"
            accept="/image*"
            name="image"
            onChange={handleFileChange}
            className="hidden"
            disabled={sendingMessage}
          />
        </label>
        <button
          type="submit"
          className="h-9 w-9 bg-blue-500/40 rounded-md cursor-pointer flex items-center justify-center p-2"
          disabled={sendingMessage}
        >
          {!sendingMessage ? (
            <SendIcon className="h-full text-blue-500" />
          ) : (
            <Loader2Icon className="h-full text-blue-500 animate-spin" />
          )}
        </button>
      </form>
    </div>
  );
};

export default MessageInputs;
