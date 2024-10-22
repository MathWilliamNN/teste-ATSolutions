import React, { createContext, FC, ReactNode, useEffect, useState } from "react";

// interface para o input
interface Framework {
    id: string;
    timestamp: string;
    angular: number;
    react: number;
    vue: number;
}

// interface para as variáveis enviadas no value do contexto
interface StatusContextType {
    HambMenuStatus: boolean;
    setHambMenuStatus: React.Dispatch<React.SetStateAction<boolean>>;
    APIData: Framework[];
    setAPIData: React.Dispatch<React.SetStateAction<Framework[]>>;
    inputDialogStatus: boolean;
    setInputDialogStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

// interface para a children que será envolvida pelo provider
interface StatusProviderProps {
    children: ReactNode;
}

// criação do contexto
export const StatusContext = createContext<StatusContextType | undefined>(undefined);

// crialçao do provider
export const StatusProvider: FC<StatusProviderProps> = ({ children }) => {

    // variáveis que serão utilizadas, com o estado inicial de cada uma
    const [HambMenuStatus, setHambMenuStatus] = useState<boolean>(false);
    const [APIData, setAPIData] = useState<Framework[]>([]);;
    const [error, setError] = useState<Error | null>(null);
    const [inputDialogStatus, setInputDialogStatus] = useState<boolean>(false);
    

    // requisição GET, método não especificado pois é o padrão das requisições fetch. Pega todos os dados dos ervidor e insere no APIData, após organizar em ordem cronológica, useEffect para que renderize sempre que alterado
    useEffect(() => {
        fetch('http://localhost:3001/frameworks')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar os dados');
                }
                return response.json();
            })
            .then((jsonData) => {
                //organiza os dados recebidos
                const sortedData = jsonData.sort((a: Framework, b: Framework) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
               //insere na variavel APIData
                setAPIData(sortedData);
            })
            .catch((error) => {
                setError(error);
            });
    }, [setAPIData]);

    //exibe mensagem de erro na tela caso ocorra
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <StatusContext.Provider value={{ HambMenuStatus, setHambMenuStatus, APIData, setAPIData, inputDialogStatus, setInputDialogStatus}}>
            {children}
        </StatusContext.Provider>
    );
}