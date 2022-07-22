import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { Copyright } from '../../components/copyright-component';
import { useTranslation } from 'react-i18next';
import { Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate} from "react-router-dom";
import { loginFail, loginPending, loginSuccess } from '../../slices/login-slice';
import { userLogin } from '../../api/user.api';
import { navigationLoading, navigationSuccess } from '../../slices/navigation-slice';
import { user_loadFromApi, user_set_locale } from '../../slices/user-slice';

const theme = createTheme();

export default function SignInSide() {

  const { t } = useTranslation();
  const [isPassword, setIsPassword] = useState(true);
  const [isEmail, setIsEmail] = useState(true);
  const [errorMsg, setErrorMsg]= useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async(event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
        email: data.get('email'),
        password: data.get('password'),
      });

      setIsPassword((data.get("password")));
      setIsEmail ((data.get("email"))); 

      if (!isEmail || !isPassword){
        return alert("Fill up all the form")
      }
      dispatch(loginPending());

      
      try {
        const isAuth = await userLogin({"email":isEmail, "password":isPassword});
        console.log("Email", isEmail, "Password", isPassword, "IS AUTH",isAuth);

        if(isAuth.status === "error" || isAuth.status==="unauthorized"){
          setErrorMsg(isAuth.message);  
          return dispatch(loginFail(isAuth.message));
        }

        dispatch(user_loadFromApi(isAuth.user))
        dispatch(user_set_locale())
        
        const actualScreen = "/dashboard";
        dispatch(navigationLoading());
        navigate(actualScreen,{replace: true});
        dispatch(navigationSuccess(actualScreen))
        
        return dispatch (loginSuccess());
        
    } catch (error) {
        dispatch(loginFail(error.message));
    }

  };



  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {t("signin")}
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label={t("emailAddress")}
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label={t("password")}
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {!isEmail ? <Alert severity="error">{t("emailmissing")}</Alert>: " "}
              {!isPassword ? <Alert severity="error">{t("passwordmissing")}</Alert>: " "}
              {errorMsg!==""? <Alert severity="error">{t(errorMsg)}</Alert>: " "}

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label={t("rememberMe")}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
               {t("signin")}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/password-reset" variant="body2">
                    {t("forgotPassword")}
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {t("donthaveanaccount")} {t("signup")}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}