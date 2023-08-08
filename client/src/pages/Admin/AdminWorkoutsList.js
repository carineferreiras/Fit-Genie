import React, {useEffect, useState} from 'react';
import {Box, CircularProgress,} from '@mui/material';
// import {  useNavigate } from 'react-router-dom';
import WorkoutManager from "../../components/WorkoutManager";
import AddWorkoutForm from "./AddWorkoutForm";

import "./AdminWorkoutsList.css";


const Workouts = () => {
    const [workouts, setWorkouts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [workoutsReload, setWorkoutsReload] = useState(false);
    const [loading, setLoading] = useState(true);

    // const navigate = useNavigate();

    // const handleButtonClick = () => {
    //   navigate('/');
    // };

    useEffect(() => {
        const fetchEWorkoutsData = async () => {
            fetch('http://localhost:4000/workouts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
                .then(response => response.json())
                .then(data => {
                    setWorkouts(data)
                    setLoading(false)
                })
                .catch(error => console.error('There was an error!', error));
        }

        if (loading || workoutsReload) {
            fetchEWorkoutsData().then(() => setWorkoutsReload(false))
        }
        ;
    }, [workouts, workoutsReload, loading]);

    let workoutsList = workouts.map(workout => {
        return <WorkoutManager workout={workout} handleWorkoutsReload={() => setWorkoutsReload(true)}/>
    });

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <Box className='WorkoutsBox'>
            {loading ? <CircularProgress/> :
                <>
                    {!modalVisible && <button onClick={toggleModal}>+ Workout</button>}

                    {modalVisible && (

                        <div>
                            <AddWorkoutForm handleWorkoutsReload={() => setWorkoutsReload(true)}/>
                            <button onClick={toggleModal}>Close</button>
                        </div>

                    )}

                    {workoutsList}
                </>
            }
        </Box>
    )
}

export default Workouts;
