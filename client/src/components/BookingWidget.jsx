import PropTypes from "prop-types";
import { useState } from "react";
import { differenceInCalendarDays } from "date-fns";

const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

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
          Price: ${place.price} / Per night
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
              onChange={(e) => setNumberOfGuests(e.target.value)}
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
        <button className="primary mt-2">
          Book this place
          {numberOfNights > 0 && <span> ${numberOfNights * place.price}</span>}
        </button>
      </div>
    </>
  );
};

export default BookingWidget;

BookingWidget.propTypes = {
  place: PropTypes.shape({
    price: PropTypes.number.isRequired,
  }).isRequired,
};
