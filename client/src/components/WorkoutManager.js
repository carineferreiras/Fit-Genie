import React, {useState} from 'react';
import { Typography, Stack, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Modal from "./Modal";


const WorkoutManager = (props) => {
    const { workout } = props
    const { exercises, workoutname } = workout;
    const [ isEditing, setIsEditing ] = useState(false);
    const [ exercisesToRemove, setExercisesToRemove ] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);

    let navigate = useNavigate();

    // const handleWorkoutSelection = () => {
    //     navigate(`/workouts/${workout.id}`);
    // };

    const handleEditWorkout = (exerciseId) => {

        return setExercisesToRemove([...exercisesToRemove, exerciseId])
    };
    const submitEditedWorkout = (workout) => {

        fetch(`/workouts/${workout.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({exercises:exercisesToRemove})
        })
            .then(response => response.json())
            .then(data => {
                setIsEditing(false)
                setExercisesToRemove([])
                props.handleWorkoutsReload(true)
            })
            .catch(error => {
                console.error('There was an error updating the user:', error);
            });
    }
    const removeWorkout = (workout) => {

        fetch(`/workouts/${workout.id}/`, {
            method: 'DELETE', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            // body: {user:{}}
        })
            .then(response => response.json())
            .then(data => {
                props.handleWorkoutsReload(true)
            })
            .catch(error => {
                console.error('There was an error updating the user:', error);
            });
    }

    if (!workout || !workout.exercises || !workout.duration || !workout.workoutname ) {
        console.warn('Invalid Workouts data:', workout);
        return null;
    }

    return (

        <Stack gap='60px' className="detailStack">

            <Stack className="innerDetailStack">
                <Typography variant='h9' className='exerciseName'>{workoutname}</Typography>
                <Typography className='extraDetail'>
                    {exercises.map((item) => (
                        <Stack key={item.name} direction='row' gap='24px' alignItems='center' className='extraDetailStack'>
                            <Button onClick={()=>navigate('/exercise', {state:{exercise:item}})} className='detailButton' disabled={true}>
                                <Typography variant='h9' className='detailText' >{item.exercisename}</Typography>
                            </Button>
                            {
                                isEditing ? <Button onClick={()=>{handleEditWorkout(item.id)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                         strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>

                                    </svg>
                                </Button> : null
                            }
                        </Stack>
                    ))}
                </Typography>
            </Stack>
            <div className={'buttonBox'}>

                <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                    <h2>Removing Workout</h2>
                    <p>Are you sure?</p>
                    <Button onClick={()=> {
                        removeWorkout(workout)
                    }}>
                        Remove
                    </Button>
                </Modal>
                <Button onClick={()=> {
                    exercisesToRemove.length > 0 ? submitEditedWorkout(workout) : setIsEditing(!isEditing)
                }} >
                    {
                        exercisesToRemove.length > 0 ? 'Submit' : 'Edit'
                    }
                </Button>

                <button onClick={() => setModalOpen(true)}>Remove</button>

            </div>

        </Stack>
    );
};

export default WorkoutManager;
