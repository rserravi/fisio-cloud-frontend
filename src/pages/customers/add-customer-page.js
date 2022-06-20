import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { Copyright } from '../../components/copyright-component';
import ApplicationBar from '../../components/application-bar-component';
import SideMenu from '../../components/sideMenu-component';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, ButtonBase, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { EmailValidation, PhoneVerification, ShortTextValidation } from '../../utils/verification-utils';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';
import InputAdornment from '@mui/material/InputAdornment';
import { socialNetworks } from '../../utils/social-networks-utils';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';



const mdTheme = createTheme();

function AddCustomerContent() {

  const boardState = useSelector((state)=> state.navigator);

  const handleSubmit = (event)=>{

  }
  
  const socialInitState = {
    social1: "Facebook",
    social2: "Twitter",
    social3: "Instagram"
  }

  const [nameValid, setNameValid] = React.useState(false);
  const [lastnameValid, setLastNameValid] = React.useState(false);
  const [emailValid, setEmailValid] = React.useState(true);
  const [emailWorkValid, setEmailWorkValid] = React.useState(true);
  const [mobilephoneValid, setMobilephoneValid] = React.useState(false);  
  const [homphoneValid, setHomephoneValid] = React.useState(false);
  const [whatsappValid, setWhatsappValid] = React.useState(false);

  const [mobileValue, setMobielValue] = React.useState("+");
  const [whatsAppValue, setWhatsappValue] = React.useState("+");
  const [socialValue, setSocialValue] = React.useState(socialInitState);


  const WhatsappPick = () => {
    setWhatsappValue(mobileValue);
  }

  const handleChange = (event) => {
    console.log(event.target.id);
    const {id, name, value} = event.target;
    switch (id) {
      case "firstname":       
        setNameValid(ShortTextValidation(value, 3));
        break;
      case "lastname":
        setLastNameValid(ShortTextValidation(value, 3));
        break;
      case "emailhome":
        setEmailValid(EmailValidation(value));
        break;
      case "emailwork":
        setEmailWorkValid(EmailValidation(value));
        break;
      case "homephone":
        setHomephoneValid(PhoneVerification(value));
        break;
      case "mobilephone":
        setMobilephoneValid(PhoneVerification(value));
        setMobielValue(value);
        break;
      case "whatsapp":
        setWhatsappValid(PhoneVerification(value));
        setWhatsappValue(value);
        break;
      case "socialmedia1":
        console.log("Desde handlechange social1")
        console.log(name, value);
        setSocialValue({...socialValue, [name]: value});
        break;
      case "socialmedia2":
        setSocialValue({...socialValue, [name]: value});
        break;
      case "socialmedia3":
        setSocialValue({...socialValue, [name]: value});
        break;
      default:
        break;
    }
    if (name=="social1" || name=="social2" || name=="social3"){
      setSocialValue({...socialValue, [name]: value});
    }
    

  };

  const Input = styled('input')({
    display: 'none',
  });

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    margin: theme.spacing(2),
    marginTop: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <ApplicationBar boardState={boardState} title="customers" />
        <SideMenu boardState={boardState} />
        
        <Box
          component="form" noValidate onSubmit={handleSubmit}

          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
         
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4, ml: 1, mr:2 }}>

            <Grid container spacing={2} justifyContent="flex-start" alignItems="flex-start">
             <Grid item xs={12}>
                <Item>
                     <Typography variant="h4" component="h2">Add Customers</Typography> 
                </Item>
              </Grid>
            </Grid>
            
            NOMBRE E IMAGEN
            <Grid container spacing={2} rowSpacing={2} justifyContent="flex-start" alignItems="flex-start">
              
              <Grid item xs={12} md={10} sm={10} marginTop={3}>
                <Grid item xs={12}  md={2} sm={4} >
                  <TextField
                      id="firstname"
                      label="First Name"
                      defaultValue=""
                      helperText="Enter your First Name"
                      variant="standard"
                      fullWidth
                      onChange={handleChange}
                      color={nameValid ? "success" : "primary"}
                      focused
                      required
                      />
                </Grid>
                <Grid item xs={12} md={5} sm={8} marginTop={2}>
                  <TextField
                      id="lastname"
                      label="Last Name"
                      defaultValue=""
                      helperText="Enter your last name"
                      variant="standard"
                      fullWidth
                      onChange={handleChange}
                      color={lastnameValid ? "success" : "primary"}
                      focused
                      required
                      />
                </Grid>
              </Grid>
              
              <Grid item xs={2} md={2} sm={2} marginTop={3}>
                <Paper>
                <ButtonBase maxWidth="160" height="160" width="160">
                    <img maxWidth="155" width={155} height={155} src='images/Portrait_Placeholder.png' alt="Upload"></img>
                </ButtonBase>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <label htmlFor="upload-button">
                    <Input accept="image/*" id="upload-button" type="file" />
                    <IconButton color="primary" aria-label="upload picture" component="span">
                     
                      <UploadIcon />
                    </IconButton>
                  </label>
                  <label htmlFor="camera-button">
                    <Input accept="image/*" id="camera-button" type="file" />
                    <IconButton color="primary" aria-label="make picture" component="span">
                      <PhotoCamera />
                    </IconButton>
                  </label>
                  <IconButton color="primary" aria-label="make picture" component="span">
                      <DeleteIcon />
                  </IconButton>
                 </Stack>
                </Paper>
              </Grid>
              </Grid>
              EMAILS
              <Grid container spacing={2} rowSpacing={2} justifyContent="flex-start" alignItems="flex-start" marginTop={2} marginBottom={6}>
              <Grid item xs={12} md={6} sm={6}>
                <TextField
                    id="homeemail"
                    label="Email Home"
                    defaultValue=""
                    helperText="Enter your best mail (required)"
                    variant="standard"
                    fullWidth
                    onChange={handleChange}
                    color={!emailValid ? "error" : "primary"}
                    focused
                    required
                    />
              </Grid>
              <Grid item xs={12} md={6} sm={6}>
                <TextField
                    id="workemail"
                    label="Email Work"
                    defaultValue=""
                    helperText="Enter your best mail"
                    variant="standard"
                    fullWidth
                    onChange={handleChange}
                    color={!emailWorkValid ? "error" : "primary"}
                    focused
                    required
                    />
              </Grid>
              </Grid>

              ADDRESS
              <Grid container spacing={2} rowSpacing={2} justifyContent="flex-start" alignItems="flex-start" marginTop={2} marginBottom={6}>
              <Grid item xs={12} md={8} sm={8}>
                <TextField
                    id="streetAddress"
                    label="Street"
                    defaultValue=""
                    helperText="Enter your street and number"
                    variant="standard"
                    fullWidth
                    onChange={handleChange}
                    focused
                    />
              </Grid>
              <Grid item xs={12} md={4} sm={4}>
                <TextField
                    id="city"
                    label="City or Town"
                    defaultValue=""
                    helperText="Enter your city or town"
                    variant="standard"
                    fullWidth
                    onChange={handleChange}
                    focused
                    />
              </Grid>

              <Grid item xs={12} md={5} sm={5}>
                <TextField
                    id="province"
                    label="Province / State"
                    defaultValue="+"
                    helperText="Enter your province or state"
                    variant="standard"
                    fullWidth
                    onChange={handleChange}
                    focused
                    />
              </Grid>
              <Grid item xs={12} md={3} sm={3}>
                <TextField
                    id="postalCode"
                    label="Postal Code"
                    defaultValue="00800"
                    helperText="Enter your Postal Code"
                    variant="standard"
                    fullWidth
                    onChange={handleChange}
                    focused
                    />
              </Grid>
              <Grid item xs={12} md={4} sm={4}>
                <TextField
                    id="country"
                    label="Country"
                    defaultValue="España"
                    helperText="Enter a valid country"
                    variant="standard"
                    fullWidth
                    onChange={handleChange}
                    focused
                    />
              </Grid>
              </Grid>
              PHONES
              <Grid container spacing={2} rowSpacing={2} justifyContent="flex-start" alignItems="flex-start" marginTop={2} marginBottom={6}>

              <Grid item xs={12} md={4} sm={4}>
                <TextField
                    id="homephone"
                    label="Home Phone"
                    defaultValue="+"
                    helperText="Enter a valid phone number with international prefix"
                    variant="standard"
                    fullWidth
                    onChange={handleChange}
                    color={homphoneValid ? "success" : "primary"}
                    focused
                    />
              </Grid>
              <Grid item xs={12} md={4} sm={4}>
                <TextField
                    id="mobilephone"
                    label="Mobile Phone"
                    defaultValue="+"
                    helperText="Enter a valid phone number with international prefix"
                    variant="standard"
                    fullWidth
                    onChange={handleChange}
                    color={mobilephoneValid ? "success" : "primary"}
                    focused
                    />
              </Grid>
              <Grid item xs={12} md={4} sm={4}>
                <TextField
                    id="whatsapp"
                    label="Whatsapp"
                    value = {whatsAppValue}
                    helperText="Enter a valid phone number with international prefix"
                    variant="standard"
                    fullWidth
                    onChange={handleChange}
                    color={whatsappValid ? "success" : "primary"}
                    focused
                    InputProps={{
                      endAdornment: <InputAdornment position="start">
                       <Button size='small' onClick={WhatsappPick}>PICK FROM Mobile</Button>
                      </InputAdornment>,
                    }}
                    />
              </Grid>
            </Grid>
            SOCIAL NETWORKS
                    
            <Grid container spacing={2} rowSpacing={2} justifyContent="space-evenly" alignItems="center" marginTop={2} marginBottom={6}>
           
              <Item>
              <Grid item xs={12} md={12} sm={12}>
                <TextField
                    id="socialmedia1"
                    label="Social Media 1"
                    name= "social1"
                    select
                    helperText="Select a social network"
                    variant="standard"
                    value={socialValue.social1}
                    fullWidth
                    onChange={handleChange}
                    focused
                    >
                    {socialNetworks.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                          <ListItemIcon>
                            {option.icon}
                            {option.value}
                          </ListItemIcon>
                      </MenuItem>
                    ))}  
                </TextField>
              </Grid>
              <Grid item xs={12} md={12} sm={12}>
                <TextField
                    id="socialuser1"
                    label="Social Media User"
                    defaultValue="@"
                    helperText="Select a user with @ o /"
                    variant="standard"
                    fullWidth
                    onChange={handleChange}
                    color={mobilephoneValid ? "success" : "primary"}
                    focused
                    />
              </Grid>
              </Item>
              <Item>
              <Grid item xs={12} md={12} sm={12}>
              <TextField
                    id="socialmedia2"
                    label="Social Media 2"
                    name= "social2"
                    select
                    helperText="Select a social network"
                    variant="standard"
                    value={socialValue.social2}
                    fullWidth
                    onChange={handleChange}
                    focused
                    >
                    {socialNetworks.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                          <ListItemIcon>
                            {option.icon}
                            {option.value}
                          </ListItemIcon>
                      </MenuItem>
                    ))}  
                </TextField>
              </Grid>
              <Grid item xs={12} md={12} sm={12}>
                <TextField
                    id="socialuser2"
                    label="Social Media User"
                    defaultValue="@"
                    helperText="Select a user with @ o /"
                    variant="standard"
                    fullWidth
                    onChange={handleChange}
                    color={mobilephoneValid ? "success" : "primary"}
                    focused
                    />
              </Grid>
              </Item>

              <Item>
              <Grid item xs={12} md={12} sm={12}>
              <TextField
                    id="socialmedia3"
                    label="Social Media 3"
                    name= "social3"
                    select
                    helperText="Select a social network"
                    variant="standard"
                    value={socialValue.social3}
                    fullWidth
                    onChange={handleChange}
                    focused
                    >
                    {socialNetworks.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                          <ListItemIcon>
                            {option.icon}
                            {option.value}
                          </ListItemIcon>
                      </MenuItem>
                    ))}  
                </TextField>
              </Grid>
              <Grid item xs={12} md={12} sm={12}>
                <TextField
                    id="socialuser3"
                    label="Social Media User"
                    defaultValue="@"
                    helperText="Select a user with @ o /"
                    variant="standard"
                    fullWidth
                    onChange={handleChange}
                    color={mobilephoneValid ? "success" : "primary"}
                    focused
                    />
              </Grid>
              </Item>
            </Grid>
            <Button
                type="submit"
                fullWidth
                color="success"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
               CREAR CLIENTE
              </Button>
              <Button
               
                fullWidth
                variant="contained"
                color = "error"
                sx={{ mt: 3, mb: 2 }}
              >
               CANCELAR
              </Button>
          
           
           
          </Container>
          <Copyright sx={{ pt: 4 }} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function AddCustomer() {
  return <AddCustomerContent />;
}