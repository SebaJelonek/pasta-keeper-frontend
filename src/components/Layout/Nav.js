import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../store/auth-context';
import Home from '../Pages/Home';
import UserPaste from '../Pages/UserPaste';
import New from '../Pages/New';
import Register from '../Pages/Register';
import MyLink from './MyLink';
import Login from '../Pages/Login';
import ShowUsers from '../Pages/ShowUsers';
import Disabled from '../Pages/Disabled';
import classes from './Nav.module.css';

function Nav() {
  const { isLogged, name, isAdmin, isBanned } = useContext(AuthContext);

  const navLinks = {
    logoutLink: (
      <li className={classes['nav-element']}>
        <MyLink className={classes['nav-element__link']}>Logout</MyLink>
        <hr />
      </li>
    ),
    registerLink: (
      <li className={classes['nav-element']}>
        <Link className={classes['nav-element__link']} to='/register'>
          Register
        </Link>
        <hr />
      </li>
    ),
    homeLink: (
      <li className={classes['nav-element']}>
        <Link className={classes['nav-element__link']} to='/'>
          Home
        </Link>
        <hr />
      </li>
    ),
    userPasteLink: (
      <li className={classes['nav-element']}>
        <Link className={classes['nav-element__link']} to='/user-paste'>
          User Paste
        </Link>
        <hr />
      </li>
    ),
    newPasteLink: (
      <li className={classes['nav-element']}>
        <Link className={classes['nav-element__link']} to='/new'>
          New
        </Link>

        <hr />
      </li>
    ),
    loginLink: (
      <li className={classes['nav-element']}>
        <Link className={classes['nav-element__link']} to='/login'>
          Login
        </Link>

        <hr />
      </li>
    ),
    adminShowUsersLink: isAdmin && (
      <li className={classes['nav-element']}>
        <Link className={classes['nav-element__link']} to='/show-users'>
          Users
        </Link>

        <hr />
      </li>
    ),
  };

  return (
    <Router>
      <div className={classes['navigation-bar__color']}>
        {name && <h1 className={classes.name}>Hello {name}</h1>}
        <nav className={classes['navigation-bar']}>
          <h1>Pasta Keeper</h1>
          <ul className={classes['nav-list']}>
            {isLogged ? navLinks.logoutLink : navLinks.registerLink}
            {isLogged && navLinks.newPasteLink}
            {!isLogged && navLinks.loginLink}
            {isLogged && navLinks.userPasteLink}
            {navLinks.homeLink}
            {isAdmin && navLinks.adminShowUsersLink}
          </ul>
        </nav>
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/user-paste'
          element={
            isBanned ? (
              <Disabled reason={'You are banned'} />
            ) : isLogged ? (
              <UserPaste />
            ) : (
              <Disabled reason={'You are not logged in'} />
            )
          }
        />
        <Route
          path='/new'
          element={
            isBanned ? (
              <Disabled reason={'You are banned'} />
            ) : isLogged ? (
              <New />
            ) : (
              <Login reason={'You have to login in order to create a paste'} />
            )
          }
        />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/show-users'
          element={
            isBanned ? (
              <Disabled reason={'You are banned'} />
            ) : !isLogged ? (
              <Login reason={'You are not logged in'} />
            ) : isAdmin ? (
              <ShowUsers />
            ) : (
              <Disabled reason={'You are not an admin'} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default Nav;
