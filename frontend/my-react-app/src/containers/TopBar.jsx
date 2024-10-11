import React from 'react'
import {Toolbar,IconButton,Stack,Box,FormControl,Select,MenuItem} from "@mui/material"
import {useTranslation}from "react-i18next"
import { alpha } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import ReactCountryFlag from "react-country-flag"
const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
      {
        props: ({ open }) => open,
        style: {
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      },
    ],
  }));
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));
function TopBar({open ,handleDrawerOpen,setsearchItem}) {
  
  const {i18n}=useTranslation()
  const handleChange=(e)=>{
    i18n.changeLanguage(e.target.value);
      localStorage.setItem("language",e.target.value)
  }

  return (
    
        <AppBar position="fixed" open={open} sx={{backgroundColor:"white",color:"black"}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search by name …"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e)=>setsearchItem(e.target.value)}
            />
          </Search>
          {/* <Typography variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography> */}
          <Box flexGrow={1}></Box>
          <Stack direction="row">
          <Box sx={{ minWidth: 120 }}>
      <FormControl >
       
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={i18n.language}
          label="Age"
          onChange={handleChange}
          sx={{color:"black",height:30,fontSize:12}}
        >
          <MenuItem value="en" sx={{fontSize:12}}><ReactCountryFlag
           style={{ marginRight: '4px' }}
                countryCode="US"
                svg
                cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                cdnSuffix="svg"
                title="English"
                
            /> English
</MenuItem>
          <MenuItem value="fr" sx={{fontSize:12}}><ReactCountryFlag
      
                countryCode="FR"
                svg
                cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                cdnSuffix="svg"
                title="French"
                style={{ marginRight: '4px' }}
            /> French</MenuItem>
        </Select>
      </FormControl>
    </Box>

          </Stack>
   
        </Toolbar>
      </AppBar>
    
  )
}

export default TopBar