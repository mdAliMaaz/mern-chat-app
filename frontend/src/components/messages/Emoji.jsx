import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { CiFaceSmile } from "react-icons/ci";

const Emoji = ({
  showEmojis,
  setShowEmojis,
  setSelectedEmoji,
  handleEmojiChange,
}) => {
  return (
    <>
      {showEmojis && (
        <div className="absolute left-1 -top-[24rem] custom-emoji-picker w-[200px] h-[200px]">
          <Picker
            data={data}
            onEmojiSelect={(e) => {
              setSelectedEmoji(e.native);
              handleEmojiChange();
            }}
          />
        </div>
      )}
      <div
        className="cursor-pointer"
        onClick={() => setShowEmojis((prev) => !prev)}
      >
        <CiFaceSmile className="size-5" />
      </div>
    </>
  );
};

export default Emoji;
