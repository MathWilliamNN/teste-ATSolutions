import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { useContext } from "react";
import { StatusContext } from "../../Context";
import { Link } from "react-router-dom";
import { FaHome, FaUsers } from "react-icons/fa";
import { RiDashboard2Fill } from "react-icons/ri";


const HambMenu = () => {

    const context = useContext(StatusContext);

    // garantir que haja retorno do contexto
    if (!context) {
        return null;
    }

    const { HambMenuStatus, setHambMenuStatus } = context

    return (
        <>
            <Drawer
                anchor="left"
                open={HambMenuStatus} // abre de acordo com o valor da variável colocada no context
                onClose={() => setHambMenuStatus(false)} // fecha quando clicar fora da janela
            >
                <div style={{ width: 250 }}>
                    <List>
                        {/* formatação e funcionalidade dos itens da lista (cor, e página destino), também função para fechar o menu quando clicado */}
                        <ListItem component={Link} to="/" onClick={() => setHambMenuStatus(false)} sx={{color: '#4F4F4F', textDecoration: 'none'}}>
                            <FaHome size={20} />
                            <ListItemText primary="Início" sx={{ paddingLeft: '12px' }} />
                        </ListItem>
                        <ListItem component={Link} to="/dashboard" onClick={() => setHambMenuStatus(false)}  sx={{color: '#4F4F4F', textDecoration: 'none'}} >
                            <RiDashboard2Fill size={20} />
                            <ListItemText primary="Dashboard" sx={{ paddingLeft: '12px' }} />
                        </ListItem>
                        <ListItem component={Link} to="/" onClick={() => setHambMenuStatus(false)}  sx={{color: '#4F4F4F', textDecoration: 'none'}} >
                            <FaUsers size={20} />
                            <ListItemText primary="Usuários" sx={{ paddingLeft: '12px' }} />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        </>
    );
};

export default HambMenu;