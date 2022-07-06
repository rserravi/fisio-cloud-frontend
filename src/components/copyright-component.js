import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Grid } from '@mui/material';



export function Copyright(props) {
    return (
      <Grid item sx={{mb:4}}>
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://rubotic.com/">
          Rubotic.com
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
      </Grid>
    );
  }
  