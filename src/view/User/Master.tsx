import React from 'react'
import { useProvider } from '../../context/loginContext'
import { useProviderSidebar } from '../../context/sidebarContext'
import style from './Master.module.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import Content from '../../components/Content/Content'

const Master = () => {

  document.title = "Assistencia Social | Master"

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

        ||

        (
          id === 'equipe'
          && 
          <Content id={id} content={content}/>
        )

        ||

        (
          id === 'saude'
          && 
          <Content id={id} content={content}/>
        )
      }
    </main>
  )
}

export default Master