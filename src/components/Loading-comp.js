import { LinearProgress } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';

export const Loading = ()=>{

return (
  <React.Fragment>
     <Box sx={{ width: '100%' }}>
      <p>Loading Data</p>
      <LinearProgress color="success"/>
    </Box>
  </React.Fragment>
  );
}