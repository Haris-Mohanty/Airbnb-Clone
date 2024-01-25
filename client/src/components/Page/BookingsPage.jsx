import { useEffect, useState } from "react";
import { getAllBookingOfUser } from "../../api/api";
import AccountNav from "../AccountNav";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  //Fetch all booking of user
  const fetchBookings = async () => {
    try {
      const { allBookingsOfUser } = await getAllBookingOfUser();
      setBookings(allBookingsOfUser);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);
  return (
    <>
      <AccountNav />
      <div>
        {bookings?.length > 0 &&
          bookings.map((booking, index) => (
            <div key={index}>
              {booking.checkIn} {"->"} {booking.checkOut}
            </div>
          ))}
      </div>
    </>
  );
};

export default BookingsPage;
