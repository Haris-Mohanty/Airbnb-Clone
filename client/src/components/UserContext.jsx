import { createContext } from "react";

export const UserContextProvider = createContext({});

const UserContext = ({ children }) => {
  return { children };
};

export default UserContext;
