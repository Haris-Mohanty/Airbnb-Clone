import { useParams } from "react-router-dom";
import { getPlacesById } from "../../api/api";
import { useEffect, useState } from "react";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  //Fetch places from ID
  const fetchPlaceById = async (id) => {
    try {
      const data = await getPlacesById(id);
      setPlace(data.place);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!id) {
      return;
    }

    fetchPlaceById(id);
  }, [id]);

  if (!place) return "";

  return (
    <>
      <div className="mt-8">
        <h1>{place.title}</h1>
      </div>
    </>
  );
};

export default PlacePage;
