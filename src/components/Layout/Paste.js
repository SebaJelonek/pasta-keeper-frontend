import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Paste.module.css';

function Paste({ title, body, _id, showPaste, userPaste, fullBody }) {
  const [editable, setEditable] = useState(false);
  const [titleContent, setTitleContent] = useState(title);
  const [bodyContent, setBodyContent] = useState(body);
  const navigate = useNavigate();

  const trashIcon = (
    <svg
      className={classes['trash-icon']}
      onClick={deletePaste}
      xmlns='http://www.w3.org/2000/svg'
      height='36px'
      viewBox='0 0 24 24'
      width='36px'
      fill='#000000'
    >
      <path d='M0 0h24v24H0V0z' fill='none' />
      <path d='M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z' />
    </svg>
  );

  //bodyContent is string
  function editPaste() {
    console.log(fullBody);
    setEditable(true);
    if (typeof bodyContent === 'object') {
      setBodyContent(bodyContent.join('').toString());
    }
  }

  function cancelPaste() {
    setEditable(false);
  }

  function onChangeHandlerTitle(e) {
    setTitleContent(e.target.value);
  }

  function onChangeHandlerBody(e) {
    setBodyContent(e.target.value);
  }

  async function deletePaste() {
    const res = await fetch(
      'https://pasta-keeper.herokuapp.com/api/user/delete-pasta',
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id }),
      }
    );
    const data = await res.json();
    if (data.status === 'ok') {
      navigate('/about');
    }
  }

  async function savePaste() {
    setEditable(false);
    console.log(bodyContent);
    const res = await fetch(
      'https://pasta-keeper.herokuapp.com/api/user/edit-pasta',
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _id,
          pasteTitle: titleContent,
          pasteBody: bodyContent,
        }),
      }
    );
    const data = await res.json();
    if (data.status !== 'ok') {
      console.log(typeof bodyContent);
    } else {
      console.log(typeof bodyContent);
    }
  }

  function showPasteClickHandler() {
    if (userPaste) {
      return;
    } else showPaste(_id);
  }

  const BodyText = () => {
    return (
      <div>
        {bodyContent}... <strong>click for more</strong>
        <hr />
      </div>
    );
  };

  return (
    <Fragment>
      {!editable ? (
        <div
          style={{ height: 160.667 + 'px' }}
          onClick={
            bodyContent.length >= 249 ? showPasteClickHandler : undefined
          }
        >
          <Fragment>
            <h4 className={classes['paste-title']}>{titleContent}</h4>
            <div>{bodyContent.length >= 249 ? <BodyText /> : bodyContent}</div>
          </Fragment>
        </div>
      ) : (
        <div>
          <Fragment>
            <input
              type='text'
              value={titleContent}
              onChange={onChangeHandlerTitle}
            />
            <textarea
              cols='30'
              rows='10'
              defaultValue={fullBody}
              onChange={onChangeHandlerBody}
            />
          </Fragment>
        </div>
      )}

      {userPaste && (
        <div className={classes['btn-container']}>
          {trashIcon}
          {!editable ? (
            <button className={classes.btn} onClick={editPaste}>
              Edit
            </button>
          ) : (
            <Fragment>
              <button className={classes.btn} onClick={savePaste}>
                Save
              </button>
              <button className={classes['btn-cancel']} onClick={cancelPaste}>
                Cancel
              </button>
            </Fragment>
          )}
        </div>
      )}
    </Fragment>
  );
}

export default Paste;
