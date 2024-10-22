import { AppBar, Toolbar, Typography } from "@mui/material"
import IconButton from '@mui/material/IconButton';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { useContext } from "react";
import { StatusContext } from "../../Context";


const Header: React.FC = () => {

    const context = useContext(StatusContext);

    // garantir que haja retorno do contexto
    if (!context) {
        return null;
    }

    const { setHambMenuStatus } = context;

    // função para abrir e fechar o menu hamburguer quando clicado no seu ícone 
    const toggleHambMenu = () => {
        setHambMenuStatus((prev: boolean) => !prev); 
    };

    return (
        <AppBar >
            <Toolbar>
                <IconButton onClick={toggleHambMenu}>
                    <GiHamburgerMenu />
                </IconButton>
                <Typography variant="h6" sx={{ paddingLeft: '24px', flexGrow: 1 }} >
                    AT Software Solutions
                </Typography>
                <IconButton >
                    <FaUser />
                </IconButton>

            </Toolbar>
        </AppBar>
    )
}

export default Header