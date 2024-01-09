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

type IContent = {
  patamar: string | null;
  exit: any
}

const Sidebar = ({patamar, exit}: IContent) => {  
  const {handleClick, id} = useProviderSidebar()
  const [buttonToggle, setButtonToggle] = React.useState(false)

  return (
    <div className={style.sidebar__container}>
      <p className={style.sidebar__text__apresentation}>Systech - Assistencia Social</p>

      { 
        (
          patamar === 'master' 
          &&
          <>
            <div className={style.sidebar__content__patamar}>
              <div>
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
                  <Input id='pesquisar' type='text' name='Pesquisar'/>
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
                          <Input id='pesquisar' type='text' name='Pesquisar'/>
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
              <div>
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
                  <Input id='pesquisar' type='text' name='Pesquisar'/>
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
                          <Input id='pesquisar' type='text' name='Pesquisar'/>
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
                          <Input id='pesquisar' type='text' name='Pesquisar'/>
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