import * as React from 'react';
import { styled } from '@mui/material/styles';

import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';

import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { useTranslation } from 'react-i18next';
import Avatar from '@mui/material/Avatar';
import avatarPicture from "../img/RubenSerra.jpg";
import { useDispatch } from "react-redux";
import {navigationDrawer } from '../pages/dashboard/navigation-slice';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Button, DialogActions, DialogContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // ES6




const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function ApplicationBar(boardState) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const {drawerOpen, customerOpen, appointmentsOpen} = boardState.boardState;
  const title = boardState.title;

  let open = drawerOpen;
  const { t, i18n } = useTranslation();

  const [anchorElUser, setAnchorElUser] = React.useState("");
  const [anchorElBadges, setAnchorElBadges] = React.useState("");
  const [anchorElNewCustomer, setAnchorElNewCustomer] = React.useState("");

  const toggleDrawer = () => {
    open = (!open);
    dispatch(navigationDrawer(open));
  };

  const [openDialog, setOpenDialog]= React.useState(false);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
  setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser("");
  };

  const handleOpenBadgesMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElBadges(event.currentTarget);
    };
  
    const handleCloseBadgesMenu = () => {
      setAnchorElBadges("");
    };

  const getBadgeAlerts = () =>{

    //API CALL FOR GETTING ALERTS
    return (
      {
        "1": "alerta 1",
        "2": "alerta 2"
      }
    )
  }

  const handleLogOut = () => {
    setOpenDialog(true);
  }

  const handleCloseDialog = () =>{
    setOpenDialog(false);
    setAnchorElUser("");
  }

  const doLogOut = () => {
    // API CALL FOR LOGGIN OUT
    console.log("LOGGIN OUT");
    navigate("/",{replace: true});
  }




  return (
        
        <AppBar position="absolute" open={open}>
            <Dialog open={openDialog}>
            <DialogTitle align='center'>{t("youareloggingout")}</DialogTitle>
            <DialogContent align='center'>{t("areyousure")}</DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Disagree</Button>
              <Button onClick={doLogOut}>Agree</Button>
            </DialogActions>
         
        </Dialog>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
             <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton> 
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
             {t(title)}
            </Typography>
            
             <Tooltip title={t("settings")}>
              <IconButton color="inherit">
                  <SettingsIcon />
              </IconButton>
            </Tooltip> 

            <Tooltip title={t("seeAlerts")}>
              <IconButton color="inherit" onClick={handleOpenBadgesMenu}>
                <Badge badgeContent={Object.keys(getBadgeAlerts()).length} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-badges"
              anchorEl={anchorElBadges}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElBadges)}
              onClose={handleCloseBadgesMenu}
            >
              
              {Object.values(getBadgeAlerts()).map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
            
            <Tooltip title={t("openusersettings")}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Ruben Serra" src={avatarPicture} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>{t("profile")}</MenuItem>
              <MenuItem onClick={handleLogOut}>{t("logout")}</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
  );
}

ApplicationBar.propTypes = {
  boardState: PropTypes.object.isRequired,
  title: PropTypes.string,
}

export default ApplicationBar;