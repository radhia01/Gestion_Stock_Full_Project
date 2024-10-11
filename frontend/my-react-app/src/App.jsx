import * as React from 'react';
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import {ToastContainer} from "react-toastify"
import CssBaseline from '@mui/material/CssBaseline';
import TopBar from './containers/TopBar';
import SideBar from './containers/SideBar';
import {Outlet,Navigate} from "react-router-dom"
import {useSelector} from "react-redux"
import { useState } from 'react';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));




export default function MiniDrawer() {
  const [searchItem, setsearchItem] = React.useState("")
  const [darkMode, setDarkMode] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [productId, setproductId] = React.useState(null)
  const {user}=useSelector(state=>state.auth)
  if(!user){
    return <Navigate to="/signin" />;
  }
 
  const theme = createTheme({
    palette: {
      type: darkMode ? 'dark' : 'light', // Switch between 'dark' and 'light' mode
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

 

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
         <Box sx={{ display: 'flex' }}>
      
      <TopBar open={open} handleDrawerOpen={handleDrawerOpen}  darkMode={darkMode} toggleDarkMode={toggleDarkMode} setsearchItem={setsearchItem}/>
     <SideBar open={open} handleDrawerClose={handleDrawerClose}/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 ,backgroundColor:"#F2F0F5" ,minHeight:"100vh"}}>
        <DrawerHeader />
       <Outlet context={{searchItem,productId,setproductId}} />
      </Box>
    </Box>
    </ThemeProvider>
   
 </>
    
  );
}
