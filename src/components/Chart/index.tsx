
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useContext } from 'react';
import { StatusContext } from '../../Context';
import { Box, Button, Toolbar, Typography } from '@mui/material';
import { format } from 'date-fns';
import { IoMdAdd } from "react-icons/io";


Chart.register(...registerables);


const LineChart = () => {

    const context = useContext(StatusContext);

    if (!context) {
        return null;
    }

    const { APIData } = context

    const ToggleDataUpload = () => {
        console.log('Data upload')
    }

    const labels = APIData.map(item => {
        const date = new Date(item.timestamp);
        return format(date, 'MMM  yy');
    });

    const chartData = {
        labels: labels,

        datasets: [
            {
                label: 'Angular',
                data: APIData.map((item) => item.angular),
                borderColor: '#0289F9',
                backgroundColor: '#0289F9',
                fill: false,
            },
            {
                label: 'React',
                data: APIData.map((item) => item.react),
                borderColor: '#02F985',
                backgroundColor: '#02F985',
                fill: false,
            },
            {
                label: 'Vue',
                data: APIData.map((item) => item.vue),
                borderColor: '#F69532',
                backgroundColor: '#F69532',
                fill: false,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            y: {
                beginAtZero: false,
            },
            x: {
                grid: {
                    display: false,
                },

            },
        },
    }

    return (
        <Box sx={{ width: '80%', maxHeight: '50%', margin: '64px' }} >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ paddingBottom: '12px' }} >
                    Frameworks Javascript
                </Typography>
                <Button>
                    <IoMdAdd size={25} onClick={ToggleDataUpload} />
                </Button>
            </Toolbar>
            <Line data={chartData} options={chartOptions} />
        </Box >
    );

}

export default LineChart

