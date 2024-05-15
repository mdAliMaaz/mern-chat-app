import { useState } from "react";
import useConversation from "../zustand/useConversation";

const useImageUpload = () => {
  const {  image } = useConversation();
  const [imgPreview, setImgPreview] = useState("");

  if (image) {
    handleImgPreview(image);
  }
  function handleImgPreview(image) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImgPreview(reader.result);
    };
    reader.readAsDataURL(image);
  }

  return { imgPreview, setImgPreview };
};

export default useImageUpload;
