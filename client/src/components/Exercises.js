import React, {  useState} from 'react';
import Pagination from '@mui/material/Pagination';
import { Box, Stack } from '@mui/material';
import './Exercises.css' // import the CSS file


import ExerciseCard from './ExerciseCard';


  const Exercises = ({ exercises}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 9;

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
 
  const currentExercises = Array.isArray(exercises) ? exercises.slice(indexOfFirstExercise, indexOfLastExercise) : [];

  const paginate = (e, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1550, behavior: 'smooth'})
  }

  return (
    <Box id='exercises' mt='50px' p='20px'>
      <Stack direction='row' flexWrap='wrap' justifyContent='center'>
        {currentExercises.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise}/>
        ))}
      </Stack>
      <Stack mt='100px' alignItems='center'>
      {Array.isArray(exercises) && exercises.length > exercisesPerPage && (
            <Pagination 
              color='standard'
              shape='rounded'
              size='large'
              count={ Math.ceil(exercises.length / exercisesPerPage) }
              page={currentPage}
              onChange={paginate}
            />
          )}
      </Stack>
    </Box>
  )
}

export default Exercises;