import React, {useEffect, useState} from 'react';
import {Box, Button, CircularProgress} from '@mui/material';
import ExerciseItem from "../../components/ExerciseItem";
import AddExerciseForm from "./AddExerciseForm";

import "./AdminExercisesList.css";
import Modal from "../../components/Modal";


const AdminExercisesList = () => {
    const [exercises, setExercises] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [exercisesReload, setExercisesReload] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExercisesData = async () => {
            fetch('http://localhost:4000/exercises-list', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include' // Include cookies in the request
            })
                .then(response => response.json())
                .then(data => {
                    setExercises(data)
                    setLoading(false)
                })
                .catch(error => console.error('There was an error!', error));
        }

        if (loading || exercisesReload) fetchExercisesData().then(() => setExercisesReload(false));
    }, [exercises, exercisesReload, loading]);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    let exercisesList = exercises.map(exercise => {
        return <ExerciseItem editMode={editMode} exercise={exercise}
                             handleExercisesReload={() => setExercisesReload(true)}/>
    });


    return (
        <Box className='ExercisesBox'>
            { loading ? <CircularProgress/> : <>
                <div className="buttonBox">
                    <Button onClick={toggleModal}>Create Exercise</Button>

                    <Button onClick={() => setEditMode(!editMode)}>Remove a Exercise</Button>
                </div>

                {modalVisible && (
                    <div className="modal">
                        <div className="modal-content">
                            <AddExerciseForm handleModal={toggleModal}
                                             handleExercisesReload={() => setExercisesReload(true)}/>
                            <button onClick={toggleModal}>Close</button>
                        </div>
                    </div>
                )}

                {exercisesList}
                </>

        } </Box>
    )
}

export default AdminExercisesList;
