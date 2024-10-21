import React, { createContext, FC, ReactNode, useEffect, useState } from "react";


interface Framework {
    id: string;
    timestamp: string;
    angular: number;
    react: number;
    vue: number;
}


interface StatusContextType {
    HambMenuStatus: boolean;
    setHambMenuStatus: React.Dispatch<React.SetStateAction<boolean>>;
    APIData: Framework[];
    setAPIData: React.Dispatch<React.SetStateAction<Framework[]>>;
}

export const StatusContext = createContext<StatusContextType | undefined>(undefined);

interface StatusProviderProps {
    children: ReactNode;
}

export const StatusProvider: FC<StatusProviderProps> = ({ children }) => {

    const [HambMenuStatus, setHambMenuStatus] = useState<boolean>(false);
    const [APIData, setAPIData] = useState<Framework[]>([]);;
    const [error, setError] = useState(null);
    
    useEffect(() => {
        fetch('http://localhost:3001/frameworks')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar os dados');
                }
                return response.json();
            })
            .then((jsonData) => {
                setAPIData(jsonData);
            })
            .catch((error) => {
                setError(error);
            });
    }, [setAPIData]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <StatusContext.Provider value={{ HambMenuStatus, setHambMenuStatus, APIData, setAPIData}}>
            {children}
        </StatusContext.Provider>
    );
}