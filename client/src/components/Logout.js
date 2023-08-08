import React from 'react';
import { Button } from '@mui/material';

const Logout = (props) => {

  const handleLogout = () => {
    fetch('http://localhost:4000/logout', {
      method: 'POST',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      localStorage.setItem('isLoggedIn', false);
      props.handleIsLoggedIn(false);
      window.location.assign('/signin'); // Forces a refresh and redirect to signin page
    })
    .catch(error => console.error('There was an error!', error));
  }

  return (
    <Button  className="logoutbutton" onClick={handleLogout}>Logout</Button>
  );
}

export default Logout;
