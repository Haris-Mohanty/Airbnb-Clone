import { useEffect, useState } from "react";
import { getAllBookingOfUser } from "../../api/api";
import AccountNav from "../AccountNav";
import { format } from "date-fns";

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
            <div
              key={index}
              className="flex gap-4 bg-gray-200 rounded-xl overflow-hidden mb-2"
            >
              <div className="w-48">
                {booking.place.photos.length > 0 && (
                  <img
                    className="object-cover"
                    src={
                      "http://localhost:8080/uploads/" + booking.place.photos[0]
                    }
                    alt={booking.place.photos[0]}
                  />
                )}
              </div>
              <div className="py-3">
                <h2 className="text-xl">{booking.place.title}</h2>
                {format(new Date(booking.checkIn), "yyyy-MM-dd")} {"->"}{" "}
                {format(new Date(booking.checkOut), "yyyy-MM-dd")}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default BookingsPage;
