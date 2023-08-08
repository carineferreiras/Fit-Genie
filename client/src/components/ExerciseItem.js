import React, {useEffect, useState} from 'react';
import {Card, CardContent, Typography, Button} from '@mui/material';
// import {useLocation, useNavigate} from 'react-router-dom';
// import ExerciseImage from '../assets/images/image2.jpg';

import './ExerciseItem.css';
import Modal from "./Modal";

const ExerciseItem = (props) => {

    // const navigate = useNavigate();
    // const location = useLocation();
    // const [exerciseData, setExerciseData] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);

    const {description, duration, exercisename, id, repetitions, sets, weight} = props.exercise;

    // const handleButtonClick = (exerciseId) => {
    //   navigate('/workouts');
    // }

    const handleRemoveItem = (exerciseId) => {

        fetch(`/remove-exercise/${exerciseId}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                props.handleExercisesReload(true)
            })
            .catch(error => {
                console.error('There was an error updating the user:', error);
            });
    };

    return (
        <Card className="ExerciseItemContainer">
            <CardContent className="ExerciseItemContent">
                <Typography variant="h5">
                    {exercisename}
                </Typography>
                <Typography variant="h5">
                    {description}
                </Typography>
                <Typography variant="h5">
                    Duration: {duration}
                </Typography>
                <Typography variant="h5">
                    Repetitions: {repetitions}
                </Typography>
                <Typography variant="h5">
                    Sets: {sets}
                </Typography>
                <Typography variant="h5">
                    Weight: {weight}
                </Typography>


            </CardContent>
            {props.editMode ?<button onClick={() => setModalOpen(true)}>-</button> : <></>}

            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <h2>Removing Exercise</h2>
                <p>Are you sure?</p>
                <Button onClick={() => handleRemoveItem(id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-trash" viewBox="0 0 16 16">
                        <path
                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                        <path
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                    </svg>
                </Button>
            </Modal>

            {/*<img src={ExerciseImage} alt='banner' className='exerciseImage'/>*/}
        </Card>
    );
};
export default ExerciseItem;
