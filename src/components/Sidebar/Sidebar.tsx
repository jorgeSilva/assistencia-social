import React, { useContext } from 'react'
import style from './Sidebar.module.css'
import { useProviderSidebar } from '../../context/sidebarContext';
import IconPaineldeControle from '../../assets/calendario.svg'
import IconPaineldeControleBlack from '../../assets/calendarioBlack.svg'
import IconMenuHamburger from '../../assets/icons8-hamburger-menu.svg'
import IconClose from '../../assets/x-circle-fill.svg'
import IconSearch from '../../assets/search.svg'
import IconFamilia from '../../assets/cadastroFamilia.svg'
import IconFamiliaBlack from '../../assets/cadastroFamiliaBlack.svg'
import IconCad from '../../assets/cadastroEquipe.svg'
import IconCadBlack from '../../assets/cadastroEquipeBlack.svg'
import IconExit from '../../assets/exit.svg'
import IconListaExcluidos from '../../assets/listaExcluido.svg'
import IconListaExcluidosBlack from '../../assets/listaExcluidoBlack.svg'
import Input from '../Search/Input';
import UseFetch from '../../service/useFetch';

type IContent = {
  patamar: string | null;
  exit: any
}

type IFamilias = [{
  _id: string,
  nome: string,
  cpf: string,
  parentesco: string,
  responsavel: boolean,
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
    patamar: string;
    senha: string;
    _id: string;
  },
}]

