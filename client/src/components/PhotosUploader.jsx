import PropTypes from "prop-types";
import { useState } from "react";
import { imageUpload, imageUploadFromDevice } from "../api/api";

const PhotosUploader = ({ addedPhotos, onChange }) => {
  const [photoLink, setPhotoLink] = useState("");

  //********* ADD PHOTO BY LINK *********/
  const addPhotoByLink = async (e) => {
    e.preventDefault();
    try {
      const data = await imageUpload(photoLink);
      const fileName = data.newName;
      onChange((prev) => {
        return [...prev, fileName];
      });
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  //********* UPLOAD PHOTO FROM DEVICE *********/
  const uploadPhoto = async (e) => {
    try {
      const files = e.target.files;

      const formData = new FormData();
      for (const file of files) {
        formData.append("photos", file);
      }
      const data = await imageUploadFromDevice(formData);

      const fileNames = data.uploadedFiles;
      onChange((prev) => {
        return [...prev, ...fileNames];
      });
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  //********* UPLOAD PHOTO FROM DEVICE *********/
  const removePhoto = (e, filename) => {
    e.preventDefault();
    onChange([...addedPhotos.filter((photo) => photo !== filename)]);
  };

  //**** SELECT MAIN PHOTO TO SHOW IN MY ACCOMMODATIONS ****/
  const selectMainPhoto = (e, filename) => {
    e.preventDefault();
    const newAddedPhotos = [
      filename,
      ...addedPhotos.filter((photo) => photo !== filename),
    ];
    onChange(newAddedPhotos);
  };

  return (
    <>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add photos using a link ....jpg"
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
        />
        <button
          onClick={addPhotoByLink}
          className="bg-gray-200 grow px-4 rounded-2xl"
        >
          Add&nbsp;Photo
        </button>
      </div>

      <div className="mt-3 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link, index) => (
            <div key={index} className="h-40 flex relative">
              <img
                className="rounded-2xl w-full object-cover "
                src={"http://localhost:8080/uploads/" + link}
                alt={link}
              />
              <button
                onClick={(e) => removePhoto(e, link)}
                className="absolute bottom-1 right-1 text-white bg-black py-2 px-3 cursor-pointer bg-opacity-50 rounded-2xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
              <button
                onClick={(e) => selectMainPhoto(e, link)}
                className="absolute bottom-1 left-1 text-white bg-black py-2 px-3 cursor-pointer bg-opacity-50 rounded-2xl"
              >
                {link === addedPhotos[0] && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {link !== addedPhotos[0] && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                )}
              </button>
            </div>
          ))}
        <label className="h-40 flex items-center justify-center gap-2 border bg-transparent rounded-2xl p-2 text-2xl text-gray-600 cursor-pointer">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
          Upload
        </label>
      </div>
    </>
  );
};

export default PhotosUploader;

PhotosUploader.propTypes = {
  addedPhotos: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};
