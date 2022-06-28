import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';
import Card from '@mui/material/Card';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { nc_city_Commit, nc_country_Commit, nc_emailHome_Commit, nc_emailWork_Commit, nc_postalCode_Commit, nc_state_Commit, nc_streetaddress_Commit } from '../../slices/newCustomer-slice';

export const AddressForm = (props) =>{
    const InitData = {
        streetaddress: props.streetaddress,
        city: props.city,
        state: props.state,
        postalCode: props.postalCode,
        country: props.country,
    }
    const dispatch = useDispatch();
    const [addressFrmDta, setAddressFrmData] = React.useState(InitData);

    const { t } = useTranslation();

    const handleChangeStreetAddress = (event) => {
        setAddressFrmData({...addressFrmDta, ["streetaddress"]: event.target.value})
        dispatch(nc_streetaddress_Commit(event.target.value))
    
      };

    const handleChangeCity = (event) => {
        setAddressFrmData({...addressFrmDta, ["city"]: event.target.value})
        dispatch(nc_city_Commit(event.target.value))

    };

    const handleChangeState= (event) => {
        setAddressFrmData({...addressFrmDta, ["state"]: event.target.value})
        dispatch(nc_state_Commit(event.target.value))

    };

    const handleChangePostalCode= (event) => {
        setAddressFrmData({...addressFrmDta, ["postalCode"]: event.target.value})
        dispatch(nc_postalCode_Commit(event.target.value))

    };

    const handleChangeCountry= (event) => {
        setAddressFrmData({...addressFrmDta, ["country"]: event.target.value})
        dispatch(nc_country_Commit(event.target.value))

    };

    return (
        <React.Fragment>
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
               
                    value={addressFrmDta.streetaddress}
                    onChange={handleChangeStreetAddress}     
                    />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'row', width:'100%', mt:2   }}>
                <TextField
                    id="city"
                    name="city"
                    label={t("cityortown")}
                    helperText={t("enteryour") + t("cityortown")}
                    variant="standard"
                    fullWidth
                    sx = {{mr:2}}
                    value={addressFrmDta.city}
                    onChange={handleChangeCity}
                    focused
                    />
             
                <TextField
                    id="state"
                    name="state"
                    label={t("state")}
                    helperText={t("enteryour")+" "+t("state")}
                    variant="standard"
                    fullWidth
                    sx = {{mr:2}}
                    value={addressFrmDta.state}
                    onChange={handleChangeState}
                    focused
                    />
              
                <TextField
                    id="postalCode"
                    name="postalCode"
                    label={t("postalcode")}
                    helperText={t("enteryour")+" " + t("postalcode")}
                    variant="standard"
                    fullWidth
                    sx = {{mr:2}}
                    value={addressFrmDta.postalCode}
                    onChange={handleChangePostalCode}
                    focused
                    />
              
                <TextField
                    id="country"
                    name="country"
                    label={t("country")}
                    helperText={t("enteravalidcountry")}
                    variant="standard"
                    fullWidth
                    value={addressFrmDta.country}
                    onChange={handleChangeCountry}
                    focused
                    />
                </Box>
              </Box>

              </Card>
        </React.Fragment>

    )
}
