import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Perks";
import { imageUpload, imageUploadFromDevice } from "../../api/api";

const Places = () => {
  const { action } = useParams();

  //********* STATE ADD *********/
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

  //********* ADD PHOTO BY LINK *********/
  const addPhotoByLink = async (e) => {
    e.preventDefault();
    try {
      const data = await imageUpload(photoLink);
      const fileName = data.newName;
      setAddedPhotos((prev) => {
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

      const fileName = data.uploadedFiles;
      setAddedPhotos((prev) => {
        return [...prev, fileName];
      });
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  //********* FORM SUBMIT || ADD PLACE *********/
  const handleAddNewPlace = (e) => {
    e.preventDefault();
    
  };

  //********* MAKE FORM SORT *********/
  const inputHeader = (text) => {
    return <h2 className="text-2xl font-medium mt-4">{text}</h2>;
  };
  const inputDesc = (desc) => {
    return <p className="text-gray-500 text-sm">{desc}</p>;
  };
  const preInput = (header, desc) => {
    return (
      <>
        {inputHeader(header)}
        {inputDesc(desc)}
      </>
    );
  };

  return (
    <>
      {/**** WHEN CLICK ON ADD NEW PLACE BUTTON, THE BUTTON IS HIDE ****/}
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new Place
          </Link>
        </div>
      )}

      {/********** FORM TO ADD NEW PLACE AND DETAILS *********/}
      {action === "new" && (
        <div className="p-8">
          <form onSubmit={handleAddNewPlace}>
            {preInput(
              "Title",
              "Title for your place, should be short and catchy as in advertisement"
            )}
            <input
              type="text"
              placeholder="Title, for ex: My Lovely apt"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {preInput("Address", "Address to this place")}
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            {preInput("Photos", "more = better")}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add photos using a link ....jpg"
                value={photoLink}
                onChange={(e) => setPhotLink(e.target.value)}
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
                  <div key={index} className="h-40 flex">
                    <img
                      className="rounded-2xl w-full object-cover "
                      src={"http://localhost:8080/uploads/" + link}
                      alt={link}
                    />
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

            {preInput("Description", "Description of the place")}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {preInput("Perks", "Select all the perks of your place")}
            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <Perks selected={perks} onChange={setPerks} />
            </div>

            {preInput("Extra Info", "House rules, etc...")}
            <textarea
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
            />

            {preInput(
              "Check in&out times",
              "Add check in and out times, remember to have some time window for cleaning the room between guests"
            )}
            <div className="grid gap-2 sm:grid-cols-3">
              <div>
                <h3 className="mt-2 font-medium -mb-1">Check In time </h3>
                <input
                  type="text"
                  placeholder="ex 14:00"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>
              <div>
                <h3 className="mt-2 font-medium -mb-1">Check Out time </h3>
                <input
                  type="text"
                  placeholder="ex 11:00"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>
              <div>
                <h3 className="mt-2 font-medium -mb-1">Max number of guests</h3>
                <input
                  type="number"
                  placeholder="ex 2 or 3..."
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                />
              </div>
            </div>

            <button className="primary my-4">Save</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Places;
