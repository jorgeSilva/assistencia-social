import React from 'react'
import style from './Form.module.css'
import Input from  '../InputCad/Input'
import { useProvider } from '../../context/loginContext';
import { useProviderCad } from '../../context/cadContext';

type IContentId = {
  id: string;
}

const Form = ({id}: IContentId) => {
  const {
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
    handleComplemento,
    handleResidencia,
    handleAreaRisco,
    handleCadFamilia,
    error,
    msgSucces,
    loading
  } = useProviderCad()  

  return (
    <>
      {
        (
          id === 'familias'
          &&
          <form action="" className={style.form__content}>
            <Input type='text' name='Nome' id='nome' onChange={handleNome}/>
            <Input type='number' name='CPF' id='cpf' onChange={handleCPF}/>
            <Input type='text' name='Parentesco' id='parentesco' onChange={handleParentesco}/>
            <Input type='radio' name='Responsavel' id='responsavel' onChange={handleResponsavel}/>
            <Input type='date' name='Data nascimento' id='dataNascimento' onChange={handleDataNascimento}/>
            <Input type='text' name='NIS' id='nis' onChange={handleNIS}/>
            <Input type='date' name='Data inicio' id='dataInicio' onChange={handleDataInicio}/>
            <Input type='date' name='Data fim' id='dataFim' onChange={handleDataFim}/>
            <Input type='number' name='N° Filhos maior' id='nFilhosMaior' onChange={handleNFilhosMaior}/>
            <Input type='number' name='N° Filhos menor' id='nFilhosMenor' onChange={handleNFilhosMenor}/>
            <Input type='radio' name='Idoso' id='idoso' onChange={handleIdoso}/>
            <Input type='radio' name='BPC' id='bpc' onChange={handleBPC}/>
            <Input type='text' name='Telefone' id='telefone' onChange={handleTelefone}/>
            <Input type='text' name='Rua' id='rua' onChange={handleNomeRua}/>
            <Input type='text' name='Bairro' id='bairro' onChange={handleNomeBairro}/>
            <Input type='number' name='N° Casa' id='ncasa' onChange={handleNCasa}/>
            <Input type='text' name='Complemento' id='complemento' onChange={handleComplemento}/>
            <Input type='radio' name='Residencia' id='residencia' onChange={handleResidencia}/>
            <Input type='radio' name='Area de risco' id='areaRisco' onChange={handleAreaRisco}/>

            {
              loading ?
              <button disabled className={style.button__login} onClick={handleCadFamilia}>
                carregando...
              </button>
              :
              <button className={style.button__login} onClick={handleCadFamilia}>
                Cadastrar
              </button>
            }

            {
              msgSucces && <p style={{color: 'darkgreen', padding: '.5rem'}}>*{msgSucces}*</p>
            }

            {
              error && <p style={{color: 'red', padding: '.5rem'}}>*{error}*</p>
            }
          </form>
        )
      }
    </>
  )
}

export default Form