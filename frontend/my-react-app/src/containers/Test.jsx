import React from 'react'
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from 'powerbi-client';
function Test() {
    const reportId = '6e48a6c3-ef13-47d8-acd5-4e3865732240';
  const groupId = 'me';
  const accessToken = 'TON_TOKEN_D_ACCES'; // Assure-toi de gérer le token de manière sécurisée

  const embedConfig = {
    type: 'report',
    id: reportId,
    embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${reportId}&groupId=${groupId}`,
    accessToken: accessToken,
    settings: {
      filterPaneEnabled: false,
      navContentPaneEnabled: true,
    },
  };
  return (
    <div>
       <iframe title="manage_stock_rapport" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=6e48a6c3-ef13-47d8-acd5-4e3865732240&autoAuth=true&ctid=529da456-4203-4f1a-bac4-ae82d4760d00" frameborder="0" allowFullScreen="true"></iframe>
    </div>
    
  )
}

export default Test
