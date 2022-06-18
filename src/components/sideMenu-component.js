import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { useTranslation } from 'react-i18next';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Collapse } from '@mui/material';
import { navigationClientPanel,navigationAppointmentPanel, navigationDrawer, navigationLoading, navigationSuccess } from '../pages/dashboard/navigation-slice';


const drawerWidth = 240;


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);


function SideMenu(boardState) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const {screen, drawerOpen, customerOpen, appointmentsOpen} = boardState.boardState;
  let actualScreen = screen;
  let open = drawerOpen;
  let expandClients = customerOpen;
  let expandCal  =appointmentsOpen;


  const { t, i18n } = useTranslation();
  const toggleDrawer = () => {
    open = !open;
    dispatch(navigationDrawer(open));
     
  };

  const toggleClients = () =>{
    expandClients = !expandClients;
    dispatch(navigationClientPanel(expandClients));
  }

  const toggleCal = () =>{
    expandCal = !expandCal;
    dispatch(navigationAppointmentPanel(expandCal));

  }

  const toggleDashboad = () =>{
    dispatch(navigationLoading());
    actualScreen = "Dashboard";
    navigate("/dashboard",{replace: true});
    dispatch(navigationSuccess(actualScreen))
  }

  const toogleAddCustomer = () =>{
    actualScreen = "AddCustomer";
    dispatch(navigationSuccess(actualScreen))
  }

  const toogleShoweAllCustomers= () =>{
    dispatch(navigationLoading());
    actualScreen = "AllCustomers";
    navigate("/customers",{replace: true});
    dispatch(navigationSuccess(actualScreen));

  }

  const toogleAddSchedule= () =>{
    actualScreen = "AddSchedule";
    dispatch(navigationSuccess(actualScreen))
  }

  const toogleShowSchedule= () =>{
    actualScreen = "Schedule";
    dispatch(navigationSuccess(actualScreen))
  }

  const toogleShowOrders = () =>{
    actualScreen = "Orders";
    dispatch(navigationSuccess(actualScreen))
  }

  const toogleShowReports= () =>{
    actualScreen = "Reports";
    dispatch(navigationSuccess(actualScreen))
  }
  const toogleShowIntegrations= () =>{
    actualScreen = "Integrations";
    dispatch(navigationSuccess(actualScreen))
  }


  
 
  return (
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon/>}
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
               
            <ListItemButton onClick={toggleDashboad}>
                <ListItemIcon>
                <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary= {t("dashboard")} />
            </ListItemButton>
            
            {/* Customers */}
            <ListItemButton onClick={toggleClients}>
                <ListItemIcon>
                <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary={t("customers")} />
                {expandClients ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={expandClients} timeout="auto" unmountOnExit>
                <ListItemButton sx={{ pl:4}} onClick={toogleAddCustomer}>
                  <ListItemIcon>
                    <PersonAddAlt1Icon />
                  </ListItemIcon>
                  <ListItemText primary={t("addnewcustomer")} />
                </ListItemButton>

                <ListItemButton sx={{ pl:4}} onClick={toogleShoweAllCustomers}>
                  <ListItemIcon>
                    <PeopleOutlineIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("allcustomers")} />
                </ListItemButton>
            </Collapse>

            {/* Calendar */}
            <ListItemButton onClick={toggleCal}>
                <ListItemIcon>
                <CalendarMonthIcon />
                </ListItemIcon>
                <ListItemText primary={t("calendar")} />
                {expandCal ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={expandCal} timeout="auto" unmountOnExit>
                <ListItemButton sx={{ pl:4}} onClick={toogleAddSchedule}>
                  <ListItemIcon>
                    <ScheduleIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("adddate")} />
                </ListItemButton>
                
                <ListItemButton sx={{ pl:4}} onClick={toogleShowSchedule}>
                  <ListItemIcon>
                    <CalendarViewWeekIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("seedates")} />
                </ListItemButton>
            </Collapse>

            <ListItemButton onClick={toogleShowOrders}>
                <ListItemIcon >
                <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary={t("orders")} />
            </ListItemButton>
            
            <ListItemButton onClick={toogleShowReports}>
                <ListItemIcon>
                <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary={t("reports")}/>
            </ListItemButton>

            <ListItemButton onClick={toogleShowIntegrations}>
                <ListItemIcon>
                <LayersIcon />
                </ListItemIcon>
                <ListItemText primary={t("integrations")} />
            </ListItemButton>
         
            <Divider sx={{ my: 1 }} />
            
            <ListSubheader component="div" inset>
            {t("savedReports")}
            </ListSubheader>

            <ListItemButton>
              <ListItemIcon>
                  <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary={t("currentMonth")} />
            </ListItemButton>

            <ListItemButton>
              <ListItemIcon>
                  <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary={t("lastQuarter")} />
            </ListItemButton>
            
            <ListItemButton>
              <ListItemIcon>
                  <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary={t("yearEndSale")} />
            </ListItemButton>
            
          </List>
        </Drawer>
        
  );
}

export default SideMenu;