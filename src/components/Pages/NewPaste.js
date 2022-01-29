import { useState, useContext } from 'react';
import AuthContext from '../store/auth-context';
import Card from '../Layout/Card';
import classes from './NewPaste.module.css';

function New() {
  const [pasteTitle, setPasteTitle] = useState('');
  const [pasteBody, setPasteBody] = useState('');
  const [isCreated, setIsCreated] = useState(false);
  const [message, setMessage] = useState('');
  const ctx = useContext(AuthContext);

  const myTimeout = () => {
    setTimeout(() => {
      setMessage('');
      setIsCreated(false);
    }, 3500);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const name = ctx.name;

    const res = await fetch(
      'https://pasta-keeper.herokuapp.com/api/user/new-paste',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          pasteTitle,
          pasteBody,
        }),
      }
    );

    const data = await res.json();

    if (data.status === 'error') {
      const error = data.error.errors;
      if (error.pasteBody && error.pasteTitle) {
        setMessage(
          error.pasteBody.message + ' and ' + error.pasteTitle.message
        );
        setIsCreated(true);
        myTimeout();
      } else if (error.pasteBody) {
        setIsCreated(true);
        setMessage(error.pasteBody.message);
        myTimeout();
      } else if (error.pasteTitle) {
        setIsCreated(true);
        setMessage(error.pasteTitle.message);
        myTimeout();
      }
    } else if (data.status === 'ok') {
      setPasteBody('');
      setPasteTitle('');
      setIsCreated(true);
      setMessage(data.message);
      setTimeout(() => {
        setIsCreated(false);
        setMessage('');
      }, 2500);
    }
  };

  const pasteTitleHandler = (e) => {
    setPasteTitle(e.target.value);
  };

  const pasteBodyHandler = (e) => {
    setPasteBody(e.target.value);
  };

  return (
    <div className={classes.container}>
      <h1>This is a new page</h1>
      <Card size={'big'}>
        <form onSubmit={submitHandler}>
          <label htmlFor='title'>Title of your paste:</label>
          <input
            type='text'
            name='title'
            id='title'
            placeholder='Title'
            className={classes.title}
            value={pasteTitle}
            onChange={pasteTitleHandler}
          />

          <label htmlFor='body'>Enter your paste below:</label>
          <textarea
            type='text'
            name='body'
            id='body'
            placeholder='Paste'
            value={pasteBody}
            onChange={pasteBodyHandler}
            className={classes['paste-input__body']}
          />
          <input type='submit' value='PASTE' className={classes.btn} />
        </form>
        {isCreated && <h1>{message}</h1>}
      </Card>
    </div>
  );
}

export default New;
