import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookingDetails } from "../../api/api";

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
      <div>{bookings.checkIn}</div>
    </>
  );
};

export default BookingPlacePage;
