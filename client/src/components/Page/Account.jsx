import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import Places from "./Places";

const Account = () => {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  //Logout
  const logout = async () => {
    await axios.post("/user/logout");
    setRedirect("/");
    setUser(null);
  };

  if (!ready) {
    return "Loading....";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  function linkClasses(type = null) {
    let classes = "py-2 px-6";
    if (type === subpage) {
      classes += ` bg-primary text-white rounded-full`;
    }
    return classes;
  }

  //Redirect to homepage after logout
  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <>
      <nav className="w-full flex justify-center mt-6 gap-2 mb-7">
        <Link className={linkClasses("profile")} to={"/account"}>
          My Profile
        </Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}>
          My Bookings
        </Link>
        <Link className={linkClasses("places")} to={"/account/places"}>
          My accommodations
        </Link>
      </nav>

      {/************ SHOW PROFILE DETAILS **********/}
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email}) <br />
          <button onClick={logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      )}

      {/************** SHOW PLACES DETAILS ************/}
      {subpage === "places" && (
        <div>
          <Places />
        </div>
      )}
    </>
  );
};

export default Account;
