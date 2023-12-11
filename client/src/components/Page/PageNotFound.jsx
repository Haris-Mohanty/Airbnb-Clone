import { Link } from "react-router-dom";
const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-gray-500">
          Oops! The page you are looking for does not exist. Please check the
          URL and try again.
        </p>

        <div className="mt-4">
          <Link
            to="/"
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12l5-5 5 5M19 12v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6m14 0l-5 5-5-5"
              />
            </svg>
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
