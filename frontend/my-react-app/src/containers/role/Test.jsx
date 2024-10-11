import React from 'react';
import { Box, Typography, Checkbox } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {getAllPermissions} from "../../redux/actions/permission"
import { useEffect } from 'react';
import {useSelector,useDispatch} from "react-redux"
import { useParams } from 'react-router-dom';
import { addPermissionToRole } from '../../redux/actions/role';
function RolePermissions() {
  const dispatch=useDispatch()
  const {id}=useParams()
  const {permissions}=useSelector(state=>state.permission)
  useEffect(() => {
    dispatch(getAllPermissions())
  }, [])
  const columns = [
    {
      field: 'module',
      headerName: 'Module',
      width:250
    },
    {
      field: 'edit',
      headerName: 'Edit',
      width:200,
      renderCell: (params) => (
        <Checkbox
         color="success"
          // Ajoutez ici votre logique pour gérer les changements
          onChange={(event) => console.log(` ${params.id} `)}
        />
      ),
    },
    {
      field: 'add',
      headerName: 'Add',
      width:200,
      renderCell: (params) => (
        <Checkbox
         color="success"
         onChange={(event) => console.log(` ${params.id} `)}
        />
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width:200,
      renderCell: (params) => (
        <Checkbox
         color="success"
         checked={params.row.delete}
          onChange={(event) => console.log(`Delete for ${params.row.module} is ${event.target.checked}`)}
        />
      ),
    },
    {
      field: 'view',
      headerName: 'View',
      width:200,
      renderCell: (params) => (
        <Checkbox
        color="success"
          onChange={(event) => console.log(`View for ${params.row.module} is ${event.target.checked}`)}
        />
      ),
    },
  ];
  const rows =permissions && permissions.map(permission=>{
    const module=permission.name.split('_')[1];
    return {
      id:permission.id,
      module:module.charAt(0).toUpperCase() + module.slice(1),
      edit:true,
      add:true,
      delete:true,
      view:true

    }

  })
  const newRows = rows.filter((obj, index, self) => 
    index === self.findIndex((o) => 
      o.module === obj.module &&
      o.edit === obj.edit &&
      o.add === obj.add &&
      o.delete === obj.delete
    )
  );
  return (
    <div>
      <Box>
        <Typography align="start" variant="h5" sx={{ my: 4, fontSize: 16, fontWeight: 'bold', color: '#F2C12E' }}>
          Permissions
        </Typography>
      </Box>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={newRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
}

export default RolePermissions;
