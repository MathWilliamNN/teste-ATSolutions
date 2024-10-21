import {
  Box,
  //  Typography 
} from '@mui/material'

import Chart from "../../components/Chart"
// import FetchTest from '../../components/FetchTest'

const Dashboard = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        minHeight: '100vh',
      }}
    >
      <Chart />
    </Box>
  )
}

export default Dashboard