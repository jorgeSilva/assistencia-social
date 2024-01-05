import React from 'react'
import { useProvider } from '../../context/loginContext'
import style from './Equipe.module.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useProviderSidebar } from '../../context/sidebarContext'

const Equipe = () => {
  const {handleLogout} = useProvider()
  const {content} = useProviderSidebar()

  const authorized = localStorage.getItem('authenticated')
  const url = document.URL.split("/")[3]

  if(!authorized){
    document.location.href = "/"
  }

  return (
    <main className={style.equipe__container}>
      <section className='sidebar'>
        <Sidebar patamar={url} exit={handleLogout}/>
      </section>
      {
        (
          content === 'painel de controle'
          && 
          <>
            <section className='painel__equipe__saude'>
              <p>Funcionarios online</p>
            </section>

            <section className='painel__familias'>
              <p>Familias</p>
            </section>
          </>
        )

        ||

        (
          content === 'lista de excluidos'
          && 
          <>
            <section className='painel__equipe__saude'>
              <p>Funcionarios online</p>
            </section>

            <section className='painel__familias'>
              <p>Familias Excluidas</p>
            </section>
          </>
        )

        ||

        (
          content === 'pesquisar'
          && 
          <>
            <section className='painel__equipe__saude'>
              <p>Funcionarios online</p>
            </section>

            <section className='painel__familias'>
              <p>Familias pesquisa</p>
            </section>
          </>
        )

        ||

        (
          content === 'cadastro de familias'
          && 
          <>
            <section className='cadastro__familias'>
              <p>Cadastro familias</p>
            </section>
          </>
        )
      }
    </main>
  )
}

export default Equipe