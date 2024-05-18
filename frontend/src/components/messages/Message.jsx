import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { useEffect } from "react";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();

  const { socket } = useSocketContext();

  const { messages, selectedConversation, setMessages } = useConversation();

  const fromMe = message.senderId === authUser._id;

  const formattedTime = extractTime(message.createdAt);

  const chatClassName = fromMe ? "chat-end" : "chat-start";

  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;

  const bubbleBgColor = fromMe ? "bg-slate-500" : "";

  const shakeClass = message.shouldShake ? "shake" : "";

  useEffect(() => {
    const lastMessageIsFromOtherUser =
      messages[messages.length - 1]?.senderId !== authUser._id;

    if (lastMessageIsFromOtherUser) {
      socket.emit("messageSeenByUser", {
        userToChatId: selectedConversation._id,
        userId: authUser._id,
      });
    }

    socket.on("messagesSeen", ({ conversationId }) => {
      console.log("messageSeen");
      if (selectedConversation._id === conversationId) {
        setMessages((prev) => {
          const updatedMessages = prev.map((item) => {
            if (!item.seen) {
              return { ...item, seen: true };
            }
            return item;
          });

          return updatedMessages;
        });
      }
    });

    return () => socket.close();
  }, [socket, messages, selectedConversation]);

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      {message.message ? (
        <div
          className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2 relative`}
        >
          {message.message}
          {message.senderId === authUser._id && (
            <IoCheckmarkDoneOutline
              className={`absolute right-0 ${
                message.seen && "text-sky-500"
              } bottom-0.5 size-5 mx-1`}
            />
          )}
        </div>
      ) : (
        <div>
          <img className="rounded-lg size-48" src={message.img} />
        </div>
      )}
      <div className="flex items-center gap-1 text-xs opacity-50 chat-footer">
        {formattedTime}
      </div>
    </div>
  );
};
export default Message;
