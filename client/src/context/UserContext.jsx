import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user] = useState(null);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};
