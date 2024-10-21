import { Drawer } from "@mui/material";
import { useContext } from "react";
import { StatusContext } from "../../Context";

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
                    Aside
                </div>
            </Drawer>
        </>
    );
};

export default HambMenu;