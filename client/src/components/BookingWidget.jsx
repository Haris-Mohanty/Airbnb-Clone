import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { bookingPlace } from "../api/api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const BookingWidget = ({ place }) => {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  const { user } = useContext(UserContext);
  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  const maxGuests = place.maxGuests;

  // Booking Place
  const bookThisPlace = async () => {
    const data = {
      place: place._id,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      mobile,
      price: numberOfNights * place.price,
    };
    try {
      const { booking } = await bookingPlace(data);
      const bookingId = booking._id;
      navigate(`/account/bookings/${bookingId}`);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  return (
    <>
      <div className="bg-white shadow p-4 rounded-2xl">
        <div className="text-xl font-semibold text-center mb-3">
          Price: ₹{place.price} / Per night
        </div>
        <div className="border rounded-2xl">
          <div className="flex">
            <div className="py-3 px-4">
              <label>Check In: </label>
              <input
                type="date"
                className="cursor-pointer"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div className="py-3 px-4 border-l">
              <label>Check Out: </label>
              <input
                type="date"
                className="cursor-pointer"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
          </div>
          <div className="py-3 px-4 border-t">
            <label>Number of Guests: </label>
            <input
              type="number"
              className="cursor-pointer"
              value={numberOfGuests}
              onChange={(e) => {
                const newValue = Math.min(
                  Math.max(parseInt(e.target.value) || 1, 1),
                  maxGuests
                );
                setNumberOfGuests(newValue);
              }}
            />
          </div>

          {/****** USER DETAILS *****/}
          {numberOfNights > 0 && (
            <div className="py-3 px-4 border-t">
              <label>Full Name: </label>
              <input
                type="text"
                className="cursor-pointer"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label>Mobile No: </label>
              <input
                type="tel"
                className="cursor-pointer"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
          )}
        </div>
        <button onClick={bookThisPlace} className="primary mt-2">
          Book this place
          {numberOfNights > 0 && <span> ₹{numberOfNights * place.price}</span>}
        </button>
      </div>
    </>
  );
};

export default BookingWidget;

BookingWidget.propTypes = {
  place: PropTypes.shape({
    price: PropTypes.number.isRequired,
    maxGuests: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
  }).isRequired,
};
