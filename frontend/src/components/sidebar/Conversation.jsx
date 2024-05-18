import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import { MdPhotoCamera } from "react-icons/md";

const Conversation = ({ conversation, lastIdx, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;

  const { onlineUsers } = useSocketContext();

  const isOnline = onlineUsers.includes(conversation._id);

  function isValidURL(string) {
    const regex =
      /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/;
    return regex.test(string);
  }

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex justify-between gap-3">
            <p className="font-bold text-gray-200">{conversation.fullName}</p>
            <span className="text-xl">{emoji}</span>
          </div>
          {conversation?.lastMessage && (
            <span>
              {isValidURL(conversation?.lastMessage) ? (
                <MdPhotoCamera />
              ) : (
                conversation?.lastMessage
              )}
            </span>
          )}
        </div>
      </div>

      {!lastIdx && <div className="h-1 py-0 my-0 divider" />}
    </>
  );
};
export default Conversation;


