import { useState, useContext, useEffect } from 'react';
import AuthContext from '../store/auth-context';
import Card from '../Layout/Card';
import Paste from '../Layout/Paste';
import Pagination from '../Layout/Pagination';
import classes from './UserPaste.module.css';

function About() {
  const [response, setResponse] = useState(false);
  const [pastes, setPastes] = useState([]);
  const ctx = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [pastePerPage] = useState(12);

  // get current pastes
  const indexOfTheLastPaste = currentPage * pastePerPage;
  const indexOfTheFirstPaste = indexOfTheLastPaste - pastePerPage;
  const currentPastes = pastes.slice(indexOfTheFirstPaste, indexOfTheLastPaste);

  let pasteList = currentPastes.map((paste) => {
    return (
      <div className={classes['card-container']} key={paste._id}>
        <Card size='small'>
          <Paste
            userPaste={true}
            _id={paste._id}
            title={paste.pasteTitle}
            body={
              paste.pasteBody.split('').length > 250
                ? paste.pasteBody.split('').splice(0, 249)
                : paste.pasteBody
            }
            fullBody={paste.pasteBody}
          />
        </Card>
      </div>
    );
  });

  // Function to get pastes with the author name
  // get data from server

  //this is a proper way of fetching data on componentDidMount
  useEffect(() => {
    fetch('https://pasta-keeper.herokuapp.com/api/user/get-pastas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: ctx.name,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPastes(data.paste.reverse());
        setResponse(true);
      })
      .catch((error) => {
        throw error;
      });

    //this is a wrong use case of useEffect,
    // async function getPastes() {
    //   const res = await fetch('http://localhost:1337/api/user/get-pastas', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       name: ctx.name,
    //     }),
    //   });
    //   const data = await res.json();
    //   if (data.status === 'ok') {
    //     setPastes(data.paste.reverse());
    //     setResponse(true);
    //   } else {
    //     console.log(data.error);
    //   }
    // }
    // getPastes();
    ////////////////////////////////////////////////////////
    //
  }, [ctx.name]);

  function paginationHandler(pageNumber) {
    console.log('anything');
    const newPageNumber = parseInt(pageNumber.target.textContent);
    setCurrentPage(newPageNumber);
  }

  return (
    <div className={classes.container}>
      {response && (
        <div>
          <h1>All your pastas are here</h1>
          <div className={classes['pastes-container']}>{pasteList}</div>
        </div>
      )}
      <Pagination
        totalPastes={pastes.length}
        pastePerPage={pastePerPage}
        paginationHandler={paginationHandler}
      />
    </div>
  );
}

export default About;
