import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { getCustomerList } from "../../utils/dataFetch-utils";
import { Autocomplete, Button } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { navigationLoading, navigationSuccess } from '../../slices/navigation-slice';

const data = getCustomerList();


  const filterData = (query) => {
    const newData = data.map(a=>a.customerName)
    if (!query) {
      return newData
    } else {
      return newData.filter((d) => d.toLowerCase().includes(query));
    }
  };



export default function CustomerSearchBar({customerFunc}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [custoName, setCustoName] = useState("");
    const { t } = useTranslation();

    const findOther = () =>{
      setCustoName("");
    }
    const addcustomer =  ()=>{
      dispatch(navigationLoading());
      navigate("/addcustomer",{replace: true});
      dispatch(navigationSuccess("Add Customer"))
    }
      
    return(
        <React.Fragment>

        {custoName?<></>:<Autocomplete 
                disablePortal
                id="searchCustomer"
                onChange={(event, newValue)=>{setCustoName(newValue)
                        customerFunc(newValue);
                }}
                options={filterData()}
                renderInput={(params) => <TextField {...params} label={t("searchcustomeroraddnew")} />}
            />
              }
            {custoName?<Button size="small" onClick={findOther}>{t("finddifferentcustomer")}</Button>:<Button onClick={addcustomer} sx={{mt:3}} variant="contained">{t("newcustomer")}</Button>}
            
           
        </React.Fragment>
    );      
  }
  
  
  