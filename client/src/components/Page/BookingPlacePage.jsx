import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookingDetails } from "../../api/api";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import { differenceInCalendarDays, format } from "date-fns";

const BookingPlacePage = () => {
  const { id } = useParams();
  const [bookings, setBookings] = useState(null);

  //Fetch Booking Details
  const fetchBookingDetails = async (id) => {
    try {
      const { booking } = await getBookingDetails(id);
      setBookings(booking);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBookingDetails(id);
    }
  }, [id]);

  if (!bookings) {
    return "";
  }
  return (
    <>
      <div className="my-8">
        <h1 className="text-3xl">{bookings.place.title}</h1>
        {/******** SHOW ADDRESS **********/}
        <AddressLink place={bookings.place} />

        {/******** SHOW DETAILS (CHECK IN, CHECK OUT, NIGHTS & PRICE) **********/}
        <div className="bg-gray-200 p-4 mb-4 rounded-2xl">
          <h2 className="text-xl">Your Booking Information</h2>
          <div className="flex border-gray-300 mt-2 py-2">
            <div className="font-medium mr-4">
              {differenceInCalendarDays(
                new Date(bookings.checkOut),
                new Date(bookings.checkIn)
              )}{" "}
              Nights | Total Price: ₹{bookings.price}
            </div>
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
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
              />
            </svg>
            {format(new Date(bookings.checkIn), "yyyy-MM-dd")} &rarr;{"  "}
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
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
              />
            </svg>
            {format(new Date(bookings.checkOut), "yyyy-MM-dd")}
          </div>
        </div>

        {/******** SHOW PHOTOS **********/}
        <PlaceGallery place={bookings.place} />
      </div>
    </>
  );
};

export default BookingPlacePage;
