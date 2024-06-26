import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import Emoji from "./Emoji";
import ImageUpload from "./ImageUpload";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const [showEmojis, setShowEmojis] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowEmojis(false);
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };

  const handleEmojiChange = (e) => {
    setMessage((prev) => prev + e.native);
  };

  return (
    <form
      className="relative flex items-center justify-between p-1 mx-2 my-3 bg-gray-700 rounded-lg"
      onSubmit={handleSubmit}
    >
      <Emoji
        showEmojis={showEmojis}
        setShowEmojis={setShowEmojis}
        handleEmojiChange={handleEmojiChange}
      />
      <ImageUpload />

      <div className="relative w-full ">
        <input
          type="text"
          className="border-none text-sm focus:outline-none  block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          type="submit"
          className="absolute inset-y-0 flex items-center end-0 pe-3"
        >
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <BsSend />
          )}
        </button>
      </div>
    </form>
  );
};
export default MessageInput;

