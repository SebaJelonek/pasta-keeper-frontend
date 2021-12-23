import { useState, useEffect } from 'react';
import Nav from './components/Layout/Nav';
import jwt from 'jsonwebtoken';
import AuthContext from './components/store/auth-context';

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [userName, setUserName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isBanned, setIsBanned] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      setIsLogged(true);
      setIsBanned(jwt.decode(token).isBanned);
      setIsAdmin(jwt.decode(token).isAdmin);
      setUserName(jwt.decode(token).id);
    } else {
      setIsLogged(false);
    }
  }, []);

  function nameSetter(name) {
    setUserName(name);
  }

  function loginHandler() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      console.log('token');
      console.log(jwt.decode(token));
      setIsLogged(true);
      setIsAdmin(jwt.decode(token).isAdmin);
      setUserName(jwt.decode(token).id);
      setIsBanned(jwt.decode(token).isBanned);
    }
  }

  function logoutHandler() {
    setIsLogged(false);
    setUserName(null);
    setIsAdmin(false);
    setIsBanned(false);
    window.localStorage.removeItem('jwt');
  }

  return (
    <AuthContext.Provider
      value={{
        logoutHandler,
        loginHandler,
        nameSetter,
        isLogged,
        name: userName,
        isAdmin,
        isBanned,
      }}
    >
      <Nav />
    </AuthContext.Provider>
  );
}

export default App;
