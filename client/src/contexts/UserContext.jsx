import React, { createContext, useState } from "react";

const UserContext = createContext();
export default UserContext;

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);

  const login = (newUser) => {
    setUser(newUser.user);
    localStorage.setItem('token', newUser.accessToken);
    localStorage.setItem('user', JSON.stringify(newUser.user));
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  const stateValues = {
    user,
    setUser,
    login,
    logout,
  };

  return (
    <UserContext.Provider value={stateValues}>
      {children}
    </UserContext.Provider>
  );
};

export function useAuth() {
  return React.useContext(UserContext);
};