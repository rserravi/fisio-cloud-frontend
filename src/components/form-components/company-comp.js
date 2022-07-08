import { Autocomplete, Box, Button, ButtonBase, Card, Grid, IconButton, InputAdornment, ListItemIcon, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { countries, getCompanyData} from '../../utils/dataFetch-utils';
import { socialNetworks } from '../../utils/social-networks-utils';
//ICONS
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from '@emotion/styled';

const InitData = {
    name: "",
    logo: "",
    nifCif: "",
    type: "",
    emailhome: "",
    emailwork: "",
    streetaddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    homephone: "",
    mobilephone: "",
    whatsapp: "",
    social1: "Facebook",
    social2: "Twitter",
    social3: "Instagram",
    socialUser1:"@",
    socialUser2:"@",
    socialUser3:"@"
}

export default function CompanyForm() {
    const { t,  } = useTranslation();
    const [companyFrmDt, setCompanyFrmDt] = React.useState(InitData);
    React.useEffect (()=>{
        const loadedfrmData = getCompanyData();
        setCompanyFrmDt(loadedfrmData)
      
      },[])
     

    const handleTextChange = (event) =>{
        setCompanyFrmDt({...companyFrmDt, [event.target.name]: event.target.value})
    }

    
    const WhatsappPick = () => {
        setCompanyFrmDt({...companyFrmDt, "whatsapp":companyFrmDt.mobilephone});
    }

    function handleFileChange(e) {
        setCompanyFrmDt({...companyFrmDt, "logo": URL.createObjectURL(e.target.files[0])}); 
    }
       
    const deletePicture = () =>{
        setCompanyFrmDt({...companyFrmDt, "logo":""}); 
    }

    const HandleSubmit = ()=>{
        console.log("Handle submited", companyFrmDt)
    }

    const resetData = ()=>{
        setCompanyFrmDt(InitData);
    }

    const Input = styled('input')({
        display: 'none',
      });


    return (
        <React.Fragment>
        {/*  PRIMERA FILA*/}
        <Grid container spacing={2} rowSpacing={2} justifyContent="flex-start" alignItems="flex-start">
            <Grid item xs={12} md={10} sm={10} marginTop={3}>
           
           <Typography variant="h4" align="left" component="h2" sx={{mb:6}}>{t("companydata")}</Typography>
                 {/*  NAME CARD */}
                <Card sx={{ display: 'flex',  width: '100%'  }}>
                
                    <Box sx={{ display: 'flex', flexDirection: 'column', width:'100%', m:2 }}>
                        <Grid container >
                          <Grid item xs={12} sm={3} md={3} sx={{mt:2, mr:1}} >
                            <TextField
                            id="companyName"
                            name='name'
                            label={t("companyName")}
                            helperText={t("enterthecompany")}
                            variant="standard"
                            focused
                            fullWidth
                            value={companyFrmDt.name}
                            onChange={handleTextChange}
                            required
                            sx = {{mr:2}}
                            />
                         </Grid>
                         <Grid item xs={12} sm={3} md={3} sx={{mt:2, mr:1}}>
                            <TextField
                            id="nifCif"
                            name='nifCif'
                            label={t("nifCif")}
                            helperText={t("enteravalidnifcif")}
                            variant="standard"
                            focused
                            fullWidth
                            value={companyFrmDt.nifCif}
                            onChange={handleTextChange}
                            required
                            sx = {{mr:2}}
                            />
                        </Grid>
                         <Grid item xs={12} sm={4} md={4} sx={{mt:2}}>
                             <TextField
                            id="type"
                            name='type'
                            label={t("type")}
                            helperText={t("entercompanytype")}
                            variant="standard"
                            focused
                            fullWidth
                            value={companyFrmDt.type}
                            onChange={handleTextChange}
                            required
                            sx = {{mr:2}}
                            />
                         </Grid>
                        </Grid>
                    </Box> 
                </Card>
             </Grid>
            {/*  image CARD */}
            <Grid item xs={12} md={2} sm={12} marginTop={3}>
                <Paper>
                    <ButtonBase height="160" width="160">   
                        <img width={155} height={155} src={companyFrmDt.logo} alt="Upload"></img>
                        
                    </ButtonBase>
                    <Stack direction="row" alignItems="center" spacing={2}>
                    <label htmlFor="upload-button">
                        <Input accept="image/*" id="upload-button" type="file" onChange={handleFileChange}/>
                        <IconButton color="primary" aria-label="upload picture" component="span">
                        <UploadIcon />
                        </IconButton>
                    </label>
                    
                    <IconButton color="primary" aria-label="make picture" component="span" onClick={deletePicture}>
                        <DeleteIcon />
                    </IconButton>
                    </Stack>
                </Paper>
            </Grid>
        </Grid> 
        {/*  SEGUNDA FILA*/}
        <Grid container spacing={2} rowSpacing={2} justifyContent="flex-start" alignItems="flex-start">
            <Grid item xs={12} md={12} sm={12} marginTop={0.5}>
                <Card sx={{ display: 'flex',  width: '100%'  }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width:'100%', m:2 }}>
                        <Grid container>
                          <Grid item xs={12} sm={5} md={5} sx={{mt:2, mr:2}}>
                            <TextField
                            id="emailhome"
                            name='emailhome'
                            label={t("homemail")}
                            helperText={t("enteryour")+t("bestmail")+" ("+t("required")+")"}
                            variant="standard"
                            fullWidth
                            value={companyFrmDt.emailhome}
                            onChange={handleTextChange}
                            required
                            focused
                            sx = {{mr:2}}
                            />
                            </Grid>
                             <Grid item xs={12} sm={5} md={5} sx={{mt:2}}>
                            <TextField
                            id="emailwork"
                            name="emailwork"
                            label={t("workmail")}
                            helperText={t("enteryour")+t("bestmail")+" ("+t("required")+")"}
                            variant="standard"
                            fullWidth
                            focused
                            value={companyFrmDt.emailwork}
                            sx = {{mr:2}}
                            onChange={handleTextChange}
                            required
                            />
                            </Grid>
                        </Grid>

                        </Box> 
                    </Card>
                </Grid>
        </Grid>
         {/*  Tercera FILA*/}
         <Grid container spacing={2} rowSpacing={2} justifyContent="flex-start" alignItems="flex-start">
            <Grid item xs={12} md={12} sm={12} marginTop={0.5}>
                <Card sx={{ display: 'flex',  width: '100%'  }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width:'100%', m:2 }}>
                        <Grid container >
                        <Grid item xs={12} sm={3} md={3}sx={{mt:2, mr:2}}>
                        <TextField
                            id="homephone"
                            name="homephone"
                            label={t("home phone")}
                            helperText={t("enteravalidphone")}
                            variant="standard"
                            fullWidth
                            focused
                            value={companyFrmDt.homephone}
                            onChange={handleTextChange}
                            sx = {{mr:2}}
                            
                            />
                            </Grid>
                             <Grid item xs={12} sm={3} md={3} sx={{mt:2, mr:2}}>
                            <TextField
                            id="mobilephone"
                            name="mobilephone"
                            label={t("mobile phone")}
                            helperText={t("enteravalidphone")}
                            variant="standard"
                            fullWidth
                            focused
                            value={companyFrmDt.mobilephone}
                            sx = {{mr:2}}
                            onChange={handleTextChange}
                            required
                            />
                            </Grid>
                             <Grid item xs={12} sm={5} md={5} sx={{mt:2, mr:2}}>
                            <TextField
                            id="whatsapp"
                            name="whatsapp"
                            label="Whatsapp"
                            focused
                            value = {companyFrmDt.whatsapp}
                            helperText={t("enteravalidphone")}
                            variant="standard"
                            fullWidth
                            onChange={handleTextChange}
                            InputProps={{
                                endAdornment: <InputAdornment position="start">
                                <Button size='small' onClick={WhatsappPick}>{t("pick form mobile")}</Button>
                                </InputAdornment>,
                            }}
                            />
                        </Grid>
                        </Grid>

                    </Box> 
                </Card>
            </Grid>
            
        </Grid>
        <Grid container spacing={2} rowSpacing={2} justifyContent="flex-start" alignItems="flex-start">
            <Grid item xs={12} md={12} sm={12} marginTop={0.5}>
            <Card sx={{ display: 'flex',  width: '100%'  }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', width:'100%', m:2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', width:'100%'  }}>
                <TextField
                    id="streetaddress"
                    name="streetaddress"
                    label={t("street")}
                    helperText={t("enteryour") + " "+ t("street") + " "+t("andnumber")}
                    variant="standard"
                    fullWidth
                    focused
                    value={companyFrmDt.streetaddress}
                    onChange={handleTextChange}     
                    />
                </Box>

                <Grid container>
                <Grid item xs={6} sm={3} md={3} sx={{mt:2}}>

                <TextField
                    id="city"
                    name="city"
                    label={t("cityortown")}
                    helperText={t("enteryour") + t("cityortown")}
                    variant="standard"
                    fullWidth
                    focused
                    sx = {{mr:2}}
                    value={companyFrmDt.city}
                    onChange={handleTextChange}
                    
                    />
                </Grid>
                <Grid item xs={6} sm={3} md={3} sx={{mt:2}}>
             
                <TextField
                    id="state"
                    name="state"
                    label={t("state")}
                    helperText={t("enteryour")+" "+t("state")}
                    variant="standard"
                    fullWidth
                    focused
                    sx = {{mr:2}}
                    value={companyFrmDt.state}
                    onChange={handleTextChange}
                    
                    />
                  </Grid>
                <Grid item xs={6} sm={3} md={3} sx={{mt:2}}>
                <TextField
                    id="postalCode"
                    name="postalCode"
                    label={t("postalcode")}
                    helperText={t("enteryour")+" " + t("postalcode")}
                    variant="standard"
                    fullWidth
                    focused
                    sx = {{mr:2}}
                    value={companyFrmDt.postalCode}
                    onChange={handleTextChange}
                    
                    />
                  </Grid>
                <Grid item xs={6} sm={3} md={3} sx={{mt:2}}>
                <Autocomplete
                    id="country"
                    fullWidth
                    options={countries}
                    variant="standard"
                    label={t("country")}
                    onChange={handleTextChange}
                    autoHighlight
                    getOptionLabel={(option) => option.label}
                    renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        <img
                            loading="lazy"
                            width="20"
                            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                            alt=""
                        />
                        {option.label} 
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                        {...params}
                        variant="standard"
                        value={companyFrmDt.country}
                        focused
                        helperText={t("enteravalidcountry")}
                        label={t("country")}
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                        />
                    )}
                    />
                    </Grid>
                </Grid>
              </Box>

              </Card>
                </Grid>
        </Grid>
        {/*  QUINTA FILA*/}
        <Grid container spacing={2} rowSpacing={2} justifyContent="flex-start" alignItems="flex-start">
            <Grid item xs={12} md={12} sm={12} marginTop={0.5}>
            <Card sx={{ display: 'flex',  width: '100%'  }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width:'100%', m:2 }}>
           
            <Box sx={{ display: 'flex', flexDirection: 'row', width:'100%' }}>
              
                <TextField
                    id="social1"
                    label="Social Media 1"
                    name= "social1"
                    select
                    helperText={t("selectasocialnetwork")}
                    variant="standard"
                    value={companyFrmDt.social1}
                    onChange={handleTextChange}
                    fullWidth
                    sx = {{mr:2, textAlign:'left'}}
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
                <TextField
                    id="social2"
                    label="Social Media 2"
                    name= "social2"
                    select
                    helperText={t("selectasocialnetwork")}
                    variant="standard"
                    value={companyFrmDt.social2}
                    fullWidth
                    onChange={handleTextChange}
                    focused
                    sx = {{mr:2, textAlign:'left'}}
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
                <TextField
                    id="social3"
                    label="Social Media 3"
                    name= "social3"
                    helperText={t("selectasocialnetwork")}
                    variant="standard"
                    value={companyFrmDt.social3}
                    fullWidth
                    select
                    focused
                    onChange={handleTextChange}
                    sx = {{mr:2, textAlign:'left'}}
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
        
   
              </Box>
             
              <Box sx={{ display: 'flex', flexDirection: 'row', width:'100%' }}>
               
              
                <TextField
                    id="socialUser2"
                    name="socialUser2"
                    label={t("socialmediauser")}
                    helperText={t("selectauser")}
                    variant="standard"
                    value={companyFrmDt.socialUser2}
                    fullWidth
                    onChange={handleTextChange}
                    focused
                    />
                        <TextField
                    id="socialUser1"
                    name="socialUser1"
                    label={t("socialmediauser")}
                    helperText={t("selectauser")}
                    variant="standard"
                    value={companyFrmDt.socialUser1}
                    fullWidth
                    onChange={handleTextChange}
                    focused
                    
                    />

                <TextField
                    id="socialUser3"
                    name="socialUser3"
                    label={t("socialmediauser")}
                    helperText={t("selectauser")}
                    value={companyFrmDt.socialUser3}
                    variant="standard"
                    fullWidth
                    onChange={handleTextChange}
                    focused
                    />
            
                </Box>
              </Box>
            </Card>
                </Grid>
        </Grid>
        <Box sx={{ display: 'flex', flexDirection: 'row', width:'100%', m:2 }}>
            <Button
                type="submit"
                fullWidth
                color="success"
                variant="contained"
                onClick={HandleSubmit}
                sx={{ m:3}}
              >
               {t("updatecompany")}
              </Button>
              <Button
               
                fullWidth
                variant="contained"
                color = "error"
                onClick={resetData}
                sx={{ m:3 }}
              >
               {t("cancel")}
              </Button>
              </Box>
        </React.Fragment>
    )
}