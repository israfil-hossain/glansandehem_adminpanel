import { Box,} from '@mui/material'
import React from 'react'

const PackageBreadcrumb = ({children}) => {
  return (
    <Box sx={{
        height: 15,
        padding:2,
        paddingBottom:5,
        textAlign:"center",
        justifyContent:"center",
        marginTop:"0px",
        marginBottom:"10px",
    }}>
        {children}
    </Box>
  )
}

export default PackageBreadcrumb