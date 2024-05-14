import { useState } from "react";

const useImageUpload = () => {
  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState("");

  if (img) {
    handleImgPreview(img);
  }

  function handleImgPreview(img) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImgPreview(reader.result);
    };
    reader.readAsDataURL(img);
  }

  return { setImg, img, imgPreview, setImgPreview };
};

export default useImageUpload;
