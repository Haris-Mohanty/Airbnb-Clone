import { useEffect } from "react";
import { getAllBookingOfUser } from "../../api/api";
import AccountNav from "../AccountNav";

const BookingsPage = () => {
  //Fetch all booking of user
  const fetchBookings = async () => {
    try {
      const { allBookingsOfUser } = await getAllBookingOfUser();
      console.log(allBookingsOfUser);
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
      <div></div>
    </>
  );
};

export default BookingsPage;
