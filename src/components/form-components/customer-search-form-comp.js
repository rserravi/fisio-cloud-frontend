import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Autocomplete, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { navigationLoading, navigationSuccess } from '../../slices/navigation-slice';
import i18next from 'i18next';
import { GetCustomerList } from "../../api/customer.api";
import { GetCustomerIdFromNameInList } from "../../utils/dataFetch-utils";

const initData =[
  {
    _id: "1",
    customerName:""
  },
]

export default function CustomerSearchBar ({customerFunc}) {
    const [data, setData]= useState(initData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [custoName, setCustoName] = useState("");
    const [custoId, setCustoId]= useState(0);
    const [firstLoad, setFirstLoad]= useState(true);

    const filterData = (query) => {
      const newData = data.map(a=>a.customerName)
      if (!query) {
        return newData
      } else {
        return newData.filter((d) => d.toLowerCase().includes(query));
      }
    };  


    React.useEffect(()=>{
      if (firstLoad){
        GetCustomerList().then((data)=>{
          setData(data.result);
          setFirstLoad(false);
        })
      }

    },[firstLoad])

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
                onChange={(event, newValue)=>
                  {
                    const id = (GetCustomerIdFromNameInList(newValue, data));
                    setCustoId(id)
                    setCustoName(newValue)
                    console.log(newValue, id)
                    customerFunc(id, newValue);
                }}
                options={filterData()}
                renderInput={(params) => <TextField {...params} label={i18next.t("searchcustomeroraddnew")} />}
            />
              }
            {custoName?<Button size="small" onClick={findOther}>{i18next.t("finddifferentcustomer")}</Button>:<Button onClick={addcustomer} sx={{mt:3}} variant="contained">{i18next.t("newcustomer")}</Button>}
            
           
        </React.Fragment>
    );      
  }
  
  
  