import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { StatusContext } from "../../Context";

interface Framework {
    id: string;
    timestamp: string;
    angular: number;
    react: number;
    vue: number;
}

const InputDialog = () => {

    const context = useContext(StatusContext);

    // garantir que haja retorno do contexto
    if (!context) {
        return null;
    }

    const { inputDialogStatus, setInputDialogStatus, setAPIData } = context;

    // variáveis que serão utilizadas no preenchimento do formulário
    const [reactValue, setReactValue] = useState<number>(0);
    const [angularValue, setAngularValue] = useState<number>(0);
    const [vueValue, setVueValue] = useState<number>(0);
    const [dateValue, setDateValue] = useState<string>('');

    // função para fechar a janela de input de dados
    const closeDialog = () => {
        setInputDialogStatus(false);
    };

    // função para realizar a requisição POST quando o form é enviado
    const PostData = (postingData: Framework) => {
        fetch('http://localhost:3001/frameworks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postingData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erro ao enviar os dados');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Dados enviados com sucesso:', data);
            })
            .catch((error) => {
                console.error('Erro ao enviar os dados:', error);
            });
    }

    // função para fazer a requisição PATCH caso a data inserida já exista nos dados
    const PatchData = (patchingDataId: string) => {

        fetch(`http://localhost:3001/frameworks/${patchingDataId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                angular: angularValue,
                react: reactValue,
                vue: vueValue,
                // timestamp: dataValue
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erro ao atualizar os dados');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Dados atualizados com sucesso:', data);
            })
            .catch((error) => {
                console.error('Erro ao atualizar os dados:', error);
            });

    }

    const UploadData = () => {

        const inputDate = new Date(dateValue);
        
        //formata a data inserida para YYYY-MM-DD
        const inputMonthYearDay = `${inputDate.getFullYear()}-${(inputDate.getMonth() + 1).toString().padStart(2, '0')}-${inputDate.getDate().toString().padStart(2, '0')}`;
        
        //Função que verifica se a data inserida já existe no array APIData, que contém os dados do servidor, recebidos no context
        setAPIData((prevAPIData) => {
            const existingRecordIndex = prevAPIData.findIndex(record => {
                const recordDate = new Date(record.timestamp);
                const recordMonthYearDay = `${recordDate.getFullYear()}-${(recordDate.getMonth() + 1).toString().padStart(2, '0')}-${recordDate.getDate().toString().padStart(2, '0')}`;
                return recordMonthYearDay === inputMonthYearDay;
            });


            if (existingRecordIndex !== -1) {
                //caso a data exista, substitui os valores contidos nela
                const updatedAPIData = [...prevAPIData];
                updatedAPIData[existingRecordIndex] = {
                    ...updatedAPIData[existingRecordIndex],
                    angular: angularValue,
                    react: reactValue,
                    vue: vueValue,
                    timestamp: dateValue
                };

                // chama a função patch para realizar a requisição para o servidor
                PatchData(updatedAPIData[existingRecordIndex].id);

                return updatedAPIData;

            } else {
                // caso a data seja nova, realiza a inserção do dado completo

                // gera um novo id incremental para o novo elemento
                const newId = (prevAPIData.length + 1).toString();

                // recebe os dados dos gráficos e coloca no objeto newRegister
                const newRegister = {
                    id: newId,
                    timestamp: dateValue,
                    angular: angularValue,
                    react: reactValue,
                    vue: vueValue
                };

                // realiza a requisição POST do novo dado, ao final da lista
                PostData(newRegister);

                // insere o registro novo no final do array APIData
                const newData = [...prevAPIData, newRegister];

                // organiza o array em ordem cronológica, garantindo que o último input seja colocado na ordem
                const sortedData = newData.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());


                return sortedData;
            }
        });

        //Fecha a caixa de diálogo após resolver o que for necessário
        closeDialog();
    };

    return (
        <Box>
            <Dialog open={inputDialogStatus} onClose={closeDialog}>
                <DialogTitle sx={{ paddingRight: '300px', fontWeight: '600' }}>Adicionar Registro</DialogTitle>
                <Typography sx={{ padding: '0 24px' }} variant="body2">Preencha os campos abaixo e clique em salvar</Typography>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: "center", gap: '8px' }}>
                    <Box sx={{ display: "flex", gap: '8px' }}>
                        <TextField type="number" label='React' InputLabelProps={{ shrink: true }} onChange={(e) => setReactValue(Number(e.target.value))}></TextField>
                        <TextField type="number" label='Angular' InputLabelProps={{ shrink: true }} onChange={(e) => setAngularValue(Number(e.target.value))}></TextField>
                        <TextField type="number" label='Vue' InputLabelProps={{ shrink: true }} onChange={(e) => setVueValue(Number(e.target.value))}></TextField>
                    </Box>
                    <TextField type="date" label='Data' sx={{ width: '30%' }} InputLabelProps={{ shrink: true }} onChange={(e) => setDateValue(e.target.value)}></TextField>
                </DialogContent>
                <DialogActions>
                    <Button sx={{backgroundColor: '#1976D2', color: 'black'}} onClick={closeDialog}>Cancel</Button>
                    <Button sx={{backgroundColor: '#1976D2', color: 'black'}} onClick={UploadData}>Submit</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default InputDialog;
