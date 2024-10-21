import { Box} from '@mui/material'

import Chart from "../../components/Chart"
import InputDialog from '../../components/InputDialog'

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
      <InputDialog/>
    </Box>
  )
}

export default Dashboard