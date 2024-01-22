import PropTypes from "prop-types";

const BookingWidget = ({ place }) => {
  return (
    <>
      <div className="bg-white shadow p-4 rounded-2xl">
        <div className="text-xl font-semibold text-center mb-3">
          Price: ${place.price} / Per night
        </div>
        <div className="border rounded-2xl">
          <div className="flex">
            <div className="py-3 px-4">
              <label htmlFor="">Check In: </label>
              <input type="date" className="cursor-pointer" name="" id="" />
            </div>
            <div className="py-3 px-4 border-l">
              <label htmlFor="">Check Out: </label>
              <input type="date" className="cursor-pointer" name="" id="" />
            </div>
          </div>
          <div className="py-3 px-4 border-t">
            <label htmlFor="">Number of Guests: </label>
            <input
              type="number"
              className="cursor-pointer"
              value={1}
              name=""
              id=""
            />
          </div>
        </div>
        <button className="primary mt-2">Book this place</button>
      </div>
    </>
  );
};

export default BookingWidget;

BookingWidget.propTypes = {
  place: PropTypes.string.isRequired,
};
