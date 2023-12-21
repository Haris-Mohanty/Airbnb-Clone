import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getLoginUserDetails } from "../api/api";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!user) {
      getLoginUserDetails()
        .then((data) => {
          setUser(data);
          setReady(true);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);
  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
};

//Missing prop validation
UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
