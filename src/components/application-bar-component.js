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
import { useDispatch, useSelector } from "react-redux";
import {navigationDrawer, navigationLoading, navigationMenu, navigationSuccess } from '../slices/navigation-slice';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Button, DialogActions, DialogContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // ES6
import { GetBadgeAlerts } from '../utils/dataFetch-utils';


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
  const userSelector = useSelector(state => state.user);
  const srcImage = userSelector.image;
  const labelImage = userSelector.firstname + " " + userSelector.lastname;
  const userId = userSelector.id;

  const [width, setWidth] = React.useState(Number(window.innerWidth));

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
    }
  React.useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

  const isMobile = width <= 768;
  
  const {drawerOpen} = boardState.boardState;
  const title = boardState.title;

  let open = drawerOpen;
  let showMenu =  boardState.boardState.showMenu;
  const { t } = useTranslation();

  const [anchorElUser, setAnchorElUser] = React.useState("");
  const [anchorElBadges, setAnchorElBadges] = React.useState("");

  const toggleDrawer = () => {
    if(!isMobile){
    open = (!open);
    dispatch(navigationDrawer(open));
    dispatch(navigationMenu(true));
    }
    else{
      showMenu = !showMenu;
      dispatch(navigationMenu(showMenu));
    }
  };

  const [openDialog, setOpenDialog]= React.useState(false);

  const goTo = (actualScreen) =>{
    dispatch(navigationLoading());
    navigate(actualScreen,{replace: true});
    dispatch(navigationSuccess(actualScreen))
  }

  const handleOpenUserMenu = (event) => {
  setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser("");
  };

  const handleOpenBadgesMenu = (event) => {
    setAnchorElBadges(event.currentTarget);
  };
  
  const handleCloseBadgesMenu = () => {
    setAnchorElBadges("");
  };

  const getBadgeAlerts = GetBadgeAlerts();

  const handleUserSetup = () =>{
    goTo("/usersetup/"+userId.toString());
  }

  const handleSetupClick = () =>{
   goTo("/setup");
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
    goTo("/");
  }

  const linkPrepare=(event, link)=>{
    console.log(event, link)
    goTo(link)
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
             {title}
            </Typography>
            
             <Tooltip title={t("settings")}>
              <IconButton color="inherit"  onClick={handleSetupClick}>
                  <SettingsIcon />
              </IconButton>
            </Tooltip> 

            <Tooltip title={t("seeAlerts")}>
              <IconButton color="inherit" onClick={handleOpenBadgesMenu}>
                <Badge badgeContent={getBadgeAlerts.length} color="secondary">
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
              
              {getBadgeAlerts.map((setting) => (
                <MenuItem key={setting.id} onClick={((event)=>{event.stopPropagation();linkPrepare(event, setting.link)})}>
                  <Typography textAlign="center">{setting.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
            
            <Tooltip title={t("openusersettings")}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={labelImage} src={srcImage} />
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
              <MenuItem onClick={handleUserSetup}>{t("profile")}</MenuItem>
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