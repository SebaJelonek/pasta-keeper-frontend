import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import Card from '../Layout/Card';
import classes from './Register.module.css';

function Register() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  function passwordValue(e) {
    setPassword(e.target.value);
  }

  function nameValue(e) {
    setName(e.target.value);
  }

  //creating async function in order to send data to backend server
  async function submitInputes(e) {
    e.preventDefault();
    //sending data with fetch to the server "await" is the key here, because we need to obtain "res"ponse
    const res = await fetch(
      'https://pasta-keeper.herokuapp.com/api/user/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          password,
          isAdmin,
        }),
      }
    );
    // awaiting for the "res"ponse.json() and asigning it to the data constans
    // the await is the key here because we need to wait for the response before obtaining it
    const data = await res.json();
    ctx.nameSetter(data.name);

    //checking the response status, if its ok we:
    // reset the name state
    // reset the password state
    // set the error state to false
    // set local item to recived token with name of jwt
    // executing context login handler
    // navigating to home page
    if (data.status === 'ok') {
      setName('');
      setPassword('');
      setError(false);
      window.localStorage.setItem('jwt', data.token);
      ctx.loginHandler();
      navigate('/');

      // if the response data has an object of error and inside it an object of errors
    } else if (data.error.errors) {
      // we are checking if the error.message includes word 'password'
      // if it does
      // we are setting error message to the error message from response
      // we set the error state to true
      // we are setting error state back to false after 5 seconds

      if (data.error.message.includes('password')) {
        setErrorMessage(data.error.errors.password.message);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 5000);
        // else we check if the error.message includes word 'name'
        // if it does
        // we are setting error message to the error message from response
        // we set the error state to true
        // we are setting error state back to false after 5 seconds
      } else if (data.error.message.includes('name')) {
        setErrorMessage(data.error.errors.name.message);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 5000);
      }

      // if there is other error(duplicate name)
      // we set the message error to inform user about error
      // we set the error state to true
      // we are setting error state back to false after 5 seconds
    } else {
      setErrorMessage('This name is already taken, please choose other name!');
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  }

  function isAdminHandler() {
    setIsAdmin(!isAdmin);
  }

  return (
    <Card size={'small'}>
      <form className={classes['register-form']} onSubmit={submitInputes}>
        <label htmlFor='name'>Enter your name</label>
        <input
          type='text'
          name='name'
          id='name'
          placeholder='Name'
          onChange={nameValue}
          value={name}
        />
        <label htmlFor='password'>Enter your password</label>
        <input
          type='password'
          id='password'
          name='password'
          placeholder='Password'
          onChange={passwordValue}
          value={password}
        />
        <label htmlFor='isAdmin'>
          This account is going to be {!isAdmin ? 'user' : 'admin'}. Check box
          below to become {isAdmin ? 'a user' : 'an admin'}
        </label>
        <input
          onChange={isAdminHandler}
          type='checkbox'
          name='isAdmin'
          id='isAdmin'
        />
        <input type='submit' value='Sign up' className={classes.btn} />
      </form>
      <div>{error && <h2>{errorMessage}</h2>}</div>
    </Card>
  );
}

export default Register;
