import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Alert, Button, Card, MenuItem, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/system';
import { useDispatch } from 'react-redux';
import { nc_releaseformFile, nc_releaseformGenerated } from '../../slices/newCustomer-slice';

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

  const [generatedFile, setGeneratedFile] = React.useState("");
  const [releaseFrm, setReleaseFrm] = React.useState(initValidation);

  const dispatch = useDispatch();
  
  React.useEffect (()=>{

    },[])
 
  const { t } = useTranslation();

  const handleConsentFormChange = (event)=>{
 
    //OBTENER EL RELEASE FORM DEL API, Y RELLENAR CON DATOS
    //EL NOMBRE DEL ARCHIVO FINAL DEBE PROVENIR DE LA API
    setGeneratedFile("/releases/1_rf.pdf")
    //FALLLO
    setReleaseFrm({...releaseFrm, "blueprint":event.target.value, "file":"/releases/1_rf.pdf"})
    dispatch(nc_releaseformFile("/releases/1_rf.pdf"));
    dispatch(nc_releaseformGenerated(true));
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
                  <Grid container justifyContent="flex-start" alignItems="flex-end">
                  <Grid item xs={12} sm={4} md={4} sx={{mt:2, mr:2}}>
                    <TextField
                        id="select-consent-form"
                        select
                        label={t("selecttheconsentform")}
                        value={releaseFrm.blueprint}
                        onChange={handleConsentFormChange}
                        helperText={t("selecttheconsentform")}
                        variant="standard"
                        fullWidth
                        sx={{mr:2}}
                        
                        >
                        {getDocumentList().map((option) => (
                            <MenuItem key={option} value={option}>
                            {option}
                            </MenuItem>
                        ))}
                    </TextField>
                   </Grid>
                   <Grid container justifyContent="flex-start" alignItems="flex-end"sx={{mt:1, mb:1}}>
                    <Button variant='outlined' onClick={handleSeeConsentClick} sx={{mr:2, mt:1}}>
                        {t("see")}
                    </Button>
                    <Button variant='outlined' onClick={handlePrintConsentClick} sx={{mr:2, mt:1}}> 
                        {t("print")}
                    </Button>
                    <Button variant='outlined' onClick={handleSendByEmailClick} sx={{mr:2, mt:1}}>
                        {t("sendbyemail")}
                    </Button>
                    <Button variant='outlined' onClick={handleSignConsentClick} sx={{mr:2, mt:1}}>
                        {t("interactivesignature")}
                    </Button>
                    </Grid>
                    </Grid>  
                    </Card>
                    {releaseFrm.signed? <Alert severity="success">{t("consentsigned")}</Alert>:<Alert severity="warning">{t("consentnotsigned")}</Alert>}
                    {releaseFrm.file? <p>Archivo de consentimiento: {releaseFrm.file}</p>:<></>}
              
              </Grid>
             
        </Box>
    </React.Fragment>
  )
}
