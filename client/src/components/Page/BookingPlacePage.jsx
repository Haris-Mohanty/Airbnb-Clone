import { useParams } from "react-router-dom";

const BookingPlacePage = () => {
  const { id } = useParams();
  return (
    <>
      <div>{id}</div>
    </>
  );
};

export default BookingPlacePage;
