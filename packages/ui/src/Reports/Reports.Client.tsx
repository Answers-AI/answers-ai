// Reports.Client.tsx
'use client';
import React from 'react';
import { User } from 'types';
import { useFlags } from 'flagsmith/react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Typography } from '@mui/material';

interface ReportsProps {
  children?: React.ReactNode;
  params?: {
    app?: string[];
  };
  users: User[];
  tableNames: string[];
}

const Reports: React.FC<ReportsProps> = ({ children, params, users, tableNames }) => {
  const { reports_admin } = useFlags(['reports_admin']);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150, sortable: true, editable: true},
    { field: 'name', headerName: 'Name', width: 150, sortable: true, editable: true },
    { field: 'email', headerName: 'Email', width: 200, sortable: true, editable: true },
    { field: 'role', headerName: 'Role', width: 150, sortable: true, editable: true },
    // { field: 'createdAt', headerName: 'Created At', width: 200, type: 'dateTime', sortable: true },
    // { field: 'updatedAt', headerName: 'Updated At', width: 200, type: 'dateTime', sortable: true },
    { field: 'organizationId', headerName: 'Organization ID', width: 200, sortable: true },
  ];

  return (
    <>
      {reports_admin?.enabled ? (
        <div>
            <h1>Admin Reports</h1>
            <h2>Users</h2>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={users}
                    columns={columns}
                    autoPageSize
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </div>
        </div>
       
      ) : (
        <Typography variant="h5" color="error">
          Error: This page does not exist
        </Typography>
      )}
    </>
  );
};

export default Reports;
