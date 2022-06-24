import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';

import Grid from '@mui/material/Grid';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Copyright } from '../../components/copyright-component';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

const theme = createTheme();

export default function FourOuFour() {

  const { t, i18n } = useTranslation();

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh', align:"center", justify:"center" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={12}
          md={12}
          sx={{
            backgroundImage: 'url(/images/404.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >

        <Typography variant="h1" component="h1" align='center' sx={{ flexGrow: 1 }}>
          UN 404 COMO UN PINO
        </Typography>
        
        </Grid>
      
      </Grid>
    </ThemeProvider>
  );
}