import { LinearProgress } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import i18next from 'i18next';


export const Loading = ()=>{

return (
  <React.Fragment>
     <Box sx={{ width: '100%' }}>
      <p>{i18next.t("loadingData")}</p>
      <LinearProgress color="success"/>
    </Box>
  </React.Fragment>
  );
}