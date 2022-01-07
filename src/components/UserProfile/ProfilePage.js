import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import ProfileDetails from './ProfileDetails';
const ProfilePage = () => {
  return (
    <>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
          mt: 10,
        }}
      >
        <Container maxWidth='lg'>
          <Typography sx={{ mb: 3 }} variant='h4'>
            Account
          </Typography>
          <ProfileDetails />
        </Container>
      </Box>
    </>
  );
};

export default ProfilePage;
