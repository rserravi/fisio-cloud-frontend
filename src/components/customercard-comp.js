import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import customerData from "../assets/data/dummy-data.json";
import Paper from '@mui/material/Paper';
import EmailIcon from '@mui/icons-material/Email';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';


export default function CustomerCard() {

  const customer = customerData[0];
  const { t, i18n } = useTranslation();

  const paperColor = () =>{
    let back = ""
    let front = ""
    switch (customer.inbound) {
      case "unknown":
        back = "rosybrown";
        front = "white"
        break;
      case "lead":
        back = "khaki";
        front = "dimgray"
      break;
      case "customer":
        back = "dodgerblue";
        front = "white"
      break;
      case "passive":
        back = "darkred";
        front = "white"
      break;
    
      default:
        back = "yellow"
        front = "white"
        break;
    }
    return {
      "back" : back,
      "front": front
    }
  }

  const colorPaperInbound = paperColor();

  
  return (
    <React.Fragment>
       
       <Card sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                    component="img"
                    sx={{ width: 180 }}
                    image={"/images/" + customer.image}
                    alt="Live from space album cover"
                />
                <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                    {customer.firstname} {customer.lastname} 
                </Typography>
                <Paper
                    sx={{bgcolor:colorPaperInbound.back, color:colorPaperInbound.front, marginY:2}}                  
                >
                    <Typography variant='p' component="p" marginX={2}>{t(customer.inbound)}</Typography>
                
                </Paper> 
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <IconButton aria-label="Email">
                    < EmailIcon />
                </IconButton>
                <IconButton aria-label="phonecall">
                    <PhoneInTalkIcon />
                </IconButton>
                <IconButton aria-label="whatsapp">
                    <WhatsAppIcon />
                </IconButton>
                </Box>
                </CardContent>
               
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    AQUI VAN MAS COSAS
                </CardContent>
            </Box>
        </Card>




        <Card sx={{ display: 'flex', marginTop: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                    component="img"
                    sx={{ width: 180 }}
                    image={"/images/" + customer.image}
                    alt="Live from space album cover"
                />
                <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                    {customer.firstname} {customer.lastname} 
                </Typography>
                <Paper
                    sx={{bgcolor:colorPaperInbound.back, color:colorPaperInbound.front, marginY:2}}                  
                >
                    <Typography variant='p' component="p" marginX={2}>{t(customer.inbound)}</Typography>
                
                </Paper> 
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <IconButton aria-label="Email">
                    < EmailIcon />
                </IconButton>
                <IconButton aria-label="phonecall">
                    <PhoneInTalkIcon />
                </IconButton>
                <IconButton aria-label="whatsapp">
                    <WhatsAppIcon />
                </IconButton>
                </Box>
                </CardContent>
               
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    AQUI VAN MAS COSAS
                </CardContent>
            </Box>
        </Card>




    </React.Fragment>
  )
}
