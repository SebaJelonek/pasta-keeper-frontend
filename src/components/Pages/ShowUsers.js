import { useState, useEffect } from 'react';
import User from '../Layout/User';
import Card from '../Layout/Card';
import classes from './ShowUsers.module.css';

function ShowUsers() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetch('https://pasta-keeper.herokuapp.com/api/admin/get-users', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUserList(data.userList);
      });
  }, []);

  let showUserList = userList.map((user) => {
    return (
      <div key={user._id} className={classes['card-container']}>
        <Card size='small'>
          <User
            name={user.name}
            isAdmin={user.isAdmin}
            id={user._id}
            banned={user.isBanned}
          />
        </Card>
      </div>
    );
  });

  return (
    <div className={classes.container}>
      <h1>This is a user list</h1>
      {showUserList}
    </div>
  );
}

export default ShowUsers;
