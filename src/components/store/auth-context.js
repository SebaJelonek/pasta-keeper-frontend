import React from 'react';

const AuthContext = React.createContext({
  isAdminHandler: () => {},
  logoutHandler: () => {},
  loginHandler: () => {},
  nameSetter: () => {},
  isLogged: false,
  name: '',
  isAdmin: false,
  isBanned: false,
});

export default AuthContext;
