import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { StatusContext } from "../../Context";

const InputDialog = () => {

    const context = useContext(StatusContext);

    if (!context) {
        return null;
    }

    const { inputDialogStatus, setInputDialogStatus, setAPIData } = context;

    const [reactValue, setReactValue] = useState<number>(0);
    const [angularValue, setAngularValue] = useState<number>(0);
    const [vueValue, setVueValue] = useState<number>(0);
    const [dateValue, setDateValue] = useState<string>('');

    const closeDialog = () => {
        setInputDialogStatus(false);
    };

    const UploadData = () => {

        // Verificar se a data já existe (verificando apenas mês/ano)
        const inputDate = new Date(dateValue);
        const inputMonthYear = `${inputDate.getFullYear()}-${(inputDate.getMonth() + 1).toString().padStart(2, '0')}`;

        setAPIData((prevAPIData) => {
            const existingRecordIndex = prevAPIData.findIndex(record => {
                const recordDate = new Date(record.timestamp);
                const recordMonthYear = `${recordDate.getFullYear()}-${(recordDate.getMonth() + 1).toString().padStart(2, '0')}`;
                return recordMonthYear === inputMonthYear;
            });

            if (existingRecordIndex !== -1) {
                console.log('data existente');
                const updatedAPIData = [...prevAPIData];
                updatedAPIData[existingRecordIndex] = {
                    ...updatedAPIData[existingRecordIndex],
                    angular: angularValue,
                    react: reactValue,
                    vue: vueValue
                };

                console.log('Registro atualizado:', updatedAPIData[existingRecordIndex]);
                return updatedAPIData;
            } else {
                console.log('data nao existente');
                const newId = (prevAPIData.length + 1).toString();

                const newRegister = {
                    id: newId,
                    timestamp: dateValue,
                    angular: angularValue,
                    react: reactValue,
                    vue: vueValue
                };

                console.log('Novo registro:', newRegister);

                // Adicionando o novo registro à lista e ordenando com base na data (mes-ano)
                const newData = [...prevAPIData, newRegister];
                return newData.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
            }
        });

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
                    <Button onClick={closeDialog}>Cancel</Button>
                    <Button onClick={UploadData}>Submit</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default InputDialog;