const Sidebar = ({patamar, exit}: IContent) => {  
  const token = localStorage.getItem('token') 
  const tokenValid = token ? token : 'nao'
  const {handleClick, id, setFamilia} = useProviderSidebar()
  const [buttonToggle, setButtonToggle] = React.useState(false)
  const [buttonID, setButtonID] = React.useState<string | null>(null)
  const [buttonBoolean, setButtonBoolean] = React.useState<boolean | null>(null)
  const [buttonOptions, setButtonOptions] = React.useState<string | null>(null)
  const [valueSearch, setValueSearch] = React.useState<string | number | null>(null)

  const {data, loading, error} = UseFetch<IFamilias>(`https://backendassistenciasocial-production.up.railway.app/familia/show`, {
    headers:{
      'Authorization': `Bearer ${JSON.parse(tokenValid)}`
    }
  })

  function formatarDataBrasileira(dataString: string): string {
    const data = new Date(dataString);
    const dia = String(data.getUTCDate()).padStart(2, '0');
    const mes = String(data.getUTCMonth() + 1).padStart(2, '0'); // O mês é baseado em zero
    const ano = data.getUTCFullYear();
  
    return `${dia}/${mes}/${ano}`;
  }

  const FamiliaFilter = React.useMemo(() => {
    const lowerCase = typeof valueSearch === 'string' ? valueSearch.toLocaleLowerCase(): valueSearch

    if(typeof lowerCase === 'string' && data && buttonID === 'nome'){
      return data?.filter((item) => item.nome.toLocaleLowerCase().includes(lowerCase))
    }
    
    else if(typeof lowerCase === 'string' && data && buttonID === 'cpf'){
      return data?.filter((item) => String(item.cpf).toLocaleLowerCase().includes(lowerCase))
    }
    
    else if(typeof lowerCase === 'string' && data && buttonID === 'parentesco'){
      return data?.filter((item) => String(item.parentesco).toLocaleLowerCase().includes(lowerCase))
    }
    
    else if(data && buttonID === 'responsavel' && buttonBoolean === false ){
      return data?.filter((item) => item.responsavel === false)
    }
    
    else if(data && buttonID === 'responsavel' && buttonBoolean === true){
      return data?.filter((item) => item.responsavel === true )
    }
    
    else if(typeof lowerCase === 'string' && data && buttonID === 'dataNascimento'){
      return data?.filter((item) => formatarDataBrasileira(item.dataNasc).toLocaleLowerCase().includes(lowerCase))
    }
    
    else if(typeof lowerCase === 'string' && data && buttonID === 'nis'){
      return data?.filter((item) => String(item.nis).toLocaleLowerCase().includes(lowerCase))
    }

    else if(typeof lowerCase === 'string' && data && buttonID === 'dataInicio'){
      return data?.filter((item) => formatarDataBrasileira(item.inicio).toLocaleLowerCase().includes(lowerCase))
    }

    else if(typeof lowerCase === 'string' && data && buttonID === 'dataFim'){
      return data?.filter((item) => formatarDataBrasileira(item.fim).toLocaleLowerCase().includes(lowerCase))
    }

    else if(typeof lowerCase === 'string' && data && buttonID === 'nFilhosMaior'){
      return data?.filter((item) => String(item.nFilhosMaior).toLocaleLowerCase().includes(lowerCase))
    }

    else if(typeof lowerCase === 'string' && data && buttonID === 'nFilhosMenor'){
      return data?.filter((item) => String(item.nFilhosMenor).toLocaleLowerCase().includes(lowerCase))
    }

    else if(data && buttonID === 'idoso' && buttonBoolean === false ){
      return data?.filter((item) => item.idoso === false)
    }
    
    else if(data && buttonID === 'idoso' && buttonBoolean === true){
      return data?.filter((item) => item.idoso === true)
    }

    else if(data && buttonID === 'bpc' && buttonBoolean === false ){
      return data?.filter((item) => item.bpc === false)
    }
    
    else if(data && buttonID === 'bpc' && buttonBoolean === true){
      return data?.filter((item) => item.bpc === true)
    }

    else if(typeof lowerCase === 'string' && data && buttonID === 'telefone'){
      return data?.filter((item) => String(item.contato).toLocaleLowerCase().includes(lowerCase))
    }

    else if(typeof lowerCase === 'string' && data && buttonID === 'rua'){
      return data?.filter((item) => String(item.rua).toLocaleLowerCase().includes(lowerCase))
    }

    else if(typeof lowerCase === 'string' && data && buttonID === 'bairro'){
      return data?.filter((item) => String(item.bairro).toLocaleLowerCase().includes(lowerCase))
    }

    else if(typeof lowerCase === 'string' && data && buttonID === 'nCasa'){
      return data?.filter((item) => String(item.nCasa).toLocaleLowerCase().includes(lowerCase))
    }

    else if(typeof lowerCase === 'string' && data && buttonID === 'complemento'){
      return data?.filter((item) => String(item.complemento).toLocaleLowerCase().includes(lowerCase))
    }

    else if(typeof lowerCase === 'string' && data && buttonID === 'residencia'){
      return data?.filter((item) => String(item.residencia).toLocaleLowerCase().includes(lowerCase))
    }

    else if(typeof lowerCase === 'string' && data && buttonID === 'areaRisco'){
      return data?.filter((item) => String(item.areaDeRisco).toLocaleLowerCase().includes(lowerCase))
    }

  }, [valueSearch, buttonBoolean])

  setFamilia(FamiliaFilter)
  
  const handleValueSelect = (e: any) => {
    setButtonID(e.target.value)
  }

  return (
    <div className={style.sidebar__container}>
      <p className={style.sidebar__text__apresentation}>Systech - Assistencia Social</p>

      { 
        (
          patamar === 'master' 
          &&
          <>
            <div className={style.sidebar__content__patamar}>
              <div className={style.sidebar__content__patamar__search}>
                {
                  id === 'controle' ?
                  <button id='controle' className={style.sidebar__painel__controle__button__active} onClick={handleClick}>
                    <span id='controle' className={style.sidebar__painel__controle__active}>
                      <img id='controle' src={IconPaineldeControleBlack} className={style.sidebar__painel__controle__svg__active} alt='Icone Painel de Controle'/>
                    </span>
                    <p id='controle'>Painel de controle</p>
                  </button>
                  :
                  <button id='controle' className={style.sidebar__painel__controle__button} onClick={handleClick}>
                    <span id='controle' className={style.sidebar__painel__controle}>
                      <img id='controle' src={IconPaineldeControle} className={style.sidebar__painel__controle__svg} alt='Icone Painel de Controle'/>
                    </span>
                  </button>
                }

                {
                  id === 'pesquisar' ?
                  <>
                    <div className={style.buttons__options__container}>
                      <Input idButton={buttonID} onChange={({target}) => setValueSearch(target.value)} id='pesquisar' type='text' name='Pesquisar'/>
                    </div>

                    <div className={style.buttons__options}>

                      <select name="options" id="options" onChange={handleValueSelect}>
                        <option value={''}> </option>
                        <option value={'nome'}>Nome</option>
                        <option value={'cpf'}>CPF</option>
                        <option value={'parentesco'}>Parentesco</option>
                        <option value={'responsavel'}>Responsavel</option>
                        <option value={'dataNascimento'}>Data nascimento</option>
                        <option value={'nis'}>NIS</option>
                        <option value={'dataInicio'}>Data inicio</option>
                        <option value={'dataFim'}>Data fim</option>
                        <option value={'nFilhosMaior'}>N° filhos de maior</option>
                        <option value={'nFilhosMenor'}>N° filhos de menor</option>
                        <option value={'idoso'}>Idoso</option>
                        <option value={'bpc'}>BPC</option>
                        <option value={'telefone'}>Telefone</option>
                        <option value={'rua'}>Rua</option>
                        <option value={'bairro'}>Bairro</option>
                        <option value={'nCasa'}>N° Casa</option>
                        <option value={'complemento'}>Complemento</option>
                        <option value={'residencia'}>Residencia</option>
                        <option value={'areaRisco'}>Area de risco</option>
                      </select>

                      {
                        buttonID === 'responsavel' &&
                        <div>
                          <div>
                            <input type='radio' id='sim' name="drone" onChange={() => setButtonBoolean(true) } value='sim'/>
                            <label htmlFor='sim'>Sim</label>
                          </div>

                          <div>
                            <input type='radio' id='nao' name="drone" onChange={() => setButtonBoolean(false)} value='nao'/>
                            <label htmlFor='nao'>Não</label>
                          </div>
                        </div>
                      }

                      {
                        buttonID === 'idoso' &&
                        <div>
                          <div>
                            <input type='radio' id='sim' name="drone" onChange={() => setButtonBoolean(true) } value='sim'/>
                            <label htmlFor='sim'>Sim</label>
                          </div>

                          <div>
                            <input type='radio' id='nao' name="drone" onChange={() => setButtonBoolean(false)} value='nao'/>
                            <label htmlFor='nao'>Não</label>
                          </div>
                        </div>
                      }

                      {
                        buttonID === 'bpc' &&
                        <div>
                          <div>
                            <input type='radio' id='sim' name="drone" onChange={() => setButtonBoolean(true) } value='sim'/>
                            <label htmlFor='sim'>Sim</label>
                          </div>

                          <div>
                            <input type='radio' id='nao' name="drone" onChange={() => setButtonBoolean(false)} value='nao'/>
                            <label htmlFor='nao'>Não</label>
                          </div>
                        </div>
                      }
                    </div>
                  </>
                  :
                  <button id='pesquisar' className={style.sidebar__painel__controle__button} onClick={handleClick}>
                    <span id='pesquisar' className={style.sidebar__painel__controle}>
                      <img id='pesquisar' src={IconSearch} className={style.sidebar__painel__controle__svg} />
                    </span>
                  </button>
                }
              </div>
              
              {
                id === 'excluidos'?
                <button id='excluidos' onClick={handleClick}  className={style.sidebar__painel__controle__button__active}>
                  <span id='excluidos' className={style.sidebar__painel__controle__active}>
                    <img id='excluidos' src={IconListaExcluidosBlack} className={style.sidebar__painel__controle__svg__active} alt='Icone Painel de Controle'/>
                  </span>
                  <p id='excluidos'>Lista de excluidos</p> 
                </button>
                :
                <button id='excluidos' onClick={handleClick} className={style.sidebar__painel__controle__button} >
                   <span id='excluidos' className={style.sidebar__painel__controle}>
                    <img id='excluidos' src={IconListaExcluidos} className={style.sidebar__painel__controle__svg} alt='Icone Painel de Controle'/>
                  </span>
                  <p id='excluidos' style={{paddingRight:"1rem"}}>Lista de excluidos</p> 
                </button>  
              }

              {
                 id === 'familias'?
                 <button id='familias' onClick={handleClick}  className={style.sidebar__painel__controle__button__active}>
                   <span id='familias' className={style.sidebar__painel__controle__active}>
                      <img id='familias' src={IconFamiliaBlack} className={style.sidebar__painel__controle__svg__active} alt='Icone Painel de Controle'/>
                    </span>
                   <p id='familias'>Cadastro de familias</p> 
                 </button>
                 :
                 <button id='familias' onClick={handleClick} className={style.sidebar__painel__controle__button} >
                    <span id='familias' className={style.sidebar__painel__controle}>
                      <img id='familias' src={IconFamilia} className={style.sidebar__painel__controle__svg} alt='Icone Painel de Controle'/>
                    </span>
                   <p id='familias' style={{paddingRight:"1rem"}}>Cadastro de familias</p> 
                 </button>  
              }

              {
                 id === 'equipe'?
                 <button id='equipe' onClick={handleClick}  className={style.sidebar__painel__controle__button__active}>
                   <span id='equipe' className={style.sidebar__painel__controle__active}>
                      <img id='equipe' src={IconCadBlack} className={style.sidebar__painel__controle__svg__active} alt='Icone Painel de Controle'/>
                    </span>
                   <p id='equipe'>Cadastro de equipe</p> 
                 </button>
                 :
                 <button id='equipe' onClick={handleClick} className={style.sidebar__painel__controle__button} >
                    <span id='equipe' className={style.sidebar__painel__controle}>
                      <img id='equipe' src={IconCad} className={style.sidebar__painel__controle__svg} alt='Icone Painel de Controle'/>
                    </span>
                   <p id='equipe' style={{paddingRight:"1rem"}}>Cadastro de equipe</p> 
                 </button>  
              }

              {
                id === 'saude'?
                <button id='saude' onClick={handleClick}  className={style.sidebar__painel__controle__button__active}>
                  <span id='saude' className={style.sidebar__painel__controle__active}>
                    <img id='saude' src={IconCadBlack} className={style.sidebar__painel__controle__svg__active} alt='Icone Painel de Controle'/>
                  </span>
                  <p id='saude'>Cadastro de saude</p> 
                </button>
                :
                <button id='saude' onClick={handleClick} className={style.sidebar__painel__controle__button} >
                  <span id='saude' className={style.sidebar__painel__controle}>
                    <img id='saude' src={IconCad} className={style.sidebar__painel__controle__svg} alt='Icone Painel de Controle'/>
                  </span>
                  <p id='saude' style={{paddingRight:"1rem"}}>Cadastro de saude</p> 
                </button>  
              }

              <button className='sidebar__button__exit' id='sair' onClick={exit}>
                <span id='sair' className='sidebar__painel__controle'>
                  <img id='sair' src={IconExit} className='sidebar__painel__controle__svg'/>
                </span>
                <p id='sair'>Sair da conta</p>
              </button>
            </div>

            <div className={style.sidebar_toggle__content}>
              {
                !buttonToggle &&
                <button onClick={() => setButtonToggle(!buttonToggle)} className={style.sidebar__button__menu__open}>
                {
                  buttonToggle ?
                  <span className={style.sidebar__button__menu__svg}>
                    <img src={IconClose} alt="" />
                  </span>
                  :
                  <span className={style.sidebar__button__menu__svg}>
                    <img src={IconMenuHamburger} alt="" />
                  </span>
                }
              </button>
              }

              {
                buttonToggle && 
                <div className={style.modal__container}>
                  <div className={style.modal__content}>
                    {
                      buttonToggle ?
                      <button onClick={() => setButtonToggle(!buttonToggle)} className={style.sidebar__button__menu__open__active}>

                        <span className={style.sidebar__button__menu__svg}>
                          <img src={IconClose} alt="" />
                        </span>
                      </button>
                      :
                      <button onClick={() => setButtonToggle(!buttonToggle)} className={style.sidebar__button__menu__open}>
                        <span className={style.sidebar__button__menu__svg}>
                          <img src={IconMenuHamburger} alt="" />
                        </span>
                      </button> 
                    }

                    <div className={style.modal__content__patamar}>
                      <div>
                        {
                          id === 'controle' ?
                          <button id='controle' className={style.sidebar__painel__controle__button__active} onClick={handleClick}>
                            <span id='controle' className={style.sidebar__painel__controle__active}>
                              <img id='controle' src={IconPaineldeControleBlack} className={style.sidebar__painel__controle__svg__active} />
                            </span>
                            <p id='controle' style={{paddingRight:"1rem"}}>Painel de controle</p>
                          </button>
                          :
                          <button id='controle' className={style.sidebar__painel__controle__button} onClick={handleClick}>
                            <span id='controle' className={style.sidebar__painel__controle}>
                              <img id='controle' src={IconPaineldeControle} className={style.sidebar__painel__controle__svg} />
                            </span>
                            <p id='controle' style={{paddingRight:"1rem"}}>Painel de controle</p>
                          </button>
                        }

                        {
                          id === 'pesquisar' ?
                          <>
                            <Input idButton={buttonID} id='pesquisar' type='text' name='Pesquisar'/>
                            <div className={style.buttons__options}>
                              <select name="options" id="options" onChange={handleValueSelect}>
                                <option value={''}> </option>
                                <option value={'nome'}>Nome</option>
                                <option value={'cpf'}>CPF</option>
                                <option value={'parentesco'}>Parentesco</option>
                                <option value={'responsavel'}>Responsavel</option>
                                <option value={'dataNascimento'}>Data nascimento</option>
                                <option value={'nis'}>NIS</option>
                                <option value={'dataInicio'}>Data inicio</option>
                                <option value={'dataFim'}>Data fim</option>
                                <option value={'nFilhosMaior'}>N° filhos de maior</option>
                                <option value={'nFilhosMenor'}>N° filhos de menor</option>
                                <option value={'idoso'}>Idoso</option>
                                <option value={'bpc'}>BPC</option>
                                <option value={'telefone'}>Telefone</option>
                                <option value={'rua'}>Rua</option>
                                <option value={'bairro'}>Bairro</option>
                                <option value={'nCasa'}>N° Casa</option>
                                <option value={'complemento'}>Complemento</option>
                                <option value={'residencia'}>Residencia</option>
                                <option value={'areaRisco'}>Area de risco</option>
                              </select>

                              {
                                buttonID === 'responsavel' &&
                                <div>
                                  <div>
                                    <input type='radio' id='sim' name="drone" onChange={() => setButtonBoolean(true) } value='sim'/>
                                    <label htmlFor='sim'>Sim</label>
                                  </div>

                                  <div>
                                    <input type='radio' id='nao' name="drone" onChange={() => setButtonBoolean(false)} value='nao'/>
                                    <label htmlFor='nao'>Não</label>
                                  </div>
                                </div>
                              }

                              {
                                buttonID === 'idoso' &&
                                <div>
                                  <div>
                                    <input type='radio' id='sim' name="drone" onChange={() => setButtonBoolean(true) } value='sim'/>
                                    <label htmlFor='sim'>Sim</label>
                                  </div>

                                  <div>
                                    <input type='radio' id='nao' name="drone" onChange={() => setButtonBoolean(false)} value='nao'/>
                                    <label htmlFor='nao'>Não</label>
                                  </div>
                                </div>
                              }

                              {
                                buttonID === 'bpc' &&
                                <div>
                                  <div>
                                    <input type='radio' id='sim' name="drone" onChange={() => setButtonBoolean(true) } value='sim'/>
                                    <label htmlFor='sim'>Sim</label>
                                  </div>

                                  <div>
                                    <input type='radio' id='nao' name="drone" onChange={() => setButtonBoolean(false)} value='nao'/>
                                    <label htmlFor='nao'>Não</label>
                                  </div>
                                </div>
                              }
                            </div>
                          </>
                          :
                          <button id='pesquisar' style={{marginTop: "1rem"}} className={style.sidebar__painel__controle__button} onClick={handleClick}>
                            <span id='pesquisar' className={style.sidebar__painel__controle}>
                              <img id='pesquisar' src={IconSearch} className={style.sidebar__painel__controle__svg} />
                            </span>
                            <p id='pesquisar' style={{paddingRight:"1rem"}}>Pesquisar</p>
                          </button>
                        }
                      </div>

                      {
                        id === 'excluidos'?
                        <button id='excluidos' onClick={handleClick}  className={style.sidebar__painel__controle__button__active}>
                          <span id='excluidos' className={style.sidebar__painel__controle__active}>
                            <img id='excluidos' src={IconListaExcluidosBlack} className={style.sidebar__painel__controle__svg__active} alt='Icone Painel de Controle'/>
                          </span>
                          <p id='excluidos'>Lista de excluidos</p> 
                        </button>
                        :
                        <button id='excluidos' onClick={handleClick} className={style.sidebar__painel__controle__button} >
                          <span id='excluidos' className={style.sidebar__painel__controle}>
                            <img id='excluidos' src={IconListaExcluidos} className={style.sidebar__painel__controle__svg} alt='Icone Painel de Controle'/>
                          </span>
                          <p id='excluidos' style={{paddingRight:"1rem"}}>Lista de excluidos</p> 
                        </button>  
                      }

                      {
                        id === 'familias'?
                        <button id='familias' onClick={handleClick}  className={style.sidebar__painel__controle__button__active}>
                          <span id='familias' className={style.sidebar__painel__controle__active}>
                              <img id='familias' src={IconFamiliaBlack} className={style.sidebar__painel__controle__svg__active} alt='Icone Painel de Controle'/>
                            </span>
                          <p id='familias'>Cadastro de familias</p> 
                        </button>
                        :
                        <button id='familias' onClick={handleClick} className={style.sidebar__painel__controle__button} >
                            <span id='familias' className={style.sidebar__painel__controle}>
                              <img id='familias' src={IconFamilia} className={style.sidebar__painel__controle__svg} alt='Icone Painel de Controle'/>
                            </span>
                          <p id='familias' style={{paddingRight:"1rem"}}>Cadastro de familias</p> 
                        </button>  
                      }

                      {
                        id === 'equipe'?
                        <button id='equipe' onClick={handleClick}  className={style.sidebar__painel__controle__button__active}>
                          <span id='equipe' className={style.sidebar__painel__controle__active}>
                              <img id='equipe' src={IconCadBlack} className={style.sidebar__painel__controle__svg__active} alt='Icone Painel de Controle'/>
                            </span>
                          <p id='equipe'>Cadastro de equipe</p> 
                        </button>
                        :
                        <button id='equipe' onClick={handleClick} className={style.sidebar__painel__controle__button} >
                            <span id='equipe' className={style.sidebar__painel__controle}>
                              <img id='equipe' src={IconCad} className={style.sidebar__painel__controle__svg} alt='Icone Painel de Controle'/>
                            </span>
                          <p id='equipe' style={{paddingRight:"1rem"}}>Cadastro de equipe</p> 
                        </button>  
                      }

                      {
                        id === 'saude'?
                        <button id='saude' onClick={handleClick}  className={style.sidebar__painel__controle__button__active}>
                          <span id='saude' className={style.sidebar__painel__controle__active}>
                            <img id='saude' src={IconCadBlack} className={style.sidebar__painel__controle__svg__active} alt='Icone Painel de Controle'/>
                          </span>
                          <p id='saude'>Cadastro de saude</p> 
                        </button>
                        :
                        <button id='saude' onClick={handleClick} className={style.sidebar__painel__controle__button} >
                          <span id='saude' className={style.sidebar__painel__controle}>
                            <img id='saude' src={IconCad} className={style.sidebar__painel__controle__svg} alt='Icone Painel de Controle'/>
                          </span>
                          <p id='saude' style={{paddingRight:"1rem"}}>Cadastro de saude</p> 
                        </button>  
                      }

                      <button className='sidebar__button__exit' id='sair' onClick={exit}>
                        <span id='sair' className='sidebar__painel__controle'>
                          <img id='sair' src={IconExit} className='sidebar__painel__controle__svg'/>
                        </span>
                        <p id='sair'>Sair da conta</p>
                      </button>
                    </div>
                  </div>
                </div>
              }
            </div>
          </>
        )

        ||

        (
          patamar === 'equipe' 
          &&
          <>
            <div className={style.sidebar__content__patamar}>
            <div className={style.sidebar__content__patamar__search}>
                {
                  id === 'controle' ?
                  <button id='controle' className={style.sidebar__painel__controle__button__active} onClick={handleClick}>
                    <span id='controle' className={style.sidebar__painel__controle__active}>
                      <img id='controle' src={IconPaineldeControleBlack} className={style.sidebar__painel__controle__svg__active} alt='Icone Painel de Controle'/>
                    </span>
                    <p id='controle'>Painel de controle</p>
                  </button>
                  :
                  <button id='controle' className={style.sidebar__painel__controle__button} onClick={handleClick}>
                    <span id='controle' className={style.sidebar__painel__controle}>
                      <img id='controle' src={IconPaineldeControle} className={style.sidebar__painel__controle__svg} alt='Icone Painel de Controle'/>
                    </span>
                  </button>
                }

                {
                  id === 'pesquisar' ?
                  <>
                    <div className={style.buttons__options__container}>
                      <Input idButton={buttonID} onChange={({target}) => setValueSearch(target.value)} id='pesquisar' type='text' name='Pesquisar'/>
                    </div>

                    <div className={style.buttons__options}>

                      <select name="options" id="options" onChange={handleValueSelect}>
                        <option value={''}> </option>
                        <option value={'nome'}>Nome</option>
                        <option value={'cpf'}>CPF</option>
                        <option value={'parentesco'}>Parentesco</option>
                        <option value={'responsavel'}>Responsavel</option>
                        <option value={'dataNascimento'}>Data nascimento</option>
                        <option value={'nis'}>NIS</option>
                        <option value={'dataInicio'}>Data inicio</option>
                        <option value={'dataFim'}>Data fim</option>
                        <option value={'nFilhosMaior'}>N° filhos de maior</option>
                        <option value={'nFilhosMenor'}>N° filhos de menor</option>
                        <option value={'idoso'}>Idoso</option>
                        <option value={'bpc'}>BPC</option>
                        <option value={'telefone'}>Telefone</option>
                        <option value={'rua'}>Rua</option>
                        <option value={'bairro'}>Bairro</option>
                        <option value={'nCasa'}>N° Casa</option>
                        <option value={'complemento'}>Complemento</option>
                        <option value={'residencia'}>Residencia</option>
                        <option value={'areaRisco'}>Area de risco</option>
                      </select>

                      {
                        buttonID === 'responsavel' &&
                        <div>
                          <div>
                            <input type='radio' id='sim' name="drone" onChange={() => setButtonBoolean(true) } value='sim'/>
                            <label htmlFor='sim'>Sim</label>
                          </div>

                          <div>
                            <input type='radio' id='nao' name="drone" onChange={() => setButtonBoolean(false)} value='nao'/>
                            <label htmlFor='nao'>Não</label>
                          </div>
                        </div>
                      }

                      {
                        buttonID === 'idoso' &&
                        <div>
                          <div>
                            <input type='radio' id='sim' name="drone" onChange={() => setButtonBoolean(true) } value='sim'/>
                            <label htmlFor='sim'>Sim</label>
                          </div>

                          <div>
                            <input type='radio' id='nao' name="drone" onChange={() => setButtonBoolean(false)} value='nao'/>
                            <label htmlFor='nao'>Não</label>
                          </div>
                        </div>
                      }

                      {
                        buttonID === 'bpc' &&
                        <div>
                          <div>
                            <input type='radio' id='sim' name="drone" onChange={() => setButtonBoolean(true) } value='sim'/>
                            <label htmlFor='sim'>Sim</label>
                          </div>

                          <div>
                            <input type='radio' id='nao' name="drone" onChange={() => setButtonBoolean(false)} value='nao'/>
                            <label htmlFor='nao'>Não</label>
                          </div>
                        </div>
                      }
                    </div>
                  </>
                  :
                  <button id='pesquisar' className={style.sidebar__painel__controle__button} onClick={handleClick}>
                    <span id='pesquisar' className={style.sidebar__painel__controle}>
                      <img id='pesquisar' src={IconSearch} className={style.sidebar__painel__controle__svg} />
                    </span>
                  </button>
                }
              </div>
              
              {
                id === 'excluidos'?
                <button id='excluidos' onClick={handleClick}  className={style.sidebar__painel__controle__button__active}>
                  <span id='excluidos' className={style.sidebar__painel__controle__active}>
                    <img id='excluidos' src={IconListaExcluidosBlack} className={style.sidebar__painel__controle__svg__active} alt='Icone Painel de Controle'/>
                  </span>
                  <p id='excluidos'>Lista de excluidos</p> 
                </button>
                :
                <button id='excluidos' onClick={handleClick} className={style.sidebar__painel__controle__button} >
                   <span id='excluidos' className={style.sidebar__painel__controle}>
                    <img id='excluidos' src={IconListaExcluidos} className={style.sidebar__painel__controle__svg} alt='Icone Painel de Controle'/>
                  </span>
                  <p id='excluidos' style={{paddingRight:"1rem"}}>Lista de excluidos</p> 
                </button>  
              }

              {
                 id === 'familias'?
                 <button id='familias' onClick={handleClick}  className={style.sidebar__painel__controle__button__active}>
                   <span id='familias' className={style.sidebar__painel__controle__active}>
                      <img id='familias' src={IconFamiliaBlack} className={style.sidebar__painel__controle__svg__active} alt='Icone Painel de Controle'/>
                    </span>
                   <p id='familias'>Cadastro de familias</p> 
                 </button>
                 :
                 <button id='familias' onClick={handleClick} className={style.sidebar__painel__controle__button} >
                    <span id='familias' className={style.sidebar__painel__controle}>
                      <img id='familias' src={IconFamilia} className={style.sidebar__painel__controle__svg} alt='Icone Painel de Controle'/>
                    </span>
                   <p id='familias' style={{paddingRight:"1rem"}}>Cadastro de familias</p> 
                 </button>  
              }

              <button className='sidebar__button__exit' id='sair' onClick={exit}>
                <span id='sair' className='sidebar__painel__controle'>
                  <img id='sair' src={IconExit} className='sidebar__painel__controle__svg'/>
                </span>
                <p id='sair'>Sair da conta</p>
              </button>
            </div>

            <div className={style.sidebar_toggle__content}>
              {
                !buttonToggle &&
                <button onClick={() => setButtonToggle(!buttonToggle)} className={style.sidebar__button__menu__open}>
                {
                  buttonToggle ?
                  <span className={style.sidebar__button__menu__svg}>
                    <img src={IconClose} alt="" />
                  </span>
                  :
                  <span className={style.sidebar__button__menu__svg}>
                    <img src={IconMenuHamburger} alt="" />
                  </span>
                }
              </button>
              }

              {
                buttonToggle && 
                <div className={style.modal__container}>
                  <div className={style.modal__content}>
                    {
                      buttonToggle ?
                      <button onClick={() => setButtonToggle(!buttonToggle)} className={style.sidebar__button__menu__open__active}>

                        <span className={style.sidebar__button__menu__svg}>
                          <img src={IconClose} alt="" />
                        </span>
                      </button>
                      :
                      <button onClick={() => setButtonToggle(!buttonToggle)} className={style.sidebar__button__menu__open}>
                        <span className={style.sidebar__button__menu__svg}>
                          <img src={IconMenuHamburger} alt="" />
                        </span>
                      </button> 
                    }

                    <div className={style.modal__content__patamar}>
                      <div>
                        {
                          id === 'controle' ?
                          <button id='controle' className={style.sidebar__painel__controle__button__active} onClick={handleClick}>
                            <span id='controle' className={style.sidebar__painel__controle__active}>
                              <img id='controle' src={IconPaineldeControleBlack} className={style.sidebar__painel__controle__svg__active} />
                            </span>
                            <p id='controle' style={{paddingRight:"1rem"}}>Painel de controle</p>
                          </button>
                          :
                          <button id='controle' className={style.sidebar__painel__controle__button} onClick={handleClick}>
                            <span id='controle' className={style.sidebar__painel__controle}>
                              <img id='controle' src={IconPaineldeControle} className={style.sidebar__painel__controle__svg} />
                            </span>
                            <p id='controle' style={{paddingRight:"1rem"}}>Painel de controle</p>
                          </button>
                        }

                        {
                          id === 'pesquisar' ?
                          <>
                            <Input idButton={buttonID} id='pesquisar' type='text' name='Pesquisar'/>
                            <div className={style.buttons__options}>
                              <select name="options" id="options" onChange={handleValueSelect}>
                                <option value={''}> </option>
                                <option value={'nome'}>Nome</option>
                                <option value={'cpf'}>CPF</option>
                                <option value={'parentesco'}>Parentesco</option>
                                <option value={'responsavel'}>Responsavel</option>
                                <option value={'dataNascimento'}>Data nascimento</option>
                                <option value={'nis'}>NIS</option>
                                <option value={'dataInicio'}>Data inicio</option>
                                <option value={'dataFim'}>Data fim</option>
                                <option value={'nFilhosMaior'}>N° filhos de maior</option>
                                <option value={'nFilhosMenor'}>N° filhos de menor</option>
                                <option value={'idoso'}>Idoso</option>
                                <option value={'bpc'}>BPC</option>
                                <option value={'telefone'}>Telefone</option>
                                <option value={'rua'}>Rua</option>
                                <option value={'bairro'}>Bairro</option>
                                <option value={'nCasa'}>N° Casa</option>
                                <option value={'complemento'}>Complemento</option>
                                <option value={'residencia'}>Residencia</option>
                                <option value={'areaRisco'}>Area de risco</option>
                              </select>

                              {
                                buttonID === 'responsavel' &&
                                <div>
                                  <div>
                                    <input type='radio' id='sim' name="drone" onChange={() => setButtonBoolean(true) } value='sim'/>
                                    <label htmlFor='sim'>Sim</label>
                                  </div>

                                  <div>
                                    <input type='radio' id='nao' name="drone" onChange={() => setButtonBoolean(false)} value='nao'/>
                                    <label htmlFor='nao'>Não</label>
                                  </div>
                                </div>
                              }

                              {
                                buttonID === 'idoso' &&
                                <div>
                                  <div>
                                    <input type='radio' id='sim' name="drone" onChange={() => setButtonBoolean(true) } value='sim'/>
                                    <label htmlFor='sim'>Sim</label>
                                  </div>

                                  <div>
                                    <input type='radio' id='nao' name="drone" onChange={() => setButtonBoolean(false)} value='nao'/>
                                    <label htmlFor='nao'>Não</label>
                                  </div>
                                </div>
                              }

                              {
                                buttonID === 'bpc' &&
                                <div>
                                  <div>
                                    <input type='radio' id='sim' name="drone" onChange={() => setButtonBoolean(true) } value='sim'/>
                                    <label htmlFor='sim'>Sim</label>
                                  </div>

                                  <div>
                                    <input type='radio' id='nao' name="drone" onChange={() => setButtonBoolean(false)} value='nao'/>
                                    <label htmlFor='nao'>Não</label>
                                  </div>
                                </div>
                              }
                            </div>
                          </>
                          :
                          <button id='pesquisar' style={{marginTop: "1rem"}} className={style.sidebar__painel__controle__button} onClick={handleClick}>
                            <span id='pesquisar' className={style.sidebar__painel__controle}>
                              <img id='pesquisar' src={IconSearch} className={style.sidebar__painel__controle__svg} />
                            </span>
                            <p id='pesquisar' style={{paddingRight:"1rem"}}>Painel de controle</p>
                          </button>
                        }
                      </div>

                      {
                        id === 'excluidos'?
                        <button id='excluidos' onClick={handleClick}  className={style.sidebar__painel__controle__button__active}>
                          <span id='excluidos' className={style.sidebar__painel__controle__active}>
                            <img id='excluidos' src={IconListaExcluidosBlack} className={style.sidebar__painel__controle__svg__active} alt='Icone Painel de Controle'/>
                          </span>
                          <p id='excluidos'>Lista de excluidos</p> 
                        </button>
                        :
                        <button id='excluidos' onClick={handleClick} className={style.sidebar__painel__controle__button} >
                          <span id='excluidos' className={style.sidebar__painel__controle}>
                            <img id='excluidos' src={IconListaExcluidos} className={style.sidebar__painel__controle__svg} alt='Icone Painel de Controle'/>
                          </span>
                          <p id='excluidos' style={{paddingRight:"1rem"}}>Lista de excluidos</p> 
                        </button>  
                      }

                      {
                        id === 'familias'?
                        <button id='familias' onClick={handleClick}  className={style.sidebar__painel__controle__button__active}>
                          <span id='familias' className={style.sidebar__painel__controle__active}>
                              <img id='familias' src={IconFamiliaBlack} className={style.sidebar__painel__controle__svg__active} alt='Icone Painel de Controle'/>
                            </span>
                          <p id='familias'>Cadastro de familias</p> 
                        </button>
                        :
                        <button id='familias' onClick={handleClick} className={style.sidebar__painel__controle__button} >
                            <span id='familias' className={style.sidebar__painel__controle}>
                              <img id='familias' src={IconFamilia} className={style.sidebar__painel__controle__svg} alt='Icone Painel de Controle'/>
                            </span>
                          <p id='familias' style={{paddingRight:"1rem"}}>Cadastro de familias</p> 
                        </button>  
                      }

                      <button className='sidebar__button__exit' id='sair' onClick={exit}>
                        <span id='sair' className='sidebar__painel__controle'>
                          <img id='sair' src={IconExit} className='sidebar__painel__controle__svg'/>
                        </span>
                        <p id='sair'>Sair da conta</p>
                      </button>
                    </div>
                  </div>
                </div>
              }
            </div>
          </>
        )

        ||
        (
          patamar === 'saude' 
          &&
          <>
            <div className={style.sidebar__content__patamar}>
              {
                id === 'familias'?
                <button id='familias' onClick={handleClick}  className={style.sidebar__painel__controle__button__active}>
                  <span id='familias' className={style.sidebar__painel__controle__active}>
                    <img id='familias' src={IconFamiliaBlack} className={style.sidebar__painel__controle__svg__active} alt='Icone Painel de Controle'/>
                  </span>
                  <p id='familias'>Cadastro de familias</p> 
                </button>
                :
                <button id='familias' onClick={handleClick} className={style.sidebar__painel__controle__button} >
                  <span id='familias' className={style.sidebar__painel__controle}>
                    <img id='familias' src={IconFamilia} className={style.sidebar__painel__controle__svg} alt='Icone Painel de Controle'/>
                  </span>
                  <p id='familias' style={{paddingRight:"1rem"}}>Cadastro de familias</p> 
                </button>  
              }

              <button className='sidebar__button__exit' id='sair' onClick={exit}>
                <span id='sair' className='sidebar__painel__controle'>
                  <img id='sair' src={IconExit} className='sidebar__painel__controle__svg'/>
                </span>
                <p id='sair'>Sair da conta</p>
              </button>
            </div>

            <div className={style.sidebar_toggle__content}>
              {
                !buttonToggle &&
                <button onClick={() => setButtonToggle(!buttonToggle)} className={style.sidebar__button__menu__open}>
                {
                  buttonToggle ?
                  <span className={style.sidebar__button__menu__svg}>
                    <img src={IconClose} alt="" />
                  </span>
                  :
                  <span className={style.sidebar__button__menu__svg}>
                    <img src={IconMenuHamburger} alt="" />
                  </span>
                }
              </button>
              }

              {
                buttonToggle && 
                <div className={style.modal__container}>
                  <div className={style.modal__content}>
                    {
                      buttonToggle ?
                      <button onClick={() => setButtonToggle(!buttonToggle)} className={style.sidebar__button__menu__open__active}>

                        <span className={style.sidebar__button__menu__svg}>
                          <img src={IconClose} alt="" />
                        </span>
                      </button>
                      :
                      <button onClick={() => setButtonToggle(!buttonToggle)} className={style.sidebar__button__menu__open}>
                        <span className={style.sidebar__button__menu__svg}>
                          <img src={IconMenuHamburger} alt="" />
                        </span>
                      </button> 
                    }

                    <div className={style.modal__content__patamar}>
                      <div>
                        {
                          id === 'controle' ?
                          <button id='controle' className={style.sidebar__painel__controle__button__active} onClick={handleClick}>
                            <span id='controle' className={style.sidebar__painel__controle__active}>
                              <img id='controle' src={IconPaineldeControleBlack} className={style.sidebar__painel__controle__svg__active} />
                            </span>
                            <p id='controle' style={{paddingRight:"1rem"}}>Painel de controle</p>
                          </button>
                          :
                          <button id='controle' className={style.sidebar__painel__controle__button} onClick={handleClick}>
                            <span id='controle' className={style.sidebar__painel__controle}>
                              <img id='controle' src={IconPaineldeControle} className={style.sidebar__painel__controle__svg} />
                            </span>
                            <p id='controle' style={{paddingRight:"1rem"}}>Painel de controle</p>
                          </button>
                        }

                        {
                          id === 'pesquisar' ?
                          <Input idButton={buttonID} id='pesquisar' type='text' name='Pesquisar'/>
                          :
                          <button id='pesquisar' style={{marginTop: "1rem"}} className={style.sidebar__painel__controle__button} onClick={handleClick}>
                            <span id='pesquisar' className={style.sidebar__painel__controle}>
                              <img id='pesquisar' src={IconSearch} className={style.sidebar__painel__controle__svg} />
                            </span>
                            <p id='pesquisar' style={{paddingRight:"1rem"}}>Painel de controle</p>
                          </button>
                        }
                      </div>

                      {
                        id === 'familias'?
                        <button id='familias' onClick={handleClick}  className={style.sidebar__painel__controle__button__active}>
                          <span id='familias' className={style.sidebar__painel__controle__active}>
                              <img id='familias' src={IconFamiliaBlack} className={style.sidebar__painel__controle__svg__active} alt='Icone Painel de Controle'/>
                            </span>
                          <p id='familias'>Cadastro de familias</p> 
                        </button>
                        :
                        <button id='familias' onClick={handleClick} className={style.sidebar__painel__controle__button} >
                            <span id='familias' className={style.sidebar__painel__controle}>
                              <img id='familias' src={IconFamilia} className={style.sidebar__painel__controle__svg} alt='Icone Painel de Controle'/>
                            </span>
                          <p id='familias' style={{paddingRight:"1rem"}}>Cadastro de familias</p> 
                        </button>  
                      }

                      <button className='sidebar__button__exit' id='sair' onClick={exit}>
                        <span id='sair' className='sidebar__painel__controle'>
                          <img id='sair' src={IconExit} className='sidebar__painel__controle__svg'/>
                        </span>
                        <p id='sair'>Sair da conta</p>
                      </button>
                    </div>
                  </div>
                </div>
              }
            </div>
          </>
        )
      }
    </div>
  )
}

export default Sidebar