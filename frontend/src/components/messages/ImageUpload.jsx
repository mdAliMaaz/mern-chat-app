import { CiImageOn } from "react-icons/ci";
import { useModelContext } from "../../context/ModelContext";
import useConversation from "../../zustand/useConversation";

const ImageUpload = () => {
  const { setShowModel } = useModelContext();
  const { setImage } = useConversation();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setShowModel(true);
  };

  return (
    <div>
      <input
        onChange={handleImageChange}
        type="file"
        name="img"
        id="image-upload"
        accept="image/*"
        hidden
      />
      <label htmlFor="image-upload" className="cursor-pointer ">
        <CiImageOn className="mx-1 size-5" />
      </label>
    </div>
  );
};

export default ImageUpload;
