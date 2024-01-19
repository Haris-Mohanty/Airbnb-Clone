import { useParams } from "react-router-dom";
import { getPlacesById } from "../../api/api";

const PlacePage = () => {
  const { id } = useParams();

  const fetchPlaceById = async () => {
    try {
      const data = getPlacesById(id);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="mt-8">
        <h1></h1>
      </div>
    </>
  );
};

export default PlacePage;
