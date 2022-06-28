import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';



export function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" sx={{mb:2}} {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://rubotic.com/">
          Rubotic.com
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  