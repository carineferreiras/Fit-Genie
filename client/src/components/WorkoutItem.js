import React, {useState} from 'react';
import { Typography, Stack, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import WeekdayPicker from "./WeekdayPicker";

const WorkoutItem = (props) => {
  let navigate = useNavigate();
  const { currentUser, workout } = props
  const [selectedDay, setSelectedDay] = useState(null);
  const [submitSuccessful, setSubmitSuccessful] = useState(false);

  const handleWorkoutSelection = () => {
    navigate(`/workouts/${workout.id}`);
  };

  if (!workout || !workout.exercises || !workout.duration || !workout.workoutname ) {
    console.warn('Invalid Workouts data:', workout);
    return null;
  }

  const { exercises, workoutname } = workout;
  const daysOfWeek = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    return (
    <Stack gap='60px' className="detailStack">
        { submitSuccessful ? <>
            <div className="success-animation">
                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                    <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
                <Typography>Scheduled successfully</Typography>
            </div>
        </> : <>
        <Stack className="innerDetailStack">
            <Typography variant='h9' className='exerciseName'>{workoutname}</Typography>
            <Typography className='extraDetail'>
                {exercises.map((item) => (
                    <Stack key={item.name} direction='row' gap='24px' alignItems='center' justifyContent='space-between' className='extraDetailStack'>
                        <Button onClick={()=>navigate('/exercise', {state:{exercise:item}})} className='detailButton'>
                            <Typography variant='h9' className='detailText'>{item.exercisename}</Typography>

                        </Button>
                    </Stack>
                ))}
            </Typography>
        </Stack>

        {selectedDay && <p>You selected: {daysOfWeek[selectedDay]}</p>}

        <WeekdayPicker daysOfWeek={daysOfWeek} setSelectedDay={setSelectedDay} />

        <Button onClick={()=> {
            fetch(`/schedule-workout/${currentUser.id}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    workout_id: workout.id,
                    weekday:selectedDay
                })
            })
                .then(response => response.json())
                .then(data => {
                    setSubmitSuccessful(true)
                    setSelectedDay(null)
                    setTimeout(()=>setSubmitSuccessful(false),5000)
                    props.handleUserReload(true)
                })
                .catch(error => {
                    console.error('There was an error updating the user:', error);
                });
        }} disabled={!selectedDay}>
            Add to my schedule
        </Button>
        </>
        }
    </Stack>
  );
};

export default WorkoutItem;
