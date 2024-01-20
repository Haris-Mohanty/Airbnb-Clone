import { useParams } from "react-router-dom";
import { getPlacesById } from "../../api/api";
import { useEffect, useState } from "react";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

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

  // Show all Photos
  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-white min-h-screen">
        <div className="p-8 grid gap-4">
          <div>
            <h2 className="text-3xl">Photos of {place.title}</h2>
            <button className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-xl shadow shadow-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
              Close Photos
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo, index) => (
              <div key={index}>
                <img
                  src={"http://localhost:8080/uploads/" + photo}
                  alt={photo}
                  className="rounded-md"
                />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mt-5 bg-gray-100 -mx-8 px-8 py-8">
        <h1 className="text-3xl">{place.title}</h1>
        <a
          className="block font-semibold underline my-2"
          href={"https://maps.google.com/?q=" + place.address}
          rel="noreferrer"
          target="_blank"
        >
          {place.address}
        </a>

        {/******* SHOW IMAGES ***********/}
        <div className="relative">
          <div className="grid gap-2 grid-cols-[2fr_1fr]">
            <div>
              {place.photos?.[0] && (
                <div>
                  <img
                    src={"http://localhost:8080/uploads/" + place.photos[0]}
                    alt={place.photos[0]}
                    className="aspect-square object-cover rounded-md"
                  />
                </div>
              )}
            </div>
            <div className="grid">
              {place.photos?.[1] && (
                <img
                  src={"http://localhost:8080/uploads/" + place.photos[1]}
                  alt={place.photos[1]}
                  className="aspect-square object-cover rounded-md"
                />
              )}
              <div className="overflow-hidden">
                {place.photos?.[2] && (
                  <img
                    src={"http://localhost:8080/uploads/" + place.photos[2]}
                    alt={place.photos[2]}
                    className="aspect-square object-cover relative top-2 rounded-md"
                  />
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowAllPhotos(true)}
            className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            Show more photos
          </button>
        </div>
      </div>
    </>
  );
};

export default PlacePage;
