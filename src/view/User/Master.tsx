import React from 'react'
import { useProvider } from '../../context/loginContext'
import { useProviderSidebar } from '../../context/sidebarContext'
import style from './Master.module.css'
import Sidebar from '../../components/Sidebar/Sidebar'

const Master = () => {
  const {handleLogout} = useProvider()
  const authorized = localStorage.getItem('authenticated')
  const url = document.URL.split("/")[3]
  const { content, id } = useProviderSidebar()

  if(!authorized){
    document.location.href = "/"
  }

  return (
    <main className={style.master__container}>
      <section className="sidebar">
        <Sidebar patamar={url} exit={handleLogout}/>
      </section>
      {
        (
          id === 'controle'
          && 
          <>
            <section className='painel__equipe__saude'>
              <div className={style.painel__container}>
                <div className={style.painel__slot__text}>
                  <p>Veja os dados das familias</p>
                </div>

                <div className={style.painel__slot__content}>
                  <h1>Equipe dentro do sistema</h1>

                  <div className={style.painel__content}>
                    <div className={style.painel__patamar__content__master}>
                      <h2>Master</h2>

                      <div>
                        <p>Agneli</p>
                      </div>
                    </div>

                    <div className={style.painel__patamar__content__equipe}>
                      <h2>Equipe</h2>

                      <div>
                        <p>Jorge</p>
                      </div>
                    </div>

                    <div className={style.painel__patamar__content__saude}>
                      <h2>Saude</h2>

                      <div>
                        <p>Helena</p>
                        <p>Alice</p>
                        <p>Laura</p>
                        <p>Maria Alice</p>
                        <p>Sophia</p>
                        <p>Manuela</p>
                        <p>Maitê</p>
                        <p>Liz</p>
                        <p>Cecília</p>
                        <p>Isabella</p>
                        <p>Luísa</p>
                        <p>Eloá</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className='painel__familias'>
              <div className={style.painel__container__table}>
                <h1>Familias cadastradas no sistema.</h1>

                <div className={style.painel__table__content}>
                  dasdsadsad
                </div>
              </div>
            </section>
          </>
        )

        ||

        (
          id === 'excluidos'
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
          id === 'pesquisar'
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
          id === 'familias'
          && 
          <>
            <section className='cadastro__familias'>
              <p>Cadastro familias</p>
            </section>
          </>
        )

        ||

        (
          id === 'equipe'
          && 
          <>
            <section className={style.master__cadastro__equipe}>
              <p>Cadastro Equipe</p>
            </section>
          </>
        )

        ||

        (
          id === 'saude'
          && 
          <>
            <section className={style.master__cadastro__equipe__saude}>
              <p>Cadastro Equipe saude</p>
            </section>
          </>
        )
      }
    </main>
  )
}

export default Master