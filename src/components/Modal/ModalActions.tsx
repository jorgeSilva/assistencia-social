import React from 'react'
import style from './ModalActions.module.css'
import UseFetch from '../../service/useFetch';

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
  const token = localStorage.getItem('token') 
  const tokenValid = token ? token : 'nao'

  const {data, loading, error} = UseFetch<IFamilias>(`https://backendassistenciasocial-production.up.railway.app/familia/${id}`, {
    headers:{
      'Authorization': `Bearer ${JSON.parse(tokenValid)}`
    }
  })
  
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
                data && <table className={style.modal__table}>
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
                    <tr>
                      <th className={style.modal__table__th}> {data?.idExist.nome}</th>
                      <th className={style.modal__table__th}> {data?.idExist.cpf}</th>
                      <th className={style.modal__table__th}> {data?.idExist.parentesco}</th>
                      <th className={style.modal__table__th}> {data?.idExist.responsavel === true ? 'SIM' : 'NÃO' }</th>
                      <th className={style.modal__table__th}> {data?.idExist.dataNasc}</th>
                      <th className={style.modal__table__th}> {data?.idExist.nis}</th>
                      <th className={style.modal__table__th}> {data?.idExist.inicio}</th>
                      <th className={style.modal__table__th}> {data?.idExist.fim}</th>
                      <th className={style.modal__table__th}> {data?.idExist.nFilhosMaior}</th>
                      <th className={style.modal__table__th}> {data?.idExist.nFilhosMenor}</th>
                      <th className={style.modal__table__th}> {data?.idExist.residencia}</th>
                      <th className={style.modal__table__th}> {data?.idExist.idoso === true ? 'SIM' : 'NÃO'}</th>
                      <th className={style.modal__table__th}> {data?.idExist.bpc === true ? 'SIM' : 'NÃO'}</th>
                      <th className={style.modal__table__th}> {data?.idExist.contato}</th>
                      <th className={style.modal__table__th}> {data?.idExist.rua}</th>
                      <th className={style.modal__table__th}> {data?.idExist.bairro}</th>
                      <th className={style.modal__table__th}> {data?.idExist.nCasa}</th>
                      <th className={style.modal__table__th}> {data?.idExist.complemento}</th>
                      <th className={style.modal__table__th}> {data?.idExist.areaDeRisco === 'false' ? 'NÃO' : data?.idExist.areaDeRisco}</th>
                      <th className={style.modal__table__th}> {data?.idExist.fkUserCad.nome}</th>
                    </tr>
                  </tbody>
                }
              </table>
              )
            }
          </>
        )
        ||
        (          
          type === 'delete'
          &&
          <>
            {
              (
                loading && <p>carregando...</p>
              )
              ||
              (
                data && <table>
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
                    <tr>
                      <th> {data?.idExist.nome}</th>
                      <th> {data?.idExist.cpf}</th>
                      <th> {data?.idExist.parentesco}</th>
                      <th> {data?.idExist.responsavel === true ? 'SIM' : 'NÃO' }</th>
                      <th> {data?.idExist.dataNasc}</th>
                      <th> {data?.idExist.nis}</th>
                      <th> {data?.idExist.inicio}</th>
                      <th> {data?.idExist.fim}</th>
                      <th> {data?.idExist.nFilhosMaior}</th>
                      <th> {data?.idExist.nFilhosMenor}</th>
                      <th> {data?.idExist.residencia}</th>
                      <th> {data?.idExist.idoso === true ? 'SIM' : 'NÃO'}</th>
                      <th> {data?.idExist.bpc === true ? 'SIM' : 'NÃO'}</th>
                      <th> {data?.idExist.contato}</th>
                      <th> {data?.idExist.rua}</th>
                      <th> {data?.idExist.bairro}</th>
                      <th> {data?.idExist.nCasa}</th>
                      <th> {data?.idExist.complemento}</th>
                      <th> {data?.idExist.areaDeRisco === 'false' ? 'NÃO' : data?.idExist.areaDeRisco}</th>
                      <th> {data?.idExist.fkUserCad.nome}</th>
                    </tr>
                  </tbody>
                }
              </table>
              )
            }
          </>
        )
      }
    </div>
  )
}

export default ModalActions