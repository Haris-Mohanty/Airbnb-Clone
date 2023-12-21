import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";

const Account = () => {
  const { ready, user } = useContext(UserContext);
  const { subpage } = useParams();

  if (!ready) {
    return "Loading....";
  }

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <div>
        <nav className="w-full flex justify-center mt-6 gap-2">
          <Link className="py-2 px-6 bg-primary text-white rounded-full" to={"/account"}>My Profile</Link>
          <Link className="py-2 px-6" to={"/account/bookings"}>My Bookings</Link>
          <Link className="py-2 px-6 " to={"/account/places"}>My accommodations</Link>
        </nav>
      </div>
    </>
  );
};

export default Account;
