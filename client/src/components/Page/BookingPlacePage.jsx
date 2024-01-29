import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookingDetails } from "../../api/api";

const BookingPlacePage = () => {
  const { id } = useParams();
  const [booking, setBookings] = useState(null);

  //Fetch Booking Details
  const fetchBookingDetails = async (id) => {
    try {
      getBookingDetails(id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBookingDetails(id);
    }
  }, [id]);
  return (
    <>
      <div>{id}</div>
    </>
  );
};

export default BookingPlacePage;
