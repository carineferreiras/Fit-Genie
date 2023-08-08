import React from 'react'
import { Link } from 'react-router-dom';
import {Button, Stack, Typography} from '@mui/material';
import './Navbar.css';

import Logo from '../assets/images/LOGO1.png';


const Navbar = (props) => {
    // const localUser= localStorage.getItem('user')
    // const user = props.currentUser ? props.currentUser : JSON.parse(localUser)
    const {currentUser} = props
    const handleLogout = () => {
        props.setLogout()
    }
  return (
    <Stack direction='column' justifyContent='space-around' className='navbarStack'>
        <img src={Logo} alt='Fitness Logo' className='logoImage' />
        { localStorage.getItem('isLoggedIn') || props.isLoggedIn ?
            <Stack direction='column' className='navbarLinks'>
                {currentUser?.is_admin ? <Typography variants={'h1'}><strong>Admin</strong></Typography> : null}
                <Typography variants={'h1'}>{currentUser.email}</Typography>
                <Button onClick={ ()=> {
                    handleLogout()
                }} className='navbarLinks'>Logout</Button>
               { currentUser && currentUser.is_admin ? <>
                   <Typography clasName={'exercisesAdminLink'}><strong>admin side</strong></Typography>
                    <Link to='/adminexercises' className='exercisesAdminLink'>Exercises list</Link>
                    <Link to='/adminworkouts' className='exercisesAdminLink'>Workouts list</Link>
                </> : null }

                <Link to='/' cclassName='navbarLinks'>
                    Home
                </Link>
                <Link to='/profile' className='homeLink'>Profile</Link>
                <Link to='/workouts' className='exercisesLink'>Workouts</Link>
        </Stack> :
            <Stack direction='column' className='navbarLinks'>
            <Link to='/signup' className='homeLink'>Sign Up</Link>
            <Link to='/signin' className='exercisesLink'>Sign In</Link>
            <Link to='' className='emptyLink'></Link>
           
            </Stack>
        }
    </Stack>
  )
}

export default Navbar

