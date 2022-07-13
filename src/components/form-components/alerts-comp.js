import { Button, FormControlLabel, Grid, TextField } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { useTranslation } from 'react-i18next';
import * as React from 'react';
import { GetAlertsData } from '../../utils/dataFetch-utils';

const alertsData = GetAlertsData();
const alertInit = {
    showAppoAlerts : alertsData.showAppoAlerts,
    showCommAlerts : alertsData.showCommAlerts,
    showPast: alertsData.showPast,
    showComming: alertsData.showComming,
    pastDaysPeriod: alertsData.pastDaysPeriod,
    commingDaysPeriod: alertsData.commingDaysPeriod
}

export default function AlertsForm() {
    const { t } = useTranslation();
    const [alerts, SetAlerts]= React.useState(alertInit)

    const handleChangeChecked = (event) =>{
        SetAlerts({...alerts, [event.target.name]:event.target.checked})
    }
    const handleChangeTextfield = (event) =>{
        SetAlerts({...alerts, [event.target.name]:event.target.value})
    }
    const HandleSubmit = (event)=>{
        console.log(alerts)

    }

    const resetData = (event) =>{
        SetAlerts(alertInit);
    }

    return (
        <React.Fragment>

           <h3>{t("alerts")}</h3>
           <p>{t("definehowmuchinfoyouwantyoseeinalerts")} </p>
           <Grid container justifyContent="flex-start" alignItems="flex-start" sx={{mb:2}}> 
                <Grid item xs={12} sm={12} md={12} >
                    <FormControlLabel
                            label={t("showappoinmentalerts")}
                            control={<Checkbox name={"showAppoAlerts"} checked={alerts.showAppoAlerts} onChange={handleChangeChecked} />}
                        />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <FormControlLabel
                        label={t("showcommunicactionalerts")}
                        control={<Checkbox name={"showCommAlerts"} checked={alerts.showCommAlerts} onChange={handleChangeChecked} />}
                    />
                </Grid>
            </Grid>
            <Grid container justifyContent="center" alignItems="flex-start" rowSpacing={{xs:1}}> 
                <Grid item xs={5} sm={5} md={5} >
                    <FormControlLabel
                        label={t("showpastalerts")}
                        control={<Checkbox name={"showPast"} checked={alerts.showPast} onChange={handleChangeChecked} />}
                    />
                </Grid>
                <Grid item xs={5} sm={5} md={5} >
                    <TextField
                        id="pastDaysPeriod"
                        name="pastDaysPeriod"
                        label={t("pastDaysPeriod")}
                        value={alerts.pastDaysPeriod}
                        onChange={handleChangeTextfield}
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}  
                    />
                </Grid>
                <Grid item xs={5} sm={5} md={5} >
                    <FormControlLabel
                        label={t("showcommingalerts")}
                        control={<Checkbox name={"showComming"} checked={alerts.showComming} onChange={handleChangeChecked} />}
                    />
                </Grid>
                <Grid item xs={5} sm={5} md={5} >
                    <TextField
                        id="commingDaysPeriod"
                        name="commingDaysPeriod"
                        label={t("commingDaysPeriod")}
                        value={alerts.commingDaysPeriod}
                        onChange={handleChangeTextfield}
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
            </Grid>
            <Grid container justifyContent="space-evenly" alignItems="flex-start" sx={{mt:4}}> 
            <Grid item xs={12} sm={5.8} md={5.8} sx={{ mr:2 }}>
                <Button
                type="submit"
                fullWidth
                color="success"
                variant="contained"
                onClick={HandleSubmit}
                sx={{ mr:2}}
              >
               {t("update")}
              </Button>
            </Grid>
            <Grid item xs={12} sm={5.8} md={5.8} >
              <Button
               
                fullWidth
                variant="contained"
                color = "error"
                onClick={resetData}
                sx={{ mr:2 }}
              >
               {t("reset")}
              </Button>
            </Grid>
            </Grid>
            
        </React.Fragment>
    )
}