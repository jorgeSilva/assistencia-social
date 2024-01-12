import React from 'react'
import style from './ModalActions.module.css'
import UseFetch from '../../service/useFetch';
import { useProviderCad } from '../../context/cadContext';
import api from '../../service/api';

type IModalType = {
  id: string;
  type: string;
}

type IFamilias = {
  idExist: {
    _id: string,
    nome: string,
    cpf: number,
    parentesco: string,
    responsavel: true,
    dataNasc: string,
    nis: string,
    inicio: string,
    fim: string,
    nFilhosMaior: number,
    nFilhosMenor: number,
    residencia: string,
    idoso: boolean,
    bpc: boolean,
    contato: string,
    rua: string,
    bairro: string,
    nCasa: number,
    complemento: string,
    areaDeRisco: string,
    fkUserCad: {
      cpf: number;
      nome: string;
      patamar: 'master' | 'equipe' | 'saude';
      senha: string;
      _id: string;
    },
  }
}

const ModalActions = ({id, type}: IModalType) => {

  // ------------------------------------------------------------- Variaveis da tela -----------------------------------------------------------------

  const token = localStorage.getItem('token') 
  const tokenValid = token ? token : 'nao'
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
  const [loadingUP, setLoadingUP] = React.useState<boolean>(false)
  const [errorUP, setErrorUP] = React.useState<string | null>(null)
  const [idFamilia, setIdFamilia] = React.useState<string>('')
  const url = document.URL.split("/")[4]

  // ------------------------------------------------------------- Chamadas api -----------------------------------------------------------------

  const {data, loading, error} = UseFetch<IFamilias>(`https://backendassistenciasocial-production.up.railway.app/familia/${id}`, {
    headers:{
      'Authorization': `Bearer ${JSON.parse(tokenValid)}`
    }
  })
  
  async function handleUpdateFamilia(e: any) {
    e.preventDefault()

    setLoadingUP(true)
    await api.put(`/familia/update/${id}`, {
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
    },
    {
      headers:{
        'Authorization': `Bearer ${JSON.parse(tokenValid)}`
      }
    }
    ).then(({data}: any) => {
      console.log(data)
    }).catch((e: any) => console.log(e))
    .finally(() => {
      setLoadingUP(false)
    })
  }

  async function handleDeleteFamilia(e: any){
    e.preventDefault()

    setLoadingUP(true)
    await api.post(`familia/excluidos`, {
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
    }).then(() => {
      api.delete(`/familia/delete/${id}`,
      {
        headers:{
          'Authorization': `Bearer ${JSON.parse(tokenValid)}`
        }
      }).then(r => console.log(r)).catch(e => console.log(e))
    }).catch(e => console.log(e))
    .finally(() => setLoadingUP(false))
  }

  // ------------------------------------------------------------- React useEffect -----------------------------------------------------------------

  React.useEffect(() => {
    setIdFamilia(id)
  }, [id])

  React.useEffect(() => {
    if(data){
      setNome(data?.idExist.nome)
      setCPF(data?.idExist.cpf)
      setParentesco(data?.idExist.parentesco)
      setResponsavel(data?.idExist.responsavel)
      setDataNascimento(data?.idExist.dataNasc)
      setNIS(data?.idExist.nis)
      setDataInicio(data?.idExist.inicio)
      setDataFim(data?.idExist.fim)
      setNFilhosMaior(data?.idExist.nFilhosMaior)
      setNFilhosMenor(data?.idExist.nFilhosMenor)
      setIdoso(data?.idExist.idoso)
      setBPC(data?.idExist.bpc)
      setTelefone(data?.idExist.contato)
      setNomeRua(data?.idExist.rua)
      setNomeBairro(data?.idExist.bairro)
      setComplemento(data?.idExist.complemento)
      setNCasa(data?.idExist.nCasa)
      setResidencia(data?.idExist.residencia)
      setAreaRisco(data?.idExist.areaDeRisco === 'false' ? 'NÃO' : data?.idExist.areaDeRisco)
    }
  }, [data])

  return (
    <div>
      {
        (
          type === 'update'
          &&
          <>
            <h1 className={style.modal__h1}>Faça alterações no sistema</h1>
            {
              (
                loading && <p style={{display: "flex", alignItems: 'center', justifyContent: 'center'}}>carregando...</p>
              )
              ||
              (
                data &&
                <>
                  <table className={style.modal__table}>
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Parentesco</th>
                        <th>Responsavel</th>
                        <th>Data nascimento</th>
                        <th>NISS</th>
                        <th>Inicio</th>
                        <th>Fim</th>
                        <th>N° Filhos maior</th>
                        <th>N° Filhos menor</th>
                        <th>Residencia</th>
                        <th>Idoso</th>
                        <th>BPC</th>
                        <th>Contato</th>
                        <th>Rua</th>
                        <th>Bairro</th>
                        <th>N° Casa</th>
                        <th>Complemento</th>
                        <th>Area de Risco</th>
                        <th>Quem cadastrou ?</th>
                      </tr>
                    </thead>
                    
                    {
                      (
                        loading && <p>carregando...</p>
                      )

                      ||

                      <tbody>
                        {
                          !loading && data && 
                          <tr>
                            <th className={style.modal__table__th}>
                              <input type="text" onChange={(e) => setNome(e.target.value)} value={nome? nome : ''}/>
                            </th>

                            <th className={style.modal__table__th}>
                              <input type="number" onChange={(e) => setCPF(Number(e.target.value))} value={cpf? cpf : ''}/>
                            </th>

                            <th className={style.modal__table__th}>
                              <input type="text" onChange={(e) => setParentesco(e.target.value)} value={parentesco? parentesco : ''}/>
                            </th>

                            <th className={style.modal__table__th}>
                              <input type="text" onChange={(e) => setResponsavel(Boolean(e.target.value))} value={responsavel === true ? 'SIM' : 'NÃO'}/>
                            </th>

                            <th className={style.modal__table__th}>
                              <input type="text" onChange={(e) => setDataNascimento(e.target.value)} value={dataNascimento? dataNascimento : ''} />
                            </th>

                            <th className={style.modal__table__th}>
                              <input type="text" onChange={(e) => setNIS(e.target.value)} value={NIS? NIS : ''} />
                            </th>

                            <th className={style.modal__table__th}>
                              <input type="text" onChange={(e) => setDataInicio(e.target.value)} value={dataInicio? dataInicio : ''} />
                            </th>

                            <th className={style.modal__table__th}>
                              <input type="text" onChange={(e) => setDataFim(e.target.value)} value={dataFim? dataFim : ''} />
                            </th>

                            <th className={style.modal__table__th}>
                              <input type="text" onChange={(e) => setNFilhosMaior(Number(e.target.value))} value={nFilhosMaior? nFilhosMaior : 0} />
                            </th>

                            <th className={style.modal__table__th}>
                              <input type="text" onChange={(e) => setNFilhosMenor(Number(e.target.value))} value={nFilhosMenor? nFilhosMenor : 0} />
                            </th>

                            <th className={style.modal__table__th}>
                              <input type="text" onChange={(e) => setResidencia((e.target.value))} value={residencia? residencia : ''} />
                            </th>

                            <th className={style.modal__table__th}>
                              <input type="text" onChange={(e) => setIdoso(Boolean(e.target.value))} value={idoso === true ? 'SIM' : 'NÃO'} />
                            </th>

                            <th className={style.modal__table__th}>
                              <input type="text" onChange={(e) => setBPC(Boolean(e.target.value))} value={BPC === true ? 'SIM' : 'NÃO'} />
                            </th>

                            <th className={style.modal__table__th}>
                              <input type="text" onChange={(e) => setTelefone((e.target.value))} value={Telefone? Telefone : ''} />
                            </th>

                            <th className={style.modal__table__th}>
                              <input type="text" onChange={(e) => setNomeRua((e.target.value))} value={nomeRua? nomeRua : ''} />
                            </th>

                            <th className={style.modal__table__th}>
                              <input type="text" onChange={(e) => setNomeBairro((e.target.value))} value={nomeBairro? nomeBairro : ''} />
                            </th>

                            <th className={style.modal__table__th}>
                              <input type="text" onChange={(e) => setNCasa(Number(e.target.value))} value={nCasa? nCasa : ''} />
                            </th>

                            <th className={style.modal__table__th}>
                              <input type="text" onChange={(e) => setComplemento((e.target.value))} value={complemento? complemento : ''} />
                            </th>

                            <th className={style.modal__table__th}>
                              <input type="text" onChange={(e) => setAreaRisco((e.target.value))} value={areaRisco? areaRisco : ''} />
                            </th>

                            <th className={style.modal__table__th}>
                              {data?.idExist.fkUserCad.nome}
                            </th>
                          </tr>
                        }
                      </tbody>
                    }
                  </table>

                  <button className={style.buttom__delete__update} onClick={handleUpdateFamilia}>Salvar edição</button>
                </>
              )
            }
          </>
        )
        ||
        (          
          type === 'delete'
          &&
          <>
            <h1 className={style.modal__h1}>Delete o registro de determinada familia</h1>
            {
              (
                loading && <p style={{display: "flex", alignItems: 'center', justifyContent: 'center'}}>carregando...</p>
              )
              ||
              (
                data &&
                <>
                  <table className={style.modal__table}>
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Parentesco</th>
                        <th>Responsavel</th>
                        <th>Data nascimento</th>
                        <th>NISS</th>
                        <th>Inicio</th>
                        <th>Fim</th>
                        <th>N° Filhos maior</th>
                        <th>N° Filhos menor</th>
                        <th>Residencia</th>
                        <th>Idoso</th>
                        <th>BPC</th>
                        <th>Contato</th>
                        <th>Rua</th>
                        <th>Bairro</th>
                        <th>N° Casa</th>
                        <th>Complemento</th>
                        <th>Area de Risco</th>
                        <th>Quem cadastrou ?</th>
                      </tr>
                    </thead>
                    
                    {
                      (
                        loading && <p>carregando...</p>
                      )

                      ||

                      <tbody>
                        {
                          !loading && data && 
                          <tr>
                            <th className={style.modal__table__th}>
                              <input type="text" onChange={(e) => setNome(e.target.value)} value={nome? nome : ''}/>
                            </th>

                            <th className={style.modal__table__th}>
                              <input type="number" onChange={(e) => setCPF(Number(e.target.value))} value={cpf? cpf : ''}/>
                            </th>

                            <th className={style.modal__table__th}>
                              <input type="text" onChange={(e) => setParentesco(e.target.value)} value={parentesco? parentesco : ''}/>
                            </th>

                            <th className={style.modal__table__th}>
                              <input type="text" onChange={(e) => setResponsavel(Boolean(e.target.value))} value={responsavel === true ? 'SIM' : 'NÃO'}/>
                            </th>

                            <th className={style.modal__table__th}>
                              <input type="text" onChange={(e) => setDataNascimento(e.target.value)} value={dataNascimento? dataNascimento : ''} />
                            </th>

                            <th className={style.modal__table__th}>
                              <input type="text" onChange={(e) => setNIS(e.target.value)} value={NIS? NIS : ''} />
                            </th>

                            <th className={style.modal__table__th}>
                              <input type="text" onChange={(e) => setDataInicio(e.target.value)} value={dataInicio? dataInicio : ''} />
                            </th>

                            <th className={style.modal__table__th}>
                              <input type="text" onChange={(e) => setDataFim(e.target.value)} value={dataFim? dataFim : ''} />
                            </th>

                            <th className={style.modal__table__th}>
                              <input type="text" onChange={(e) => setNFilhosMaior(Number(e.target.value))} value={nFilhosMaior? nFilhosMaior : 0} />
                            </th>

                            <th className={style.modal__table__th}>
                              <input type="text" onChange={(e) => setNFilhosMenor(Number(e.target.value))} value={nFilhosMenor? nFilhosMenor : 0} />
                            </th>

                            <th className={style.modal__table__th}>
                              <input type="text" onChange={(e) => setResidencia((e.target.value))} value={residencia? residencia : ''} />
                            </th>

                            <th className={style.modal__table__th}>
                              <input type="text" onChange={(e) => setIdoso(Boolean(e.target.value))} value={idoso === true ? 'SIM' : 'NÃO'} />
                            </th>

                            <th className={style.modal__table__th}>
                              <input type="text" onChange={(e) => setBPC(Boolean(e.target.value))} value={BPC === true ? 'SIM' : 'NÃO'} />
                            </th>

                            <th className={style.modal__table__th}>
                              <input type="text" onChange={(e) => setTelefone((e.target.value))} value={Telefone? Telefone : ''} />
                            </th>

                            <th className={style.modal__table__th}>
                              <input type="text" onChange={(e) => setNomeRua((e.target.value))} value={nomeRua? nomeRua : ''} />
                            </th>

                            <th className={style.modal__table__th}>
                              <input type="text" onChange={(e) => setNomeBairro((e.target.value))} value={nomeBairro? nomeBairro : ''} />
                            </th>

                            <th className={style.modal__table__th}>
                              <input type="text" onChange={(e) => setNCasa(Number(e.target.value))} value={nCasa? nCasa : ''} />
                            </th>

                            <th className={style.modal__table__th}>
                              <input type="text" onChange={(e) => setComplemento((e.target.value))} value={complemento? complemento : ''} />
                            </th>

                            <th className={style.modal__table__th}>
                              <input type="text" onChange={(e) => setAreaRisco((e.target.value))} value={areaRisco? areaRisco : ''} />
                            </th>

                            <th className={style.modal__table__th}>
                              {data?.idExist.fkUserCad.nome}
                            </th>
                          </tr>
                        }
                      </tbody>
                    }
                  </table>

                  <button className={style.buttom__delete__update} onClick={handleDeleteFamilia}>Excluir Cadastro</button>
                </>
              )
            }
          </>
        )
      }
    </div>
  )
}

export default ModalActions