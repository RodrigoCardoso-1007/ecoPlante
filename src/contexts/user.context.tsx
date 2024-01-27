import { createContext, useState } from 'react';

interface IUserContext {
  userData: string | null,
  updateUserData: (data: string | null) => void;
}

const UserContext = createContext<IUserContext>({
  userData: null,
  updateUserData: () => { }
});

const UserContextProvider = ({ children }: any) => {
  const [userData, setUserData] = useState<string | null>(localStorage.getItem('userData'))

  function updateUserData(data: string | null) {
    setUserData(data)
  }

  return (
    <UserContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider, UserContext };
