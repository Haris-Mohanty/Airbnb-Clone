import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate } from "react-router-dom";

const Account = () => {
  const { ready, user } = useContext(UserContext);

  if (!ready) {
    return "Loading....";
  }

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <div>
        <nav>
          <Link to={"/account/bookings"}>My Bookings</Link>
          <Link to={"/account/places"}>My accommodations</Link>
        </nav>
      </div>
    </>
  );
};

export default Account;
