import { useParams } from "react-router-dom";
import { getPlacesById } from "../../api/api";
import { useEffect, useState } from "react";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  //Fetch places from ID
  const fetchPlaceById = async (id) => {
    try {
      const data = await getPlacesById(id);
      setPlace(data.place);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!id) {
      return;
    }

    fetchPlaceById(id);
  }, [id]);

  if (!place) return "";

  return (
    <>
      <div className="mt-5 bg-gray-100 -mx-8 px-8 pt-8">
        <h1 className="text-3xl">{place.title}</h1>
        {/******* ADDRESS ***********/}
        <AddressLink place={place} />

        {/******* SHOW IMAGES ***********/}
        <PlaceGallery place={place} />

        <div className="mt-8 mb-6 gap-8 grid gird-cols-1 md:grid-cols-[2fr_1fr]">
          <div>
            {/********* DESCRIPTION ********/}
            <div className="my-4">
              <h2 className="font-semibold text-2xl mb-1">Description: </h2>
              {place.description}
            </div>
            {/********* CHECKIN, CHECKOUT & MAX GUESTS********/}
            <b>Check-In Time: </b>
            {place.checkIn} <br />
            <b>Check-Out Time: </b>
            {place.checkOut} <br />
            <b>Max no of Guests: </b>
            {place.maxGuests}
          </div>

          {/******** BOOKING ******/}
          <div>
            <BookingWidget place={place} />
          </div>
        </div>

        {/********* EXTRAINFO ********/}
        <div className="bg-white -mx-8 px-8 py-8 border-t">
          <div>
            <h2 className="font-semibold text-2xl">Extra Info: </h2>
          </div>
          <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
            {place.extraInfo}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlacePage;
