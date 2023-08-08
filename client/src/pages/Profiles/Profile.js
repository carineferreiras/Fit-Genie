import React from 'react';
import { Box, Typography } from '@mui/material';
import './Profile.css';
import profileImage from '../../assets/icons/body-part.png'


const Profile = (props) => {
  // const [me, setMe]= useState({})
  const {currentUser} = props

  return (
    <Box className='profileBox'>
      <Typography variant='h3' className='profileTitle'>Profile</Typography>
      <Box className='profileInfo'>
        <Typography variant='h5'>Email: {currentUser.email}</Typography>
        <Typography variant='h5'>Name: {currentUser.firstname}</Typography>
        <Typography variant='h5'>Last Name: {currentUser.lastname}</Typography>
        <Typography variant='h5'>Id: {currentUser.id}</Typography>
        <Typography variant='h5'>Wight: 70kg</Typography>
        <Typography variant='h5'>Height: 170cm</Typography>
        <Typography variant='h5'>Level: 3</Typography>
        {/* <Typography variant='h5'>Email: {user.email}</Typography> */}
        <img src={profileImage} alt='banner' className='profileImage'/> 
      </Box>
    </Box>
  );
  
}



export default Profile;
