import { useEffect, useState } from 'react';
import Paste from '../Layout/Paste';
import Pagination from '../Layout/Pagination';
import Card from '../Layout/Card';
import Modal from '../Layout/Modal';

import classes from './Home.module.css';

function Home() {
  const [response, setResponse] = useState(false);
  const [pastes, setPastes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [pasteBody, setPasteBody] = useState('');
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
            _id={paste._id}
            title={paste.pasteTitle}
            showPaste={showPaste}
            body={
              paste.pasteBody.split('').length > 250
                ? paste.pasteBody.split('').splice(0, 249)
                : paste.pasteBody
            }
          />
        </Card>
      </div>
    );
  });

  function showPaste(id) {
    setShowModal(true);
    pastes.filter((paste) => {
      if (paste._id === id) {
        setPasteBody(paste.pasteBody);
        return true;
      }
      return false;
    });
  }

  function hideModal() {
    setShowModal(false);
  }

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
      setShowModal(false);
      setPastes(data.paste.reverse());
    }
  }

  function paginationHandler(pageNumber) {
    const newPageNumber = parseInt(pageNumber.target.textContent);
    setCurrentPage(newPageNumber);
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Enjoy your pasta!</h1>
      <h2 className={classes.page}>Current Page: {currentPage}</h2>
      {response && !showModal && (
        <div>
          <div className={classes['pastes-container']}>{pasteList}</div>
        </div>
      )}

      {showModal && <Modal hideModal={hideModal} body={pasteBody} />}
      <Pagination
        totalPastes={pastes.length}
        pastePerPage={pastePerPage}
        paginationHandler={paginationHandler}
      />
    </div>
  );
}

export default Home;
