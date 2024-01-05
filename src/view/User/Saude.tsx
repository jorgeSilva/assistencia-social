import React from 'react'
import { useProvider } from '../../context/loginContext'
import style from './Saude.module.css'
import Sidebar from '../../components/Sidebar/Sidebar'

const Saude = () => {
  const {handleLogout} = useProvider()
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

      <section className={style.saude__form}>
        <form>
          Cadastro 
        </form>
      </section>
    </main>
  )
}

export default Saude