import { useState, useEffect } from 'react';
import Card from './Card';
import classes from './Modal.module.css';

function Modal({ hideModal, body }) {
  const [modalHeight, setModalHeight] = useState('927px');
  const rows = body.split('\n').length;

  useEffect(() => {
    if (rows > 19) {
      setModalHeight('auto');
    }
  }, [rows]);

  return (
    <div
      style={{ height: modalHeight }}
      className={classes.modal}
      onClick={hideModal}
    >
      <Card size='big' padding='p0'>
        <div className={classes['modal-btn']} onClick={hideModal}>
          {body.split('\n').map((bodyPart, index) => {
            return (
              <p className={classes['body-part']} key={index + Math.random()}>
                {bodyPart.length > 1 ? '-' + bodyPart : ''}
              </p>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

export default Modal;
