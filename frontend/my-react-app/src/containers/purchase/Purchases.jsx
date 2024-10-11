import React from 'react'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
function Purchases() {
  const {t}=useTranslation()
  return (
    <div>
        <Typography align="start" variant="h5" sx={{my:4,fontSize:22,fontWeight:"bold",color:"#F2C12E"}}>{t("managePurchases")} </Typography>
    </div>
  )
}

export default Purchases