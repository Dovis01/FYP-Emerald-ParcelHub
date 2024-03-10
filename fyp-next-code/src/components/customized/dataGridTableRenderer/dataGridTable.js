import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import * as React from "react";

export const DataGridTable= ({ rows, columns, handleRowHeight, handleRowSelectionChange }) => {
  return (
          <DataGrid
              rows={rows}
              columns={columns}
              autoHeight
              checkboxSelection
              slots={{toolbar: GridToolbar}}
              initialState={{
                  pagination: {paginationModel: {pageSize: 10}},
              }}
              getRowHeight={handleRowHeight}
              onRowSelectionModelChange={handleRowSelectionChange}
              pageSizeOptions={[5, 10, 25]}
              sx={{
                  boxShadow: 5,
                  backgroundColor: 'white',
                  '& .MuiDataGrid-columnHeaders.MuiDataGrid-withBorderColor': {
                      borderTopLeftRadius: '0px',
                      borderTopRightRadius: '0px',
                  },
                  '& .MuiDataGrid-toolbarContainer': {
                      backgroundColor: 'customized.purple',
                  },
                  '& .MuiDataGrid-toolbarContainer .MuiButtonBase-root': {
                      fontSize: '16px',
                      fontWeight: 'bold',
                  },
                  '& .MuiDataGrid-columnHeaders': {
                      backgroundColor: 'customized.purple',
                  },
                  '& .MuiDataGrid-cell:hover': {
                      color: 'primary.main',
                  },
                  '& .MuiDataGrid-row:hover': {
                      backgroundColor: 'customized.blueLight',
                  },
                  '& .MuiDataGrid-row.Mui-selected, & .MuiDataGrid-row.Mui-selected:hover': {
                      backgroundColor: 'customized.blueLight',
                      color: 'primary.main',
                  },

                  '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
                      width: '5px',
                  },
                  '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track': {
                      width: '2px',
                      backgroundColor: '#f1f1f1',
                  },
                  '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb': {
                      backgroundColor: '#a2a0a0',
                      borderRadius: '20px',
                      border: '6.5px solid transparent',
                      backgroundClip: 'content-box',
                  },
                  '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb:hover': {
                      backgroundColor: '#7c7a7a',
                  },
                  '& .super-app-theme--header': {
                      fontWeight: 'bold',
                      fontSize: '14.8px'
                  }
              }}
          />
  );
}
