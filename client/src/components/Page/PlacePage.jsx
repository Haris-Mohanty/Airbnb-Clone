import { useParams } from "react-router-dom";
import { getPlacesById } from "../../api/api";
import { useEffect } from "react";

const PlacePage = () => {
  const { id } = useParams();

  //Fetch places from ID
  const fetchPlaceById = async (id) => {
    try {
      const data = await getPlacesById(id);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPlaceById(id);
  }, []);

  return (
    <>
      <div className="mt-8">
        <h1></h1>
      </div>
    </>
  );
};

export default PlacePage;
