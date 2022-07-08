import * as React from 'react';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/system';
import { useDispatch } from 'react-redux';
import { GetAllData, GetCabins, getCustomer, GetCustomerIdFromName, getPriceForService, getServices } from '../utils/dataFetch-utils';
import CustomerSearchBar from './form-components/customer-search-form-comp';
import { useNavigate } from 'react-router-dom';
import { navigationLoading, navigationSuccess } from '../slices/navigation-slice';
import styled from '@emotion/styled';

  
export default function AddCommunicationsComponent(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [customerID, setCustomerID] = React.useState(props.customerId)
  const [threadID, setThreadID]= React.useState(props.threadId)
  const locale = props.locale;
  const [mode,setMode] = React.useState("add") // Modes "add", "addToId", "addToIdAndThread"
    
  var initValidation={
    id: 0,
    senderName: "",
    receiverName :  "",
    customerId: 0,
    userId: 0,
    communicationId: 0, 
    direction: "receive",
    date: "",
    type: "call",
    duration: 0,
    subject: "",
    notes: "",
    follow: "",
    alertfollow: "",
    thread: 0,     
  }
  const [Comm, setComm] = React.useState(initValidation);

  React.useEffect(() => {   
    
    //SELECCION DE MODOS
    console.log(props) 
    if (props.customerId && !props.threadId){
          //MODO AÑADIR CITA A ID
          setMode("addToId")
        }

    if (props.customerId && props.threadId){
          //MODO EDITAR
          setMode("addToIdAndThread")
          //const newData = GetCommintmentById({CommId: props.CommId, userId: props.customerId })
          //setComm(newData[0])
        }
    },[props.threadId, props.customerId, setMode, setComm ]);

  const [customerName, setCustomerName] = React.useState("")
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [closeCommDialogOpen, setCloseCommDialogOpen] = React.useState(false);
  
   
  const data = () => {
    if (customerID){
      return getCustomer(customerID);
    }
    else
      return (GetAllData)
  }   


  const HandleSubmit = (event)=>{
  
    event.preventDefault();
    console.log(Comm)
    //CALL API TO PUT IN DATABASE
    const actualScreen = "/Commintments"
    dispatch(navigationLoading());
    navigate(actualScreen,{replace: true});
    dispatch(navigationSuccess(actualScreen))

   }
   const closeCommintment = (event)=>{
    event.preventDefault();
    setCloseCommDialogOpen(true);

  }

  const closeComm = (event) =>{
    event.preventDefault();
    console.log(Comm)
    setComm({...Comm, "closed": new Date().now})
    //CALL API TO PUT IN DATABASE
    const actualScreen = "/Commintments"
    dispatch(navigationLoading());
    navigate(actualScreen,{replace: true});
    dispatch(navigationSuccess(actualScreen))
  }

  const closeCommDialog = () =>{
    setCloseCommDialogOpen(false);
  }

   const SetCustomer = (data) =>{

    setCustomerName(data);
    setCustomerID(GetCustomerIdFromName(data));
   }
 

  const resetData= ()=>{
    //setFrmData(frmDataInit);
  }

  const handleDate= (value)=>{
    setComm({...Comm, "date": value})
  }
  
  const handleDurationChange= (event)=>{
    setComm({...Comm, "duration": event.target.value})
  }

  const handleCabinChange = (event)=>{
    setComm({...Comm, "cabin": event.target.value})
  }

  const handlePriceChange = (event)=>{
    setComm({...Comm, "price": event.target.value})
  }

  const handlePaidChange = (event)=>{
    setComm({...Comm, "price": event.target.value})
  }

  const handleServicesChange= (event)=>{
    setComm({...Comm, "service": event.target.value,"price": getPriceForService(event.target.value) })
  }

  const handleNotesChange= (event)=>{
    console.log(Comm);
    setComm({...Comm, "notes": event.target.value})
  }

  const seeCommintment = (event)=>{
    const actualScreen = "/Commintments"
    dispatch(navigationLoading());
    navigate(actualScreen,{replace: true});
    dispatch(navigationSuccess(actualScreen))
  }

  const Input = styled('input')({
    display: 'none',
  });

  const handleAttachmentChange = (e)=>{
    var attached = Comm.attachment;
    console.log ("Copia de Comm", attached)
    var item = {}
    item["id"] = attached.length;
    item["file"] = URL.createObjectURL(e.target.files[0]);
    item["name"] = e.target.files[0].name;
    console.log("Objeto a empujar", item)
    attached.push(item);

    console.log("Objeto modificado",attached);

    setComm({...Comm, "attachment": attached}); 
  }

  const MainTitle = () =>{
    // Modes "add", "addToId", "addToIdAndThread"
    switch (mode) {
      case "add":
          return(<><CustomerSearchBar customerFunc={SetCustomer}/></>);
      case "addToId":
        return (
            <h2>{t("addingcommunicationto")} {data().firstname} {data().lastname} </h2>
          )  
      case "addToIdAndThread":
          return (
            <h2>{t("responsetocommunicationwith")} {data().firstname} {data().lastname}</h2>
          )
        
      default:
          return (
            <>Ha habido un error</>
          )
    }
  }


   return (
    <React.Fragment>
       
        <Box component="form" noValidate onSubmit={HandleSubmit} >
            <Grid container spacing={2} rowSpacing={2} justifyContent="flex-start" alignItems="center">
              <Grid item xs={12} md={12} sm={12} marginTop={3}>
                <MainTitle />
                <h1>{customerName}</h1>
              </Grid>
            </Grid>
              
        </Box>
    </React.Fragment>
  )
}
