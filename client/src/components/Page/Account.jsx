import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import Places from "./Places";
import AccountNav from "../AccountNav";

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

  //Redirect to homepage after logout
  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <>
      <AccountNav />
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
