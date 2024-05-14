import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendImage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation, image } =
    useConversation();

  const sendImage = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("img", image);
      const res = await fetch(
        `/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendImage, loading };
};
export default useSendImage;
