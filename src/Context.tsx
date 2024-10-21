import React, { createContext, FC, ReactNode } from "react";

interface StatusContextType {
    HambMenuStatus: boolean;
    setHambMenuStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

export const StatusContext = createContext<StatusContextType | undefined>(undefined);

interface StatusProviderProps {
    children: ReactNode;
}

export const StatusProvider: FC<StatusProviderProps> = ({ children }) => {

    const [HambMenuStatus, setHambMenuStatus] = React.useState<boolean>(false);

    return (
        <StatusContext.Provider value={{ HambMenuStatus, setHambMenuStatus}}>
            {children}
        </StatusContext.Provider>
    );
}