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
import { Collapse } from '@mui/material';
import { navigationClientPanel,navigationAppointmentPanel } from '../pages/dashboard/navigation-slice';


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


function SideMenu(openedMenu, expandedClients,expandedCal) {

  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(openedMenu);
  const [expandClients, setExpandClients] = React.useState(expandedClients);
  const [expandCal, setExpandCal] = React.useState(expandedCal);

  const { t, i18n } = useTranslation();
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const toggleClients = () =>{
    setExpandClients(!expandClients);

    dispatch(navigationClientPanel(!expandClients));

  }

  const toggleCal = () =>{
    setExpandCal(!expandCal);
    dispatch(navigationAppointmentPanel(!expandCal));

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
               
            <ListItemButton>
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
                <ListItemButton sx={{ pl:4}}>
                  <ListItemIcon>
                    <PersonAddAlt1Icon />
                  </ListItemIcon>
                  <ListItemText primary={t("addnewcustomer")} />
                </ListItemButton>

                <ListItemButton sx={{ pl:4}}>
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
                <ListItemButton sx={{ pl:4}}>
                  <ListItemIcon>
                    <ScheduleIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("adddate")} />
                </ListItemButton>
                
                <ListItemButton sx={{ pl:4}}>
                  <ListItemIcon>
                    <CalendarViewWeekIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("seedates")} />
                </ListItemButton>
            </Collapse>

            <ListItemButton>
                <ListItemIcon>
                <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary={t("orders")} />
            </ListItemButton>
            
            <ListItemButton>
                <ListItemIcon>
                <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary={t("reports")}/>
            </ListItemButton>

            <ListItemButton>
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