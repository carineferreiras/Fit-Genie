import React, {useEffect, useState} from 'react';
import {Typography} from "@mui/material";

const AddWorkoutForm = (props) => {
    const [workoutName, setWorkoutName] = useState("");
    const [duration, setDuration] = useState("");
    const [muscleGroupName, setMuscleGroupName] = useState("");
    const [preferredTurn, setPreferredTurn] = useState("");
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [addedSuccessfully, setAddedSuccessfully] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    const muscleGroups = ["Legs", "Back", "Chest"];
    const turns = ["Morning", "Afternoon", "Evening"];

    const fetchExercisesData = async () => {
        fetch('http://localhost:4000/exercises-list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                setExercises(data)
            })
            .catch(error => console.error('There was an error!', error));
    };

    useEffect(() => {
        if (exercises.length === 0) fetchExercisesData()
    });

    let addWorkout = (workout) => {
        fetch(`/users/${12}/workouts/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                workout: workout
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.id) {
                    setWorkoutName("");
                    setDuration("");
                    setMuscleGroupName("");
                    setPreferredTurn("");
                    setSelectedExercises([]);
                    setExercises([])
                    props.handleWorkoutsReload(true)
                    setAddedSuccessfully('success')
                    setTimeout(()=>setAddedSuccessfully(false),2500)
                } else {
                    setAddedSuccessfully('error')
                    setValidationErrors(data)
                    // setTimeout(()=>setAddedSuccessfully(false),1500)
                }
            })
            .catch(error => {
                console.error('There was an error updating the user:', error);
            });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const user_id = 12
        const workoutname = workoutName
        const muscle_group_name = muscleGroupName
        const preferred_turn = preferredTurn
        const exercises = selectedExercises

        const workout = {
            user_id,
            workoutname,
            duration,
            muscle_group_name,
            preferred_turn,
            exercises
        };

        addWorkout(workout)
    };

    const handleExerciseSelect = (event) => {
        const selected = Array.from(event.target.selectedOptions, option => Number(option.value));
        setSelectedExercises(selected);
    };

    return ( <> { addedSuccessfully ? ( addedSuccessfully === 'success' ?
        <div className="success-animation">
                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                    <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
                <Typography>Workout created successfully!</Typography>
            </div> : <div className="container">
            { Object.keys(validationErrors).map(error=>
                <div className={'errorBox'}>
                    <span>{error}</span>
                    <span>{validationErrors[error]}</span>
                </div>
            )}
        <div className="circle-border"></div>
        <div className="circle">
            <div className="error"></div>

        </div>

    </div> ) : <form onSubmit={handleFormSubmit}>
            <label>
                Workout Name:
                <input type="text" value={workoutName} onChange={(e) => setWorkoutName(e.target.value)}/>
            </label>

            <label>
                Duration:
                <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)}/>
            </label>

            <label>
                Muscle Group:
                <select value={muscleGroupName} onChange={(e) => setMuscleGroupName(e.target.value)}>
                    {muscleGroups.map((group, index) => <option key={index} value={group}>{group}</option>)}
                </select>
            </label>

            <label>
                Preferred Turn:
                <select value={preferredTurn} onChange={(e) => setPreferredTurn(e.target.value)}>
                    {turns.map((turn, index) => <option key={index} value={index}>{turn}</option>)}
                </select>
            </label>

            <label>
                Exercises:
                <select multiple={true} value={selectedExercises} onChange={handleExerciseSelect}>
                    {exercises.map((exercise, index) => <option key={index} value={exercise.id}>{exercise.exercisename}</option>)}
                </select>
            </label>

            <input className='inputLabel' type="submit" value="Add Workout"/>
        </form>
    }
    </>);
};

export default AddWorkoutForm;