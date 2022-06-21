import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, ButtonBase, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { CustomerValidation, EmailValidation, PhoneVerification, ShortTextValidation } from '../utils/verification-utils';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';
import InputAdornment from '@mui/material/InputAdornment';
import { socialNetworks } from '../utils/social-networks-utils';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/system';
import Webcam from "react-webcam";

export default function CustomerForm() {

  const { t, i18n } = useTranslation();

  const handleSubmit = (event)=>{
    event.preventDefault();

    frmData.addedAt = new Date().toLocaleDateString();
    const frmValidation = CustomerValidation(frmData);
    console.log(frmData);
    console.log(frmValidation)

    /// API PARA ENVIAR EL FORMULARIO AL BACKEND

    // NAVIGATE TO SEECUSTOMER(_id);
  }

 
  const frmDataInit = {
    firstname:"",
    lastname:"",
    image: "images/Portrait_Placeholder.png",
    emailhome:"",
    emailwork:"",
    streetaddress: "",
    city:"",
    state:"",
    postalCode:"",
    country:"Spain",
    homephone:"",
    mobilephone:"+34",
    whatsapp:"+34",
    social1: "Facebook",
    social2: "Twitter",
    social3: "Instagram",
    socialUser1:"@",
    socialUser2:"@",
    socialUser3:"@",
    addedAt: null
  }

  const [nameValid, setNameValid] = React.useState(false);
  const [lastnameValid, setLastNameValid] = React.useState(false);
  const [emailValid, setEmailValid] = React.useState(true);
  const [emailWorkValid, setEmailWorkValid] = React.useState(true);
  const [mobilephoneValid, setMobilephoneValid] = React.useState(false);  
  const [homphoneValid, setHomephoneValid] = React.useState(false);
  const [whatsappValid, setWhatsappValid] = React.useState(false);

  const [frmData, setFrmData] = React.useState(frmDataInit);
  const [webcamShow, setWebcamShow] = React.useState(false); 
 

  const WhatsappPick = () => {
    
    setFrmData({...frmData, ["whatsapp"]:frmData.mobilephone});
  }

  const handleChange = (event) => {
  
    const {id, name, value} = event.target;
    setFrmData({...frmData, [name]:value});
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
        break;
      case "whatsapp":
        setWhatsappValid(PhoneVerification(value));
        break;
      default:
        break;
    }
  };

  const videoConstraints = {
    width: 160,
    height: 160,
    facingMode: "user"
  };

  const webcamRef = React.useRef(null);
  const getWebcamShot = ()=>{
    if (!webcamShow){
        setWebcamShow(true);
    }
    else {
        const image = capture();
        setFrmData({...frmData,["image"]:image});
        setWebcamShow(false);
    }
  }
  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      return imageSrc
    },
    [webcamRef]
  );

  const deletePicture = () =>{
    setFrmData({...frmData,["image"]: "images/Portrait_Placeholder.png"})
  }

  function handleFileChange(e) {
    setFrmData({...frmData, ["image"]:(URL.createObjectURL(e.target.files[0]))});
    }
  const resetData= ()=>{
    setFrmData(frmDataInit);
  }

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
    <React.Fragment>
       
        <Box component="form" noValidate onSubmit={handleSubmit} >
            <Grid container spacing={2} justifyContent="flex-start" alignItems="flex-start">
             <Grid item xs={12}>
                <Item>
                     <Typography variant="h4" component="h2">{t("addnewcustomer")}</Typography> 
                </Item>
              </Grid>
            </Grid>
            
            {t("NAMEANDIMAGE")}
            <Grid container spacing={2} rowSpacing={2} justifyContent="flex-start" alignItems="flex-start">
              
              <Grid item xs={12} md={10} sm={10} marginTop={3}>
                <Grid item xs={12}  md={2} sm={4} >
                  <TextField
                      id="firstname"
                      name='firstname'
                      label={t("name")}
                      helperText={t("enteryour")+t("name")+" ("+t("required")+")"}
                      variant="standard"
                      fullWidth
                      value={frmData.firstname}
                      onChange={handleChange}
                      color={nameValid ? "success" : "primary"}
                      focused
                      required
                      />
                </Grid>
                <Grid item xs={12} md={5} sm={8} marginTop={2}>
                  <TextField
                      id="lastname"
                      name="lastname"
                      label={t("lastname")}
                      helperText={t("enteryour_plural")+t("lastname")+" ("+t("required")+")"}
                      variant="standard"
                      fullWidth
                      value={frmData.lastname}
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
                    
                        {webcamShow ? <Webcam
                            audio={false}
                            height={160}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            width={160}
                            videoConstraints={videoConstraints}
                        /> : <img maxWidth="155" width={155} height={155} src={frmData.image} alt="Upload"></img>}
                </ButtonBase>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <label htmlFor="upload-button">
                    <Input accept="image/*" id="upload-button" type="file" onChange={handleFileChange}/>
                    <IconButton color="primary" aria-label="upload picture" component="span">
                     
                      <UploadIcon />
                    </IconButton>
                  </label>
                  <label htmlFor="camera-button">
                 
                    <IconButton color={!webcamShow?"primary":"success"} aria-label="make picture" component="span" onClick={getWebcamShot}>
                      <PhotoCamera />
                    </IconButton>
                  </label>
                  <IconButton color="primary" aria-label="make picture" component="span" onClick={deletePicture}>
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
                    name="homeemail"
                    label={t("homemail")}
                    helperText={t("enteryour")+t("bestmail")+" ("+t("required")+")"}
                    variant="standard"
                    fullWidth
                    value={frmData.homeemail}
                    onChange={handleChange}
                    color={!emailValid ? "error" : "primary"}
                    focused
                    required
                    />
              </Grid>
              <Grid item xs={12} md={6} sm={6}>
                <TextField
                    id="emailwork"
                    name="emailwork"
                    label={t("workmail")}
                    helperText={t("enteryour")+t("bestmail")+" ("+t("required")+")"}
                    variant="standard"
                    fullWidth
                    value={frmData.emailwork}
                    onChange={handleChange}
                    color={!emailWorkValid ? "error" : "primary"}
                    focused
                    required
                    />
              </Grid>
              </Grid>

              {t("ADDRESS")}
              <Grid container spacing={2} rowSpacing={2} justifyContent="flex-start" alignItems="flex-start" marginTop={2} marginBottom={6}>
              <Grid item xs={12} md={8} sm={8}>
                <TextField
                    id="streetaddress"
                    name="streetaddress"
                    label={t("street")}
                    helperText={t("enteryour") + " "+ t("street") + " "+t("andnumber")}
                    variant="standard"
                    fullWidth
                    value={frmData.streetaddress}
                    onChange={handleChange}
                    focused
                    />
              </Grid>
              <Grid item xs={12} md={4} sm={4}>
                <TextField
                    id="city"
                    name="city"
                    label={t("cityortown")}
                    helperText={t("enteryour") + t("cityortown")}
                    variant="standard"
                    fullWidth
                    value={frmData.city}
                    onChange={handleChange}
                    focused
                    />
              </Grid>

              <Grid item xs={12} md={5} sm={5}>
                <TextField
                    id="state"
                    name="state"
                    label={t("state")}
                    helperText={t("enteryour")+" "+t("state")}
                    variant="standard"
                    fullWidth
                    value={frmData.state}
                    onChange={handleChange}
                    focused
                    />
              </Grid>
              <Grid item xs={12} md={3} sm={3}>
                <TextField
                    id="postalCode"
                    name="postalCode"
                    label={t("postalcode")}
                    helperText={t("enteryour")+" " + t("postalcode")}
                    variant="standard"
                    fullWidth
                    value={frmData.postalCode}
                    onChange={handleChange}
                    focused
                    />
              </Grid>
              <Grid item xs={12} md={4} sm={4}>
                <TextField
                    id="country"
                    name="country"
                    label={t("country")}
                    helperText={t("enteravalidcountry")}
                    variant="standard"
                    fullWidth
                    value={frmData.country}
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
                    name="homephone"
                    label={t("home phone")}
                    helperText={t("enteravalidphone")}
                    variant="standard"
                    fullWidth
                    value={frmData.homephone}
                    onChange={handleChange}
                    color={homphoneValid ? "success" : "primary"}
                    focused
                    />
              </Grid>
              <Grid item xs={12} md={4} sm={4}>
                <TextField
                    id="mobilephone"
                    name="mobilephone"
                    label={t("mobile phone")}
                    helperText={t("enteravalidphone")}
                    variant="standard"
                    fullWidth
                    value={frmData.mobilephone}
                    onChange={handleChange}
                    color={mobilephoneValid ? "success" : "primary"}
                    focused
                    />
              </Grid>
              <Grid item xs={12} md={4} sm={4}>
                <TextField
                    id="whatsapp"
                    name="whatsapp"
                    label="Whatsapp"
                    value = {frmData.whatsapp}
                    helperText={t("enteravalidphone")}
                    variant="standard"
                    fullWidth
                    onChange={handleChange}
                    color={whatsappValid ? "success" : "primary"}
                    focused
                    InputProps={{
                      endAdornment: <InputAdornment position="start">
                       <Button size='small' onClick={WhatsappPick}>{t("pick form mobile")}</Button>
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
                    id="social1"
                    label="Social Media 1"
                    name= "social1"
                    select
                    helperText={t("selectasocialnetwork")}
                    variant="standard"
                    value={frmData.social1}
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
                    id="socialUser1"
                    name="socialUser1"
                    label={t("socialmediauser")}
                    helperText={t("selectauser")}
                    variant="standard"
                    value={frmData.socialUser1}
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
                    id="social2"
                    label="Social Media 2"
                    name= "social2"
                    select
                    helperText={t("selectasocialnetwork")}
                    variant="standard"
                    value={frmData.social2}
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
                    id="socialUser2"
                    name="socialUser2"
                    label={t("socialmediauser")}

                    helperText={t("selectauser")}
                    variant="standard"
                    value={frmData.socialUser2}
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
                    id="social3"
                    label="Social Media 3"
                    name= "social3"
                    select
                    helperText={t("selectasocialnetwork")}
                    variant="standard"
                    value={frmData.social3}
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
                    id="socialUser3"
                    name="socialUser3"
                    label={t("socialmediauser")}
                    value={frmData.socialUser3}
                    helperText={t("selectauser")}
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
               {t("createcustomer")}
              </Button>
              <Button
               
                fullWidth
                variant="contained"
                color = "error"
                onClick={resetData}
                sx={{ mt: 3, mb: 2 }}
              >
               {t("cancel")}
              </Button>
        </Box>
    </React.Fragment>
  )
}
