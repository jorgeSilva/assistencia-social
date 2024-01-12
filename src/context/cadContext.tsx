import React from "react";
import api from "../service/api";

type ICadContex = {
  handleNome: any;
  handleCPF: any;
  handleParentesco: any;
  handleResponsavel: any;
  handleDataNascimento: any;
  handleNIS: any;
  handleDataInicio: any;
  handleDataFim: any;
  handleNFilhosMaior: any;
  handleNFilhosMenor: any;
  handleIdoso: any;
  handleBPC: any;
  handleTelefone: any;
  handleNomeRua: any;
  handleNomeBairro: any;
  handleNCasa: any;
  handleResidencia: any;
  handleAreaRisco: any;
  handleComplemento: any;
  handleCadFamilia: any;
  error: string | null;
  loading: boolean;
}

const CadContext = React.createContext<ICadContex | null>(null)

export const useProviderCad = () => {
  const context = React.useContext(CadContext)
  if(context === null) throw new Error('useContext deve estar dentro do Provider')
  return context
}

export const CadProvider = ({children}: React.PropsWithChildren) => {
  const [nome, setNome]                     = React.useState<string | null>(null)
  const [cpf, setCPF]                       = React.useState<number | null>(null)
  const [parentesco, setParentesco]         = React.useState<string | null>(null)
  const [responsavel, setResponsavel]       = React.useState<boolean | null>(null)
  const [dataNascimento, setDataNascimento] = React.useState<string | null>(null)
  const [NIS, setNIS]                       = React.useState<string | null>(null)
  const [dataInicio, setDataInicio]         = React.useState<string | null>(null)
  const [dataFim, setDataFim]               = React.useState<string | null>(null)
  const [nFilhosMaior, setNFilhosMaior]     = React.useState<number | null>(null)
  const [nFilhosMenor, setNFilhosMenor]     = React.useState<number | null>(null)
  const [idoso, setIdoso]                   = React.useState<boolean | null>(null)
  const [BPC, setBPC]                       = React.useState<boolean | null>(null)
  const [Telefone, setTelefone]             = React.useState<string | null>(null)
  const [nomeRua, setNomeRua]               = React.useState<string | null>(null)
  const [nomeBairro, setNomeBairro]         = React.useState<string | null>(null)
  const [complemento, setComplemento]       = React.useState<string | null>(null)
  const [nCasa, setNCasa]                   = React.useState<number | null>(null)
  const [residencia, setResidencia]         = React.useState<string | null>(null)
  const [areaRisco, setAreaRisco]           = React.useState<string | false>(false)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string | null>(null)
  const url = document.URL.split("/")[4]
  
  const handleNome = (e: any) => {
    setNome(e.target.value);
  }

  const handleCPF = (e: any) => {
    setCPF(e.target.value);
  }

  const handleParentesco = (e: any) => {
    setParentesco(e.target.value);
  }

  const handleResponsavel = (e: any) => {
    setResponsavel(e.target.value);
  }

  const handleDataNascimento = (e: any) => {
    setDataNascimento(e.target.value);
  }

  const handleNIS = (e: any) => {
    setNIS(e.target.value);
  }

  const handleDataInicio = (e: any) => {
    setDataInicio(e.target.value);
  }

  const handleDataFim = (e: any) => {
    setDataFim(e.target.value);
  }

  const handleNFilhosMaior = (e: any) => {
    setNFilhosMaior(e.target.value);
  }

  const handleNFilhosMenor = (e: any) => {
    setNFilhosMenor(e.target.value);
  }

  const handleIdoso = (e: any) => {
    setIdoso(e.target.value);
  }

  const handleBPC = (e: any) => {
    setBPC(e.target.value);
  }

  const handleTelefone = (e: any) => {
    setTelefone(e.target.value);
  }

  const handleNomeRua = (e: any) => {
    setNomeRua(e.target.value);
  }

  const handleNomeBairro = (e: any) => {
    setNomeBairro(e.target.value);
  }

  const handleNCasa = (e: any) => {
    setNCasa(e.target.value);
  }

  const handleComplemento = (e: any) => {
    setComplemento(e.target.value);
  }

  const handleResidencia = (e: any) => {
    setResidencia(e.target.value);
  }

  const handleAreaRisco = (e: any) => {
    setAreaRisco(e.target.value);
  }

  async function handleCadFamilia(e: any){
    e.preventDefault()

    setLoading(true)
    await api.post(`/familia`, {
      nome: nome,
      cpf: cpf,
      parentesco: parentesco,
      responsavel: responsavel,
      dataNasc: dataNascimento,
      nis: NIS,
      inicio: dataInicio,
      fim: dataFim,
      nFilhosMaior: nFilhosMaior,
      nFilhosMenor: nFilhosMenor,
      residencia: residencia,
      idoso: idoso,
      bpc: BPC,
      contato: Telefone,
      rua: nomeRua,
      bairro: nomeBairro,
      nCasa: nCasa,
      complemento: complemento,
      areaDeRisco: areaRisco,
      fkUserCad: url
    }).then(({data}) => {
      console.log(data)
    }).catch(e => setError(e.response.data.error))
    .finally(() => {
      setLoading(false)
    })
  }

  return <CadContext.Provider value={{
    handleNome, 
    handleCPF,
    handleParentesco,
    handleResponsavel,
    handleDataNascimento,
    handleNIS,
    handleDataInicio,
    handleDataFim,
    handleNFilhosMaior,
    handleNFilhosMenor,
    handleIdoso,
    handleBPC,
    handleTelefone,
    handleNomeRua,
    handleNomeBairro,
    handleNCasa,
    handleResidencia,
    handleAreaRisco,
    handleComplemento,
    handleCadFamilia,
    error,
    loading
    }}>
    {children}
  </CadContext.Provider>
}