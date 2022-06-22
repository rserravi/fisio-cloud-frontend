import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import customerData from "../assets/data/dummy-data.json";
import Paper from '@mui/material/Paper';
import EmailIcon from '@mui/icons-material/Email';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { paperColor } from '../utils/mui-custom-utils';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import { grey, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import { color } from '@mui/system';
import { socialNetworks, findSocialIcon } from '../utils/social-networks-utils';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));


export default function CustomerCard() {

  const customer = customerData[0];
  const { t, i18n } = useTranslation();
  const colorPaperInbound = paperColor(customer.inbound)

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleNameClick = () =>{
    console.log("Name Click")
  }
  const handleEmailClick = () =>{
    console.log("Email Click")
  }
  const handlePhoneClick = () =>{
    console.log("Phones Click")
  }
  const handleSocialNetworksClick = () =>{
    console.log("Social Click")
  }

  const handleAddressClick = () =>{
    console.log("Address Click")
  }

 
  return (
    <React.Fragment>
        
       <Card sx={{ display: 'flex' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            
            {/* Firs Column of Main Box */}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                    component="img"
                    sx={{ width: 180 }}
                    image={"/images/" + customer.image}
                    alt="Foto"
                />
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5" onClick={handleNameClick} >
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

            {/* Second column of main box */}
          
            <Box sx={{ display: 'inline', flexDirection: 'column', bgcolor: 'primary.main' }}>
                 
                 {/* Emails */}
                <CardContent sx={{ flex: '1 0 auto' }} onClick={handleEmailClick}>
                    <Card >
                    <Typography component="div" variant="p" align='left'>
                         <strong>Emails: </strong>
                    </Typography>
                    <Typography component="div" variant="p" align='left'>
                        Home: {customer.email[0].emailAddress} 
                    </Typography>
                    <Typography component="div" variant="p" align='left'>
                        Work: {customer.email[1].emailAddress} 
                    </Typography>
                    </Card>
                </CardContent>

                 {/* Phones */}
                <CardContent sx={{ flex: '1 0 auto',  }} onClick={handlePhoneClick}>
                    <Card sx={{}}>
                    <Typography component="div" variant="p" align='left'>
                        <strong>Phones: </strong>
                    </Typography>
                    <Typography component="div" variant="p" align='left'>
                        Home: {customer.phoneNumber[0].number} 
                    </Typography>
                    <Typography component="div" variant="p" align='left'>
                        Work: {customer.phoneNumber[1].number} 
                    </Typography>
                    </Card>
                </CardContent>

                 {/* Social Networks */}
                <CardContent sx={{ flex: '1 0 auto',  }} onClick={handleSocialNetworksClick}>
                    <Card sx={{}}>
                    <Typography component="div" variant="p" align='left' >
                        <strong>Social Networks: </strong>
                    </Typography>
                    <Typography component="div" variant="p" align='left' >
                    {customer.socialMedia[0] ? findSocialIcon(customer.socialMedia[0].media):<></>} {customer.socialMedia[0] ? customer.socialMedia[0].user : <></> } 
                    </Typography>
                    <Typography component="div" variant="p" align='left'>
                    {customer.socialMedia[1] ? findSocialIcon(customer.socialMedia[1].media):<></>} {customer.socialMedia[1] ? customer.socialMedia[1].user : <></> }
                    </Typography>
                    <Typography component="div" variant="p" align='left'>
                       {customer.socialMedia[2] ? findSocialIcon(customer.socialMedia[2].media):<></>} {customer.socialMedia[2] ? customer.socialMedia[2].user : <></> }
                    </Typography>
                    </Card>
                </CardContent>
            </Box>


            {/* Third column of main box */}
          
            <Box sx={{ display: 'inline', flexDirection: 'column', bgcolor: 'primary.main' }}>
                 {/* Direccion */}
                 <CardContent sx={{ flex: '1 0 auto' }} onClick={handleAddressClick}>
                    <Card >
                    <Typography component="div" variant="p" align='left'>
                         <strong>Address: </strong>
                    </Typography>
                    <br></br>
                    <Typography component="div" variant="p" align='left'>
                        {customer.address.streetAddress} ,  {customer.address.postalCode} {customer.address.city}, {customer.address.state}. {customer.address.country}.    
                    </Typography>

                    </Card>
                </CardContent>

            </Box>
            
          </Box>     
          
           {/* Card Actions */}
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
            <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
            <ShareIcon />
            </IconButton>
            <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            >
            <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>       
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
