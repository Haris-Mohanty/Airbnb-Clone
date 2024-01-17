import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addNewPlace, getPlacesById, updatePlace } from "../api/api";
import Perks from "./Perks";
import PhotosUploader from "./PhotosUploader";
import AccountNav from "./AccountNav";

const PlacesForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  //********* STATE ADD *********/
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);

  //Edit
  const fetchPlaces = async (id) => {
    try {
      const { place } = await getPlacesById(id);

      //Set input field to these data
      setTitle(place.title);
      setAddress(place.address);
      setAddedPhotos(place.photos);
      setDescription(place.description);
      setPerks(place.perks);
      setExtraInfo(place.extraInfo);
      setCheckIn(place.checkIn);
      setCheckOut(place.checkOut);
      setMaxGuests(place.maxGuests);
      setPrice(place.price);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (!id) {
      return;
    }
    fetchPlaces(id);
  }, [id]);

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

  //********* FORM SUBMIT || ADD PLACE *********/
  const handleAddNewPlace = async (e) => {
    e.preventDefault();

    const data = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price
    };

    if (id) {
      //update place
      try {
        await updatePlace(id, data);
        navigate("/account/places");
      } catch (err) {
        alert(err.response.data.message);
      }
    } else {
      //new place
      try {
        await addNewPlace(data);
        navigate("/account/places");
      } catch (err) {
        alert(err.response.data.message);
      }
    }
  };

  return (
    <>
      <AccountNav />
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
          <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

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
          <div className="grid gap-2 sm:grid-cols-3 md:grid-cols-4">
            <div>
              <h3 className="mt-2 font-medium -mb-1">Check In time </h3>
              <input
                type="number"
                placeholder="ex 14"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div>
              <h3 className="mt-2 font-medium -mb-1">Check Out time </h3>
              <input
                type="number"
                placeholder="ex 11"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
            <div>
              <h3 className="mt-2 font-medium -mb-1">Max number of guests</h3>
              <input
                type="number"
                value={maxGuests}
                onChange={(e) => setMaxGuests(e.target.value)}
              />
            </div>
            <div>
              <h3 className="mt-2 font-medium -mb-1">Price per Night</h3>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <button className="primary my-4">Save</button>
        </form>
      </div>
    </>
  );
};

export default PlacesForm;
