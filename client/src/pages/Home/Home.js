import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import HeroBanner from '../../components/HeroBanner';
import Calendar from "../../components/Calendar";

import './Home.css';

const Home = (props) => {

  return (
      <Box className='homeBox'>
        <HeroBanner />

        <Box className='workouts'>

          <Calendar handleUserReload={props.handleUserReload} tasks={props.currentUser.schedules}/>

        </Box>
      </Box>
  );
};

export default Home;
