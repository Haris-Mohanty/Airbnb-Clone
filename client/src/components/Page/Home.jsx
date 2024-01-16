import { useEffect, useState } from "react";
import { getAllAddedPlaces } from "../../api/api";

const Home = () => {
  const [places, setPlaces] = useState([]);

  //Fetch all added places
  const fetchAllAddedPlaces = async () => {
    try {
      const data = await getAllAddedPlaces();
      setPlaces(data.allPlaces);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllAddedPlaces();
  }, []);
  return (
    <>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {places.length > 0 &&
          places.map((place, index) => (
            <div key={index}>
              <div className="bg-gray-500 rounded-2xl flex">
                {place.photos?.[0] && (
                  <img
                    className="rounded-2xl object-cover aspect-square"
                    src={"http://localhost:8080/uploads/" + place.photos?.[0]}
                    alt={place}
                  />
                )}
              </div>
              {place.title}
            </div>
          ))}
      </div>
    </>
  );
};

export default Home;
