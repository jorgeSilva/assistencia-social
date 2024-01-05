import React from 'react'
import style from './style.module.css'
import Input from '../../components/Input/Input'
import { useProvider } from '../../context/loginContext'
import { useNavigate } from "react-router-dom";
import Error from '../../components/Error/Error';
import iconBottom from '../../assets/imageLogin.svg'

const Login = () => {
  const {
    handleCPF,
    handleSenha, 
    handleLogin, 
    loading, 
    error,
    data,
    authorized
  } = useProvider()

  const nav = useNavigate()

  React.useEffect(() => {
    authorized && nav(`/${data?.user.patamar}/${data?.user._id}`)
  }, [authorized])

  return (
    <main className={style.login__body}>
      <section className={style.login__container__form}>
        <div className={style.login__content__left}></div>
        <div className={style.login__content__rigth}>
          <p className={style.login__name__system}>Assistencia Social System</p>

          <h1 className={style.login__h1__text}>Acesse com "CPF" e "SENHA"</h1>
          <p className={style.login__p__text}>Disponibilizados à você pelo superior</p>

          <div>
            <Input type='text' name='CPF' id='cpf' onChange={handleCPF}/>
            <Input type='password' name='Senha' id='senha' onChange={handleSenha}/>

            {
              loading ?
              <>
              <button className={style.login__button__login__loading} disabled>
                Carregando...
              </button>
              <span className="loader"></span>
              </>
              :
              <button className={style.login__button__login} onClick={handleLogin}>
                Entrar
              </button>
            }
            
            {
              error && <Error content={error}/>
            }

            <section className={style.login__image__bottom}>
              <img src={iconBottom} alt="" />
            </section>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Login