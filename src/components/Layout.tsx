import * as React from 'react'
import { Box } from '@mui/material'

export const HeaderRow = ({ children }) => (
  <Box display="flex" alignItems="center" paddingLeft="30px">
    {children}
  </Box>
)

export const DataRow = ({ children }) => (
  <Box display="flex" alignItems="center" padding="10px 0" borderBottom="1px grey solid">
    {children}
  </Box>
)

export const HeaderCell = ({ children }) => (
  <Box
    sx={{
      backgroundColor: '#45D9B1',
      color: 'black',
      textAlign: 'center',
      fontSize: '16px',
      width: '120px',
      height: '70px',
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {children}
  </Box>
)

export const DataCell = ({ children, color = 'inherit' }) => (
  <Box
    sx={{
      textAlign: 'center',
      fontSize: '16px',
      width: '120px',
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: color,
    }}
  >
    {children}
  </Box>
)

export const DeleteCell = () => <DataCell color="red">X</DataCell>
