import React, { useContext } from 'react'
import style from './Sidebar.module.css'
import { useProviderSidebar } from '../../context/sidebarContext';
import IconPaineldeControle from '../../assets/calendario.svg'
import IconPaineldeControleBlack from '../../assets/calendarioBlack.svg'
import IconMenuHamburger from '../../assets/icons8-hamburger-menu.svg'
import IconClose from '../../assets/x-circle-fill.svg'
import IconSearch from '../../assets/search.svg'
import IconFamilia from '../../assets/cadastroFamilia.svg'
import IconCad from '../../assets/cadastroSaude.svg'
import IconExit from '../../assets/exit.svg'

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
        patamar === 'master' 
        &&
        <>
          <div className={style.sidebar__content__patamar}>
            <div>
              {
                id === 'controle' ?
                <button id='controle' className={style.sidebar__painel__controle__button__active} onClick={handleClick}>
                  <span id='controle' className={style.sidebar__painel__controle__active}>
                    <img id='controle' src={IconPaineldeControleBlack} className={style.sidebar__painel__controle__svg__active} />
                  </span>
                  <p id='controle'>Painel de controle</p>
                </button>
                :
                <button id='controle' className={style.sidebar__painel__controle__button} onClick={handleClick}>
                  <span id='controle' className={style.sidebar__painel__controle}>
                    <img id='controle' src={IconPaineldeControle} className={style.sidebar__painel__controle__svg} />
                  </span>
                </button>
              }

              <button id='pesquisar' onClick={handleClick}>Pesquisar</button>
            </div>

            <button id='excluidos' onClick={handleClick}>Lista de excluidos</button>
            <button id='familias' onClick={handleClick}>Cadastro de familias</button>
            <button id='equipe' onClick={handleClick}>Cadastro de equipe</button>
            <button id='saude' onClick={handleClick}>Cadastro equipe saude</button>
            <button className='sidebar__button__exit' onClick={exit}>Sair</button>
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

                  <div className={style.modal__content__patamar}>
                    <div>
                      {
                        id === 'controle' ?
                        <button id='controle' className={style.sidebar__painel__controle__button__active} onClick={handleClick}>
                          <span className={style.sidebar__painel__controle__active}>
                            <img src={IconPaineldeControleBlack} className={style.sidebar__painel__controle__svg__active} />
                          </span>
                          <p>Painel de controle</p>
                        </button>
                        :
                        <button id='controle' className={style.sidebar__painel__controle__button} onClick={handleClick}>
                          <span className={style.sidebar__painel__controle}>
                            <img src={IconPaineldeControle} className={style.sidebar__painel__controle__svg} />
                          </span>
                          <p>Painel de controle</p>
                        </button>
                      }

                      <button id='pesquisar' onClick={handleClick}>Pesquisar</button>
                    </div>

                    <button id='excluidos' onClick={handleClick}>Lista de excluidos</button>
                    <button id='familias' onClick={handleClick}>Cadastro de familias</button>
                    <button id='equipe' onClick={handleClick}>Cadastro de equipe</button>
                    <button id='saude' onClick={handleClick}>Cadastro equipe saude</button>
                    <button className='sidebar__button__exit' onClick={exit}>Sair</button>
                  </div>
                </div>
              </div>
            }
          </div>
        </>

        ||

        patamar === 'equipe' 
        &&
        <div className={style.sidebar__content__patamar}>
          <button onClick={handleClick}>Painel de controle</button>
          <button onClick={handleClick}>Pesquisar</button>
          <button onClick={handleClick}>Lista de excluidos</button>
          <button onClick={handleClick}>Cadastro de familias</button>
          <button className='sidebar__button__exit' onClick={exit}>Sair</button>
        </div>

        ||

        patamar === 'saude' 
        &&
        <div className={style.sidebar__content__patamar}>
          <button onClick={handleClick}>Cadastro de familias</button>
          <button className='sidebar__button__exit' onClick={exit}>Sair</button>
        </div>
      }
    </div>
  )
}

export default Sidebar