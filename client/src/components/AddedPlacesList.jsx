import { useEffect, useState } from "react";
import { allAddedPlaces } from "../api/api";
import { Link } from "react-router-dom";

const AddedPlacesList = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const data = await allAddedPlaces();
        setPlaces(data.addedPlace);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPlaces();
  }, []);
  return (
    <>
      <div className="mt-4">
        {places.length > 0 &&
          places.map((place, index) => (
            <Link
              key={index}
              to={`/account/places/${place._id}`}
              className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl mb-3"
            >
              <div className="flex w-32 h-32 grow shrink-0">
                {place.photos.length > 0 && (
                  <img
                    className="object-cover"
                    src={"http://localhost:8080/uploads/" + place.photos[0]}
                  />
                )}
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl font-medium">{place.title}</h2>
                <p className="text-sm mt-2">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};

export default AddedPlacesList;
