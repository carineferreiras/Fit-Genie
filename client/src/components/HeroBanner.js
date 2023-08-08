import React from 'react';
// import { Box, Typography, Button } from '@mui/material';
import { Box, Typography } from '@mui/material';
import '../components/HeroBanner.css'
// import HeroBannerImage from '../assets/images/banner.png'

const HeroBanner = () => {
  return (
    <Box className='heroBox'>
      <Typography className='welcomeText'>
        {/* Welcome to FitGenie */}
      </Typography>
      <Typography className='bannerText'>
               
        
      </Typography>
      {/* <Button variant='contained' color='error' href='#exercises' className='exploreButton'>
        Explore Exercises
      </Button> */}
      {/* <Typography className='exerciseText'>
        Exercise
      </Typography> */}
      {/* <img src={HeroBannerImage} alt='banner' className='heroBannerImage'/> */}
    </Box>
  )
}

export default HeroBanner;
