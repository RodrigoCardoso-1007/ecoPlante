import { createContext, useState } from 'react';
import IUserModel from '../model/user.model';
import { UserRequest } from '../modules/Network/User';

interface IUserContext {
  userData: IUserModel | null,
  updateUserData: (data: IUserModel | null) => void;
}

const UserContext = createContext<IUserContext>({
  userData: null,
  updateUserData: () => { }
});

const UserContextProvider = ({ children }: any) => {
  const userFromLocal = localStorage.getItem('userData')
  const [userData, setUserData] = useState<IUserModel | null>(userFromLocal ? JSON.parse(userFromLocal) : null)

  function updateUserData(data: IUserModel | null) {
    setUserData(data)

    if (data === null) {
      UserRequest().removeToken();
      localStorage.removeItem('userData')
    } else {
      localStorage.setItem('userData', JSON.stringify(data));
    }
  }

  return (
    <UserContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider, UserContext };
