import { Box, Typography } from '@mui/material'

const Dashboard = () => {
    return(
        <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          minHeight: '100vh',
        }}
      >
        <Typography
          variant='h1'
          fontWeight="bold"
          sx={({ palette }) => ({
            color: palette.primary.main
          })}
        >
          Dashboard
        </Typography>   
      </Box>
    )
}

export default Dashboard