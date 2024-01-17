import React from "react";

type ISidebarType = {
  handleClick: any;
  content: string;
  id: string | null;
  setFamilia: React.Dispatch<React.SetStateAction<IFamilias | null>>;
  familiaFilter: IFamilias | null;
}

type IFamilias = {
  _id: string;
  nome: string;
  cpf: string;
  parentesco: string;
  responsavel: boolean;
  dataNasc: string;
  nis: string;
  inicio: string;
  fim: string;
  nFilhosMaior: number;
  nFilhosMenor: number;
  residencia: string;
  idoso: boolean;
  bpc: boolean;
  contato: string;
  rua: string;
  bairro: string;
  nCasa: number;
  complemento: string;
  areaDeRisco: string;
  fkUserCad: {
      cpf: number;
      nome: string;
      patamar: string;
      senha: string;
      _id: string;
  };
}[] | undefined

const SidebarContext = React.createContext<ISidebarType | null>(null)

export const useProviderSidebar = () => {
  const context = React.useContext(SidebarContext)
  if(context === null) throw new Error('useContext deve estar dentro do Provider')
  return context
}

export const SidebarProvider = ({children}: React.PropsWithChildren) => {
  const [content, setContent] = React.useState('controle')
  const [id, setID] = React.useState('controle')
  const [familiaFilter, setFamilia] = React.useState<IFamilias | null>(null)

  const handleClick = (e: any) => {
    const text = e.target.innerText.toLocaleLowerCase()
    const idButton = e.target.id.toLocaleLowerCase()

    if(idButton === e.target.id){
      setID(idButton)
      setContent(idButton)
    }
  }

  return <SidebarContext.Provider value={{handleClick, setFamilia, content, id, familiaFilter}}>
    {children}
  </SidebarContext.Provider>
}

