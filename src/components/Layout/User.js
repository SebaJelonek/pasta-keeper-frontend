import { useState, useEffect } from 'react';
import classes from './User.module.css';

function User({ name, isAdmin, id, banned }) {
  const [isBanned, setIsBanned] = useState(false);

  useEffect(() => {
    setIsBanned(banned);
  }, [banned]);

  function banUser() {
    fetch('https://pasta-keeper.herokuapp.com/api/admin/ban-user', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: id, isAdmin, isBanned }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status === 'ok') {
          setIsBanned(true);
        }
      });
  }

  const banIcon = (
    <svg
      onClick={banUser}
      className={classes['ban-icon']}
      xmlns='http://www.w3.org/2000/svg'
      height='36px'
      viewBox='0 0 24 24'
      width='36px'
      fill='#000000'
    >
      <path d='M0 0h24v24H0V0z' fill='none' />
      <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z' />
    </svg>
  );

  return (
    <div>
      <h1>{name}</h1>
      <h3>{isAdmin}</h3>
      {isBanned && <h4>This user is banned</h4>}
      {!isBanned && <div title='ban user'>{banIcon}</div>}
    </div>
  );
}

export default User;
