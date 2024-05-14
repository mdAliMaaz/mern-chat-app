import { MdCancel } from "react-icons/md";
import { useModelContext } from "../../context/ModelContext";
import useSendImage from "../../hooks/useSendImage";

const ImagePreviewModel = () => {
  const { showModel, setShowModel, imgPreview, setImg, setImgPreview } =
    useModelContext();

  const { sendImage, loading } = useSendImage();
  if (!showModel) {
    return;
  }

  function handleCancle() {
    setShowModel(false);
    setImg(null);
    setImgPreview("");
  }

  async function handleSubmit() {
    await sendImage();
  }
  return (
    <>
      {imgPreview && (
        <div className="absolute z-50 flex items-center justify-center w-screen h-screen px-10 bg-black/50">
          <div className="relative w-full rounded-lg md:w-1/2 h-1/2 ">
            <MdCancel
              className="absolute z-50 cursor-pointer size-8 right-1"
              onClick={handleCancle}
            />
            <div className="absolute w-full h-full  m-4 transform -translate-x-1/2 -translate-y-1/2   top-[40%] left-1/2">
              <img
                src={imgPreview}
                alt="chat-img"
                className="object-cover w-full h-full rounded-lg"
              />
              <button
                onClick={handleSubmit}
                className="block w-full p-2.5 my-2 text-white bg-gray-700 border-gray-600 rounded-lg "
              >
                {loading ? (
                  <div className="loading loading-spinner"></div>
                ) : (
                  "Send"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImagePreviewModel;
