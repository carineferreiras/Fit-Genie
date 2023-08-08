import React, {useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';

import Navbar from './components/Navbar';
import Profiles from './pages/Profiles/Profile';
import Workouts from '../src/pages/Workouts//Workouts';
import Home from '../src/pages/Home/Home';
import AdminWorkouts from './pages/Admin/AdminWorkoutsList';

// import Footer from './components/Footer';

import {Box} from '@mui/material';
import './App.css';
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import ExerciseCard from "./components/ExerciseCard";
import NotFound from "./components/NotFound";
import AdminExercisesList from "./pages/Admin/AdminExercisesList";


const App = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [currentUser, setCurrentUser] = useState(false)
    const [reloadUser, setReloadUser] = useState(false)
    const navigate = useNavigate();

    useEffect(()=>{
        const fechUserData = async () => {
            fetch('http://localhost:4000/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
                .then(response => response.json())
                .then(data => {
                    setCurrentUser(data)
                })
                .catch(error => console.error('There was an error!', error));
        }

        if (!currentUser || reloadUser) fechUserData().then(()=> setReloadUser(false));
    },)

    return (
        <Box className={'main'}>

            <Navbar className={'navBar'} setLogout={() => {
                fetch('http://localhost:4000/sessions', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                })
                    .then( response => response.json() )
                    .then( data => {
                        setIsLoggedIn(false)
                        localStorage.removeItem('user')
                        localStorage.removeItem('isLoggedIn')
                        return navigate('/signin')
                    })
                    .catch(error => console.error('There was an error!', error));
            }} currentUser={currentUser} isLoggedIn={isLoggedIn} />

            <Routes>
                <Route path='/' element={isLoggedIn ? <Home currentUser={currentUser} handleUserReload={setReloadUser}/> : ()=> navigate('/signin') }/>
                <Route path='/exercise' element={<ExerciseCard/>}/>
                <Route path='/workouts' element={<Workouts currentUser={currentUser} handleUserReload={setReloadUser}/>}/>
                <Route path='/profile' element={<Profiles currentUser={currentUser}/>}/>
                <Route path='*' element={<NotFound/>}/>

                <Route path='/signin' element={isLoggedIn ? ()=> navigate('/home'):<Signin handleCurrentUser={setCurrentUser} handleIsLoggedIn={setIsLoggedIn}/>}/>
                <Route path='/signup' element={isLoggedIn ? ()=> navigate('/home'):<Signup handleCurrentUser={setCurrentUser} handleIsLoggedIn={setIsLoggedIn}/>}/>
                <Route exact path="/adminexercises" element={<AdminExercisesList handleUserReload={setReloadUser}/>}/>
                <Route exact path="/adminworkouts" element={<AdminWorkouts handleUserReload={setReloadUser}/>}/>
            </Routes>
            {/* <Footer /> */}
        </Box>
    )
}

export default App