import React from 'react'
import { useProvider } from '../../context/loginContext'
import { useProviderSidebar } from '../../context/sidebarContext'
import style from './Saude.module.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import Content from '../../components/Content/Content'


const Saude = () => {

  document.title = "Assistencia Social | Master"

  const {handleLogout} = useProvider()
  const { content, id } = useProviderSidebar()
  const authorized = localStorage.getItem('authenticated')
  const url = document.URL.split("/")[3]

  if(!authorized){
    document.location.href = "/"
  }

  return (
   <main className={style.saude__container}>
      <section className='sidebar'>
        <Sidebar patamar={url} exit={handleLogout}/>
      </section>

      {
        (
          id === 'familias'
          && 
          <Content id={id} content={content}/>
        )
      }
    </main>
  )
}

export default Saude