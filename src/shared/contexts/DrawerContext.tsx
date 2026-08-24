import {
    createContext,
    useCallback,
    useContext,
    useState
} from 'react';


interface IDrawerContextData {
    isDrawerOpen: boolean;
    toggleDrawerOpen: () => void;
    drawerOptions:IDrawerOptions[];
    setDrawerOptions:(newDrawerOptions:IDrawerOptions[]) => void;
}

const DrawerContext = createContext({} as IDrawerContextData);

interface ITDrawerContextProps {
    children: React.ReactNode;
}

export const useDrawerContext = () => {
    //O hook useContext é usado para acessar o contexto criado pelo ThemeContext. Ele retorna o valor atual do contexto, que é um objeto contendo o nome do tema atual (themeName) e a função para alternar o tema (toggleTheme). Isso permite que qualquer componente que utilize esse hook tenha acesso ao tema atual e possa alterná-lo conforme necessário.
    return useContext(DrawerContext);
}

interface IDrawerOptions{
    icon:string;
    label:string;
    path:string;
}

export const DrawerProvider: React.FC<ITDrawerContextProps> = ({ children }) => {

    //No react o useState é usado para criar um estado local dentro de um componente funcional. Ele retorna um array com dois elementos: o valor atual do estado e uma função para atualizá-lo. No caso do código fornecido, useState está sendo usado para criar um estado chamado themeName, que pode ter os valores 'light' ou 'dark', e a função setThemeName é usada para atualizar esse estado.
    //Ja o useCallback é um hook que retorna uma versão memoizada de uma função de callback. Ele é útil para otimizar o desempenho, evitando que funções sejam recriadas em cada renderização do componente. No código fornecido, useCallback está sendo usado para criar a função toggleTheme, que alterna o valor do estado themeName entre 'light' e 'dark'.
    //Por fim o useMemo é um hook que retorna um valor memoizado. Ele é útil para otimizar o desempenho, evitando cálculos desnecessários em cada renderização do componente. No código fornecido, useMemo está sendo usado para criar a variável theme, que depende do valor do estado themeName e retorna o tema correspondente (LightTheme ou DarkTheme).

    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

    const [drawerOptions, setDrawerOptions] = useState<IDrawerOptions[]>([]);

    const toggleDrawerOpen = useCallback(() => {
        setIsDrawerOpen((oldDrawerOpen) => !oldDrawerOpen);
    }, []);

    const handleSetDrawerOptions = useCallback((newDrawerOptions:IDrawerOptions[]) => {
        setDrawerOptions(newDrawerOptions)
    }, []);

    return (
        <DrawerContext.Provider  value={{ isDrawerOpen, toggleDrawerOpen, drawerOptions, setDrawerOptions:handleSetDrawerOptions }}>

            {children}

        </DrawerContext.Provider>
    );
}