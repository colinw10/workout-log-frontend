import { createContext, useState } from 'react';

const UserContext = createContext();

// Helper function to get user from token
const getUser = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  return JSON.parse(atob(token.split('.')[1])).payload;
};

function UserProvider({ children }) {
  const [user, setUser] = useState(getUser());

  const value = { user, setUser };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };