import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
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
