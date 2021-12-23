import { useEffect, useState } from 'react';
import Card from '../Layout/Card';

import classes from './Home.module.css';

function Home() {
  const [response, setResponse] = useState(false);
  const [pastes, setPastes] = useState([]);

  let pasteList = pastes.map((paste) => {
    return (
      <div className={classes['card-container']} key={paste._id}>
        <Card size='small'>
          <h4>{paste.pasteTitle}</h4>
          <p>{paste.pasteBody}</p>
        </Card>
      </div>
    );
  });

  useEffect(() => {
    getPastes();
  }, []);

  async function getPastes() {
    const res = await fetch(
      'https://pasta-keeper.herokuapp.com/api/get-pastas',
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const data = await res.json();
    if (data.status === 'ok') {
      setResponse(true);
      setPastes(data.paste);
    }
  }

  return (
    <div className={classes.container}>
      <h1>This is home page</h1>
      {response && (
        <div>
          <h2>All your pastas are here</h2>
          <div className={classes['pastes-container']}>{pasteList}</div>
        </div>
      )}
    </div>
  );
}

export default Home;
