import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Copyright } from '../../components/copyright-component';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Alert, DialogContent } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

const theme = createTheme();

export default function SignUp() {
  const { t, i18n } = useTranslation();

  const dataVerificationInit = {
    hasName: false,
    hasLastName: false,
    hasEmail: false,
    hasPassword: false,
    hasConfirmPass: false,
    hasAccepted: false,
    submitted: false
  }

  const passVerificationError = {
        isEight: false,
        isUpper: false,
        isLower: false,
        hasNumber: false,
        hasSpecial: false  
    }
 
 const [openDialog, setOpenDialog]= useState(false);
 const [passwordError, setNewPasswordError] = useState(passVerificationError);
 const [dataVerification, setDataVerification] = useState(dataVerificationInit);
 const handleOnChange = e => {
    const {name, value} = e.target;

        //setNewUser({...newUser, [name]:value});

        if(name === "password"){
            const isEight = value.length > 8;
            const isUpper = /[A-Z]/.test(value);
            const isLower = /[a-z]/.test(value);
            const hasNumber = /[0-9]/.test(value);
            const hasSpecial = /[@,#,$,%,&,+,-,_,:,.,?,¿,!,",·,(,),=]/.test(value);;
            setNewPasswordError({...passwordError, isEight,isUpper, isLower,hasNumber, hasSpecial});
        }
       
    }


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const hasName = !data.get("firstName")=="";
    const hasLastName = !data.get("lastName")=="";
    const hasEmail = !data.get("email")=="";
    const hasPassword = !data.get("password")=="";
    const hasConfirmPass = !data.get("confirmPass")=="";
    const hasAccepted = data.get("acceptConditions");
    const submitted = true;
    setDataVerification({...dataVerification, hasName, hasLastName, hasEmail, hasPassword, hasConfirmPass, hasAccepted, submitted});
    if (Object.values(dataVerification).includes(false)){
        console.log("Aun hay cosas falses")
        
    }else{
        if(Object.values(passwordError).includes(false))
        {
            console.log("Error en el password");
        }else
        {
            ///CALL API TO CREATE USER
            console.log("USUARIO CREADO");
            setOpenDialog(true);
        }
    }
    console.log(dataVerification);
  };

  return (
    
    <ThemeProvider theme={theme}>
        <Dialog open={openDialog}>
            <DialogTitle align='center'>{t("usercreatedcorrectly")}</DialogTitle>
            <DialogContent align='center'>{t("youwillrecieveemail")}</DialogContent>
            <DialogContent align='center'>{t("youcanclosethiswindow")}</DialogContent>
        </Dialog>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t("signup")}
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label={t("name")}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label={t("lastname")}
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label={t("emailAddress")}
                  id="email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label={t("password")}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPass"
                  label={t("confirmPassword")}
                  type="password"
                  id="confirmPass"
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs= {12}>
                {!passwordError.isEight ? <Alert severity='warning'>{t("min8characters")}</Alert> : <Alert severity='success'>{t("min8characters")}</Alert>}
                {!passwordError.isUpper ? <Alert severity='warning'>{t("atleastoneUPPER")}</Alert> : <Alert severity='success'>{t("atleastoneUPPER")}</Alert>}
                {!passwordError.isLower ? <Alert severity='warning'>{t("atleastonelower")}</Alert> : <Alert severity='success'>{t("atleastonelower")}</Alert>}
                {!passwordError.hasNumber ? <Alert severity='warning'>{t("atleastonenumber")}</Alert> : <Alert severity='success'>{t("atleastonenumber")}</Alert>}
                {!passwordError.hasSpecial ? <Alert severity='warning'>{t("atleastspecial")}</Alert> : <Alert severity='success'>{t("atleastspecial")}</Alert>}
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="acceptConditions" color="primary" />}
                  label={t("termsaccept")}
                  name ="acceptConditions"
                />
              </Grid>
            </Grid>
            
            {dataVerification.submitted && !dataVerification.hasEmail ? <Alert severity="error">{t("emailmissing")}</Alert>: " "}
            {dataVerification.submitted && !dataVerification.hasPassword ? <Alert severity="error">{t("passwordmissing")}</Alert>: " "}
            {dataVerification.submitted && !dataVerification.hasName ? <Alert severity="error">{t("namemissing")}</Alert>: " "}
            {dataVerification.submitted && !dataVerification.hasLastName ? <Alert severity="error">{t("lastnamemissing")}</Alert>: " "}
            {dataVerification.submitted && !dataVerification.hasAccepted ? <Alert severity="error">{t("termsacceptedmissing")}</Alert>: " "}
     
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {t("signup")}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                 {t("alreadyhaveanaacount")} {t("signin")}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}