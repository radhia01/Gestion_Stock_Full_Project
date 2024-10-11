import React from 'react'
import { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import { styled, useTheme } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LogoutIcon from '@mui/icons-material/Logout';
import Person3Icon from '@mui/icons-material/Person3';
import ListItemIcon from '@mui/material/ListItemIcon';
import {useTranslation} from "react-i18next"
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {Box,Typography } from '@mui/material';
import { useNavigate} from "react-router-dom"
import { useSelector,useDispatch } from 'react-redux';
import { signOut } from '../redux/actions/auth';
import HourglassDisabledIcon from '@mui/icons-material/HourglassDisabled';
import ClearIcon from '@mui/icons-material/Clear';
import GroupIcon from '@mui/icons-material/Group';
import CategoryIcon from '@mui/icons-material/Category';
import ChecklistIcon from '@mui/icons-material/Checklist';
import BallotTwoToneIcon from '@mui/icons-material/BallotTwoTone';
import InventoryTwoToneIcon from '@mui/icons-material/InventoryTwoTone';
const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  });
  const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });
  
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      variants: [
        {
          props: ({ open }) => open,
          style: {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
          },
        },
        {
          props: ({ open }) => !open,
          style: {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
          },
        },
      ],
    }),
  );
  
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  
function SideBar({open,handleDrawerClose}) {
  const dispatch=useDispatch()
  const {t}=useTranslation();
  const {language}=useSelector(state=>state.auth)
  const navigate=useNavigate()
    const theme = useTheme();
    const Array1=[{
      text:t("dashboard"),
      icon:<HomeIcon/>,
      path:"/home"
    },
  {
    text:t("manageProducts"),
    icon:<ChecklistIcon/>,
    path:"/products"
  },
  {
    text:t("manageCat"),
    icon:<CategoryIcon/>,
    path:"/categories"
  },
  
  {
    text:t("manageBrands"),
    icon:<CategoryIcon/>,
    path:"/brands"
  },
  
  {
    text:t("manageUsers"),
    icon:<GroupIcon/>,
    path:"/users"
  },
  {
    text:"Roles",
    icon:<GroupIcon/>,
    path:"/roles"
  }, {
    text:"Permissions",
    icon:<GroupIcon/>,
    path:"/permissions"
  },
  
  {
    text:t("managePurchases"),
    icon:<BallotTwoToneIcon/>,
    path:"/purchases"
  },
  {
    text:t("manageSales"),
    icon:<InventoryTwoToneIcon/>,
    path:"/sales"
  },
  {
    text:t("lowStock"),
    icon:<ClearIcon/>,
    path:"/low/stock"
  },
  {
    text:t("expiredProducts"),
    icon:<HourglassDisabledIcon/>,
    path:"/expired/products"
  },
  
{   text:t("profile"),
  icon:<Person3Icon/>,
  path:"/"
}];
  const Array2=[
 
{
  text:t("deconnect"),
  icon:<LogoutIcon/>,
  path:"/signin"
}]

useEffect(() => {
  if(language==="ar"){
    window.document.dir="rtl"
  }
}, [language])


  const Logout=()=>{
  dispatch(signOut())
 
  }

  return (
    <Drawer variant="permanent" open={open} sx={{fontSize:10}}>
    <DrawerHeader>
      <IconButton onClick={handleDrawerClose}>
        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </IconButton>
    
    </DrawerHeader>
    <Box display="flex" sx={{justifyContent:"center"}}><Typography variant="h5" sx={{color:"#F2C12E" ,fontWeight:"bold"}}>GestionPro</Typography></Box>
    <Divider/>
    {/* <Avatar sx={{mx:"auto",width:50,height:50 }} src={userIcon}></Avatar> */}
   {/* <Typography variant="h6" sx={{textAlign:"center"}}>{t("admin")}</Typography> */}
    <Divider />
   
    <List sx={{paddingX:3,paddingY:3}}>
      {Array1.map((item) => (
        <ListItem key={item.path} disablePadding sx={{ display: 'block',color:"grey",fontSize: 10}}>
          <ListItemButton
          onClick={()=>{
            navigate(item.path)
          }}
            sx={[
              {
                maxHeight: 80,
                px: 2
              },
              open
                ? {
                    justifyContent: 'initial',
                  }
                : {
                    justifyContent: 'center',
                  },
            ]}
          >
            <ListItemIcon
              sx={[
                {
                  minWidth: 0,
                  justifyContent: 'center',
                 
                  
                },
                open
                  ? {
                      mr: 3,
                    }
                  : {
                      mr: 'auto',
                    },
              ]}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
            primaryTypographyProps={{fontSize: '14px'}} 
              primary={item.text}
              
              sx={
                [
                  {'&:hover':{
                    color:"#F2C12E",
                    
                    
                  }},
                
                open
                  ? {
                      opacity: 1,
                    
                    }
                  : {
                      opacity: 0,
                    },
              ]}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    <Divider />
    <List>
      {Array2.map((item, path) => (
        <ListItem key={path} disablePadding sx={{ display: 'block' }}>
          <ListItemButton
          onClick={Logout}
            sx={[
              {
                minHeight: 48,
                px: 2.5,
              },
              open
                ? {
                    justifyContent: 'initial',
                  }
                : {
                    justifyContent: 'center',
                  },
            ]}
          >
            <ListItemIcon
              sx={[
                {
                  minWidth: 0,
                  justifyContent: 'center',
                },
                open
                  ? {
                      mr: 3,
                    }
                  : {
                      mr: 'auto',
                    },
              ]}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={[
                open
                  ? {
                      opacity: 1,
                    }
                  : {
                      opacity: 0,
                    },
              ]}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Drawer>
  )
}

export default SideBar