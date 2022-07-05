import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Alert, Button, Card, MenuItem, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/system';

const getDocumentList = ()=>[

    // TODO: Get list from API
    "osteopatia-consent-es-ES.html",
    "osteopatia-consent-ca-CA.html"
]
  
export default function ReleaseFormComp(props) {
    
  var initValidation={
    blueprint:"",
    file:"",
    signed:false,
    attachment:[]
  }
  const [releaseFrm, setReleaseFrm] = React.useState(initValidation);
  
  React.useEffect (()=>{

    },[])
 
  const { t } = useTranslation();
  

  const handleConsentFormChange = (event)=>{
 
    //OBTENER EL RELEASE FORM DEL API, Y RELLENAR CON DATOS
    //EL NOMBRE DEL ARCHIVO FINAL DEBE PROVENIR DE LA API
    setReleaseFrm({...releaseFrm, "blueprint":event.target.value, "file":"/releases/1_rf.pdf"})
  }

  const handleSeeConsentClick = (event)=>{

  }

  const handlePrintConsentClick = (event) => {

  }

  const handleSendByEmailClick = (event) => {

  }

  const handleSignConsentClick = (event) => {

  }

  return (
    <React.Fragment>
       
        <Box  >

                {/* RELEASEFORM */}

              <Typography variant="h6" color="text.secondary" align="center" sx={{mt:2}}>
                {t("releaseform")}
              </Typography>
              
              <Grid item xs={12} md={12} sm={12} marginTop={3}>
                
                <Card sx={{ display: 'flex',  width: '100%', mt:2, p:1  }}>
                <TextField
                    id="select-consent-form"
                    select
                    label={t("selecttheconsentform")}
                    value={releaseFrm.blueprint}
                    onChange={handleConsentFormChange}
                    helperText={t("selecttheconsentform")}
                    variant="standard"
                    sx={{mr:2, width:"40%"}}
                    
                    >
                    {getDocumentList().map((option) => (
                        <MenuItem key={option} value={option}>
                        {option}
                        </MenuItem>
                    ))}
                </TextField>
                <Button variant='outlined' onClick={handleSeeConsentClick} sx={{mr:2}}>
                    {t("see")}
                </Button>
                <Button variant='outlined' onClick={handlePrintConsentClick} sx={{mr:2}}> 
                    {t("print")}
                </Button>
                <Button variant='outlined' onClick={handleSendByEmailClick} sx={{mr:2}}>
                    {t("sendbyemail")}
                </Button>
                <Button variant='outlined' onClick={handleSignConsentClick} sx={{mr:2}}>
                    {t("interactivesignature")}
                </Button>
                
                </Card>
                {releaseFrm.signed? <Alert severity="success">{t("consentsigned")}</Alert>:<Alert severity="warning">{t("consentnotsigned")}</Alert>}
                {releaseFrm.file? <p>Archivo de consentimiento: {releaseFrm.file}</p>:<></>}
              </Grid>
             
        </Box>
    </React.Fragment>
  )
}
