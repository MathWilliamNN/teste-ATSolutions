import { Line } from 'react-chartjs-2';
import { Chart, registerables, ChartOptions } from 'chart.js';
import { useContext } from 'react';
import { StatusContext } from '../../Context';
import { Box, Button, Toolbar, Typography } from '@mui/material';
import { format } from 'date-fns';
import { IoMdAdd } from "react-icons/io";
import 'chartjs-adapter-date-fns';

Chart.register(...registerables); // registro de plugins para formatação

const LineChart = () => {
    const context = useContext(StatusContext);

    if (!context) {
        return null;
    }

    const { APIData, setInputDialogStatus } = context;

    // verifica a data máxima inserida até o momento, utilizada para determinar o limite de exibição na linha 77
    const maxDate = new Date(Math.max(...APIData.map((item) => new Date(item.timestamp).getTime())));

    // função que lida com abertura da caixa de diálogo qdo o botão é clicado
    const ToggleDataUpload = () => {
        setInputDialogStatus(true);
    };

    // dados do gráfico (cor, legenda, valores x e y)
    const chartData = {
        datasets: [
            {
                label: 'Angular',
                data: APIData.map((item) => ({ x: new Date(item.timestamp), y: item.angular })),
                borderColor: '#0289F9',
                backgroundColor: '#0289F9',
                fill: false,
            },
            {
                label: 'React',
                data: APIData.map((item) => ({ x: new Date(item.timestamp), y: item.react })),
                borderColor: '#02F985',
                backgroundColor: '#02F985',
                fill: false,
            },
            {
                label: 'Vue',
                data: APIData.map((item) => ({ x: new Date(item.timestamp), y: item.vue })),
                borderColor: '#F69532',
                backgroundColor: '#F69532',
                fill: false,
            },
        ],
    };

    // opções de formatação do gráfico
    const chartOptions: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            legend: {
                display: true, //mostrar legendas
            },
            tooltip: {
                enabled: true, // mostrar dados quando passar o mouse
            },
        },
        scales: {
            y: {
                beginAtZero: false,
            },
            x: { // formatação dos dados do eixo
                type: 'time',
                time: {
                    unit: 'month', 
                    tooltipFormat: 'MMM dd, yyyy',
                    displayFormats: {
                        month: 'MMM yy', 
                    },
                },
                // data máxima do array + 1 mês para garantir que mostre o último
                max: maxDate.setMonth(maxDate.getMonth() + 1),
                ticks: {
                    callback: function (tickValue: string | number, index: number) { // essa função callback faz com que somente as datas cujo dia seja 1 sejam exibidas, e quando forem exibidas, será somente o mês/ano
                        const date = new Date(tickValue);
                        if (date.getDate() === 1 || index === 0 || index === chartData.datasets[0].data.length - 1) {
                            return format(date, 'MMM yy'); 
                        }
                        return ''; 
                    },
                },
                grid: {
                    display: false, // não mostrar linhas de grade em x 
                },
            },
        },
    };

    return (
        <Box sx={{ width: '75%', margin: '64px' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5">
                    Frameworks Javascript
                </Typography>
                <Button>
                    <IoMdAdd size={30} onClick={ToggleDataUpload} />
                </Button>
            </Toolbar>
            <Line data={chartData} options={chartOptions} />
        </Box>
    );
};

export default LineChart;
