import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import Card from '../Layout/Card';
import classes from './Login.module.css';

function LoginPage({ reason }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [error, setError] = useState(false);
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  async function submitInputes(e) {
    e.preventDefault();
    const res = await fetch(
      'https://pasta-keeper.herokuapp.com/api/user/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          password,
        }),
      }
    );

    const data = await res.json();
    ctx.nameSetter(data.name);
    if (data.error) {
      setError(true);
      setErrorMessage(data.error);
      setTimeout(() => {
        setError(false);
        setName('');
        setPassword('');
      }, 2000);
    } else {
      setName('');
      setPassword('');
      setError(false);
      window.localStorage.setItem('jwt', data.token);
      ctx.nameSetter(data.name);
      ctx.loginHandler();
      navigate('/');
    }
  }

  function nameValue(e) {
    setName(e.target.value);
  }

  function passwordValue(e) {
    setPassword(e.target.value);
  }

  return (
    <div className={classes.container}>
      <h2>{reason}</h2>
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
          <input type='submit' value='Sign in' className={classes.btn} />
        </form>
        <div>{error && <h2>{errorMessage}</h2>}</div>
      </Card>
    </div>
  );
}

export default LoginPage;
