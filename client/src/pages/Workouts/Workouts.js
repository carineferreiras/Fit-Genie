import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import "./Workouts.css";
import WorkoutItem from "../../components/WorkoutItem";
// import {  useNavigate } from 'react-router-dom';


const Workouts = (props) => {

  const {currentUser} = props
  const [workouts, setWorkouts] = useState([]);

  // const navigate = useNavigate();

  // const handleButtonClick = () => {
  //   navigate('/');
  // };

  useEffect(() => {
    const fetchExercisesData = async () => {
      fetch('http://localhost:4000/workouts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
        .then(response => response.json())
        .then(workoutsData => {
          setWorkouts(workoutsData)
        })
        .catch(error => console.error('There was an error!', error));
    }

    if (workouts.length === 0) fetchExercisesData();
  }, [workouts]);

  let workoutsList = workouts.map(workout => {
    return <WorkoutItem currentUser={currentUser} workout={workout} handleUserReload={props.handleUserReload} />
  })

  return (
    <Box className='WorkoutsBox'>
      {workoutsList}
    </Box>
     
  )
}

export default Workouts;
