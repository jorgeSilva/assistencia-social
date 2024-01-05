import React from "react";
import api from "../service/api";

type LoginContext = {
  handleCPF: any;
  handleSenha: any;
  handleLogin: any;
  handleLogout: any;
  loading: boolean;
  error: string | null;
  data: DataLogin | null;
  authorized: boolean;
}

type DataLogin = {
  token: string;
  user: {
    cpf: number;
    nome: string;
    patamar: "master" | "equipe" | "saude";
    senha: string;
    _id: string
  }
}

const Context = React.createContext<LoginContext | null>(null)

export const useProvider = () =>{
  const context = React.useContext(Context)
  if(context === null)throw new Error('useContext deve estar dentro do Provider')
  return context
}

export const AuthProvider = ({children}: React.PropsWithChildren) => {
  const [cpf, setCPF] = React.useState<string | null>(null)
  const [senha, setSenha] = React.useState(null)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string | null>(null)
  const [authorized, setAuthorized] = React.useState<boolean>(false)
  const [data, setData] = React.useState<DataLogin | null>(null)
  
  const handleCPF = ({target}: any) => {
    let inputLength = target.value.length

    if(inputLength === 3 || inputLength === 7) target.value += '.'
    else if(inputLength === 11) target.value += '-'
    setCPF(target.value)
  }

  const handleSenha = ({target}: any) => {
    setSenha(target.value)
  } 

  const handleLogin = async (e: any) => {
    e.preventDefault()

    let formatCPF: number = 0
    if(cpf) formatCPF = Number(cpf.replace('.', '').replace('.', '').replace('-', '').trim())
    
    setLoading(true)
    await api.post(`/usuario/login`, {
      cpf: formatCPF,
      senha
    }).then(({data}) => {
      setError(null);
      setData(data)
      localStorage.setItem('token', JSON.stringify(data.token))
      localStorage.setItem('authenticated', JSON.stringify(true))
      setAuthorized(true)

    }).catch((e) => {
      setError(e.response.data.error);
    }).finally(() => {
      setLoading(false)
    })
  }

  const handleLogout = async () => {
    if(window.confirm("Você deseja realmente deixar está conta ?") === true){
      setAuthorized(false)
      localStorage.removeItem('token')
      localStorage.removeItem('authenticated')
      api.defaults.headers.Authorization = null
      window.location.href = '/'
    }
  }

  return <Context.Provider value={{handleCPF, handleSenha, handleLogin, handleLogout, loading, error, data, authorized}}>
    {children}
  </Context.Provider>
}