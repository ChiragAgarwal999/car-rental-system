// context/UserContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  // Load user from cookie on mount
  useEffect(() => {
    const userId = Cookies.get('userId');
    console.log("uuuuuuuuuuu",userId);
    if (userId) {
      axios.get(`/api/users/${userId}`)
        .then((res) =>{
            console.log("klkkk",res)
             setUser(res.data)
    })
        .catch((err) => console.log(err)); // Remove cookie if invalid
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    Cookies.set('userId', userData._id, { expires: 7 }); // expires in 7 days
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('userId');
    router.push('/');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
