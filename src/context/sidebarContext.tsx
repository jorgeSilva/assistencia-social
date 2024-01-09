import React from "react";

type ISidebarType = {
  handleClick: any;
  content: string;
  id: string | null;
}

const SidebarContext = React.createContext<ISidebarType | null>(null)

export const useProviderSidebar = () => {
  const context = React.useContext(SidebarContext)
  if(context === null) throw new Error('useContext deve estar dentro do Provider')
  return context
}

export const SidebarProvider = ({children}: React.PropsWithChildren) => {
  const [content, setContent] = React.useState('controle')
  const [id, setID] = React.useState('controle')

  const handleClick = (e: any) => {
    const text = e.target.innerText.toLocaleLowerCase()
    const idButton = e.target.id.toLocaleLowerCase()

    if(idButton === e.target.id){
      setID(idButton)
      setContent(idButton)
    }
  }

  return <SidebarContext.Provider value={{handleClick, content, id}}>
    {children}
  </SidebarContext.Provider>
}

