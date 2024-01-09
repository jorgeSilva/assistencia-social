import React from 'react'
import { useProvider } from '../../context/loginContext'
import style from './Equipe.module.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useProviderSidebar } from '../../context/sidebarContext'
import Content from '../../components/Content/Content'

const Equipe = () => {

  document.title = "Assistencia Social | Equipe"

  const {handleLogout} = useProvider()
  const {content, id} = useProviderSidebar()

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
          id === 'controle'
          && 
          <Content id={id} content={content}/>
        )

        ||

        (
          id === 'pesquisar'
          && 
          <Content id={id} content={content}/>
        )

        ||

        (
          id === 'excluidos'
          && 
          <Content id={id} content={content}/>
        )

        ||

        (
          id === 'familias'
          && 
          <Content id={id} content={content}/>
        )
      }
    </main>
  )
}

export default Equipe