import { useEffect, useState } from "react";
import { getAllAddedPlaces } from "../../api/api";
import { Link } from "react-router-dom";

const Home = () => {
  const [places, setPlaces] = useState([]);

  //Fetch all added places
  const fetchAllAddedPlaces = async () => {
    try {
      const data = await getAllAddedPlaces();
      setPlaces([...data.allPlaces]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllAddedPlaces();
  }, []);
  return (
    <>
      <div className="mt-8 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {places.length > 0 &&
          places.map((place, index) => (
            <Link to={"/place/" + place._id} key={index}>
              <div className="bg-gray-500 mb-2 rounded-2xl flex">
                {place.photos?.[0] && (
                  <img
                    className="rounded-2xl object-cover aspect-square"
                    src={"http://localhost:8080/uploads/" + place.photos?.[0]}
                    alt={place}
                  />
                )}
              </div>
              <h2 className="font-bold">{place.address}</h2>
              <h3 className="text-sm text-gray-500">{place.title}</h3>
              <div className="mt-1">
                <span className="font-bold">₹{place.price} per night</span>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};

export default Home;
