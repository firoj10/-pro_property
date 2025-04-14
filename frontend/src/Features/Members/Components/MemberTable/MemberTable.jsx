import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, useTheme } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create custom theme with your colors
const theme = createTheme({
  palette: {
    primary: {
      main: "#1E40AF", // হেক্স কোড
      light: "#3B82F6", // অপশনাল লাইট ভার্সন
      dark: "#1E3A8A"  // অপশনাল ডার্ক ভার্সন
    },
    secondary: {
      main: "#F59E0B",
    },
    error: {
      main: "#EF4444",
    },
  },
});

const dummyData = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  age: Math.floor(Math.random() * 50 + 18),
  email: `user${index + 1}@example.com`,
  role: ['Admin', 'Moderator', 'User'][index % 3],
  joinDate: new Date(2023, index % 12, (index % 28) + 1).toISOString(),
}));

const columns = [
  { 
    field: 'id', 
    headerName: 'ID', 
    width: 70, 
    filterable: false,
    headerClassName: 'header' 
  },
  { 
    field: 'name', 
    headerName: 'Name', 
    minWidth: 180, 
    editable: true,
    flex: 1 
  },
  { 
    field: 'age', 
    headerName: 'Age', 
    type: 'number', 
    width: 100 
  },
  { 
    field: 'email', 
    headerName: 'Email', 
    minWidth: 250,
    flex: 1 
  },
  { 
    field: 'role', 
    headerName: 'Role', 
    minWidth: 130,
    filterable: true,
    type: 'singleSelect',
    valueOptions: ['Admin', 'Moderator', 'User']
  },
  { 
    field: 'joinDate', 
    headerName: 'Join Date', 
    type: 'date', 
    minWidth: 150,
    valueGetter: (params) => new Date(params.value),
    valueFormatter: (params) => new Date(params.value).toLocaleDateString('en-US')
  },
];

const MemberTable = () => {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        height: 'auto',
        minHeight: 600,
        width: '100%', 
        p: { xs: 1, sm: 3 },
        backgroundColor: 'white',
        borderRadius: 4,
        boxShadow: 1,
        overflow: 'hidden'
      }}>
        {/* Header Section */}
        {/* <Typography variant="h4" gutterBottom sx={{ 
          mb: 3, 
          backgroundColor: theme.palette.primary.main,
          color: 'white',
          p: 2,
          borderRadius: 1,
          fontWeight: 'bold',
          fontSize: { xs: '1.5rem', sm: '2rem' }
        }}>
          Member List
        </Typography> */}
        
        {/* DataGrid Section */}
        <DataGrid
          rows={dummyData}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 10 } },
            sorting: { sortModel: [{ field: 'joinDate', sort: 'desc' }] },
          }}
          pageSizeOptions={[10, 20, 50]}
          checkboxSelection
          disableRowSelectionOnClick
          disableColumnMenu={false}
          sx={{
            // Header Styles
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: theme.palette.primary.main,
              color: 'white !important',
              fontSize: '1rem',
              fontWeight: 'bold',
            },
            
            // Footer Styles
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: theme.palette.primary.main,
              color: 'white',
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              '& .MuiTablePagination-root': {
                color: 'white',
              },
              '& .MuiButtonBase-root': {
                color: 'white',
                '&:disabled': {
                  color: theme.palette.grey[400]
                }
              }
            },

            // Cell & Row Styles
            '& .MuiDataGrid-cell': {
              borderBottom: `2px solid ${theme.palette.divider}`,
              fontSize: '0.9rem',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: theme.palette.action.hover,
              transition: '0.3s',
            },
            '& .MuiDataGrid-row.Mui-selected': {
              backgroundColor: `${theme.palette.secondary.light}30`,
            },

            // Control Icons
            '& .MuiDataGrid-menuIcon': {
              display: 'block !important',
              visibility: 'visible !important',
              color: 'white'
            },
            '& .MuiDataGrid-sortIcon': {
              opacity: '1 !important',
              color: theme.palette.secondary.main
            },
            
            // Checkbox Styling
            '& .MuiCheckbox-root.Mui-checked': {
              color: theme.palette.secondary.main,
            },

            // General Styling
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: '#f8fafc',
            },
            '& .MuiDataGrid-columnHeaderTitleContainer': {
              justifyContent: 'space-between',
              width: '100%'
            },
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
            '& .MuiDataGrid-columnHeader:focus': {
              outline: 'none',
            },
            '& .MuiDataGrid-columnSeparator': {
              display: 'none',
            },
          }}
          getRowClassName={(params) => 
            params.indexRelativeToCurrentPage % 2 === 0 ? 'striped-row' : ''
          }
          slotProps={{
            columnMenu: {
              keepMounted: true,
              sx: {
                '& .MuiMenuItem-root': {
                  fontSize: '0.9rem',
                  color: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: `${theme.palette.primary.light}20`
                  }
                }
              }
            }
          }}
        />
      </Box>
    </ThemeProvider>
  );
};

export default MemberTable;