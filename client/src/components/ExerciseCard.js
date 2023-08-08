import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import './ExerciseCard.css';
import ExerciseImage from '../assets/images/image2.jpg';

const ExerciseCard = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const props = location.state;
  const [exerciseData, setExerciseData] = useState([]);

  const { description, duration, exercisename, id, repetitions, sets, weight } = props.exercise;

  const handleButtonClick = () => {
    navigate('/workouts');
  };

  useEffect(() => {


    const fetchExercisesData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/workouts/${id}/exercises`);
        const data = await response.json();
        setExerciseData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchExercisesData();
  }, [props]);

  return (
    <Card className="ExerciseCardContainer">
      <CardContent>
        <Typography variant="h5">
          Name: {exercisename}
        </Typography>
        <Typography variant="h5">
          Description: {description}
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

        <Button onClick={handleButtonClick}>
          Go to Workouts
        </Button>
      </CardContent>
       <img src={ExerciseImage} alt='banner' className='exerciseImage'/>
    </Card>
  );
};
export default ExerciseCard;
