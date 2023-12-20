import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getLoginUserDetails } from "../api/api";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      getLoginUserDetails()
        .then((data) => setUser(data))
        .catch((err) => console.log(err));
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

//Missing prop validation
UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
