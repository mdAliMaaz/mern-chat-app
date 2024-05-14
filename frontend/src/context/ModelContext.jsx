import { createContext, useContext, useState } from "react";
import useImageUpload from "../hooks/useImageUpload";

const ModelContext = createContext({});

const useModelContext = () => {
  return useContext(ModelContext);
};

function ModelProvider({ children }) {
  const [showModel, setShowModel] = useState(false);
  const { setImg, imgPreview, img, setImgPreview } = useImageUpload();

  return (
    <ModelContext.Provider
      value={{
        showModel,
        setShowModel,
        setImg,
        imgPreview,
        img,
        setImgPreview,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
}

export { ModelProvider, useModelContext };
