import React, {useState} from 'react';
import {Typography} from "@mui/material";

import "./AddExerciseForm.css";

const AddExerciseForm = (props) => {
    const [exerciseName, setExerciseName] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [repetitions, setRepetitions] = useState("");
    const [sets, setSets] = useState("");
    const [weight, setWeight] = useState("");
    const [addedSuccessfully, setAddedSuccessfully] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const handleModal = () => {
        props.handleModal()
    }
    const handleFormSubmit = (event) => {
        event.preventDefault();

        const exercise = {
            exercisename: exerciseName,
            description,
            duration,
            repetitions,
            sets,
            weight
        };

        fetch(`/new-exercise/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: {},
                exercise: exercise
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.id) {
                    setExerciseName('')
                    setDescription('')
                    setDuration('')
                    setRepetitions('')
                    setSets('')
                    setWeight('')
                    props.handleExercisesReload(true)
                    setAddedSuccessfully('success')
                    setTimeout(() => setAddedSuccessfully(false), 2500).then(() => handleModal())

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

    return (<> {
            addedSuccessfully ? (addedSuccessfully === 'success' ?
                <div className="success-animation">
                    <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                        <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                        <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                    </svg>
                    <Typography>Exercise created successfully!</Typography>
                </div> : <div className="container">
                    <div className="circle-border"></div>
                    <div className="circle">
                        <div className="error"></div>
                        {Object.keys(validationErrors).map(error =>
                            <div>
                                <span>{error}</span>
                                <span>{validationErrors[error]}</span>
                            </div>
                        )}
                    </div>
                </div>) : <form onSubmit={handleFormSubmit}>
                <label>
                    Exercise Name:
                    <input className='inputLabel' type="text" value={exerciseName}
                           onChange={(e) => setExerciseName(e.target.value)}/>
                </label>

                <label>
                    Description:
                    <textarea className='inputLabel' value={description}
                              onChange={(e) => setDescription(e.target.value)}/>
                </label>

                <label>
                    Duration:
                    <input className='inputLabel' type="text" value={duration}
                           onChange={(e) => setDuration(e.target.value)}/>
                </label>

                <label>
                    Repetitions:
                    <input className='inputLabel' type="number" value={repetitions}
                           onChange={(e) => setRepetitions(e.target.value)}/>
                </label>

                <label>
                    Sets:
                    <input className='inputLabel' type="number" value={sets} onChange={(e) => setSets(e.target.value)}/>
                </label>

                <label>
                    Weight:
                    <input className='inputLabel' type="text" value={weight}
                           onChange={(e) => setWeight(e.target.value)}/>
                </label>

                <input className='buttonInput' type="submit" value="Add Exercise"/>
            </form>
        } </>
    );
};

export default AddExerciseForm;
