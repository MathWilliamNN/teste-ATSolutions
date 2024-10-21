import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { useContext } from "react";
import { StatusContext } from "../../Context";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { RiDashboard2Fill } from "react-icons/ri";


const HambMenu = () => {

    const context = useContext(StatusContext);

    if (!context) {
        return null;
    }

    const { HambMenuStatus, setHambMenuStatus } = context

    return (
        <>
            <Drawer
                anchor="left"
                open={HambMenuStatus}
                onClose={() => setHambMenuStatus(false)}
            >
                <div style={{ width: 250 }}>
                    <List>
                        <ListItem component={Link} to="/" onClick={() => setHambMenuStatus(false)} sx={{color: 'black', textDecoration: 'none'}}>
                            <FaHome size={20} />
                            <ListItemText primary="Início" sx={{ paddingLeft: '12px' }} />
                        </ListItem>
                        <ListItem component={Link} to="/dashboard" onClick={() => setHambMenuStatus(false)}  sx={{color: 'black', textDecoration: 'none'}} >
                            <RiDashboard2Fill size={20} />
                            <ListItemText primary="Dashboard" sx={{ paddingLeft: '12px' }} />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        </>
    );
};

export default HambMenu;