import React from 'react'
import style from  './style.module.css'
import useFetch from '../../service/useFetch';

type IContentId = {
  content: string;
  id: string;
}

type IUser = [{
  _id: string;
  nome: string;
  cpf: string;
  senha: string;
  patamar: 'master' | 'equipe' | 'saude'
}]

const Content = ({content, id}: IContentId) => {
  const token = localStorage.getItem('token') 
  const tokenValid = token ? token : 'nao'
  const [dataUser, setDataUser] = React.useState<Record<"master" | "equipe" | "saude", IUser[]> | null>(null)

  const {data, loading, error} = useFetch<IUser>(`https://backendassistenciasocial-production.up.railway.app/usuario`, {
    headers:{
      'Authorization': `Bearer ${JSON.parse(tokenValid)}`
    }
  })

  function patamarSelect(item: IUser){
    const contagem: Record<'master' | 'equipe' | 'saude', IUser[]> = {
      master: [],
      equipe: [],
      saude: []
    }

    item.forEach((obj) => {
      const valorCampo = obj.patamar
      contagem[valorCampo].push([obj])
    })

    setDataUser(contagem)
  }

  React.useEffect(() => {
    data && patamarSelect(data)
  }, [data])

  return (
    <>
      {
        (
          id === 'controle' && content === 'controle'
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
                        {
                          (loading && <p>carregando...</p>)
                          ||
                          (new Array(dataUser)[0]?.master.map((item) =>  <p>{item[0].nome}</p> ))
                          ||
                          (error && <p>{error}</p> )
                        }
                      </div>
                    </div>

                    <div className={style.painel__patamar__content__equipe}>
                      <h2>Equipe</h2>

                      <div>
                        {
                          (loading && <p>carregando...</p>)
                          ||
                          (new Array(dataUser)[0]?.equipe.map((item) =>  <p>{item[0].nome}</p> ))
                          ||
                          (error && <p>{error}</p> )
                        }
                      </div>
                    </div>

                    <div className={style.painel__patamar__content__saude}>
                      <h2>Saude</h2>

                      <div>
                        {
                          (loading && <p>carregando...</p>)
                          ||
                          (new Array(dataUser)[0]?.saude.map((item) =>  <p>{item[0].nome}</p> ))
                          ||
                          (error && <p>{error}</p> )
                        }
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
          id === 'pesquisar' && content === 'pesquisar'
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
                        {
                          (loading && <p>carregando...</p>)
                          ||
                          (new Array(dataUser)[0]?.master.map((item) =>  <p>{item[0].nome}</p> ))
                          ||
                          (error && <p>{error}</p> )
                        }
                      </div>
                    </div>

                    <div className={style.painel__patamar__content__equipe}>
                      <h2>Equipe</h2>

                      <div>
                        {
                          (loading && <p>carregando...</p>)
                          ||
                          (new Array(dataUser)[0]?.equipe.map((item) =>  <p>{item[0].nome}</p> ))
                          ||
                          (error && <p>{error}</p> )
                        }
                      </div>
                    </div>

                    <div className={style.painel__patamar__content__saude}>
                      <h2>Saude</h2>

                      <div>
                        {
                          (loading && <p>carregando...</p>)
                          ||
                          (new Array(dataUser)[0]?.saude.map((item) =>  <p>{item[0].nome}</p> ))
                          ||
                          (error && <p>{error}</p> )
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className='painel__familias'>
              <div className={style.painel__container__table}>
                <h1>Pesquise por familias cadastradas no sistema.</h1>

                <div className={style.painel__table__content}>
                  dasdsadsad
                </div>
              </div>
            </section>
          </>
        )

        ||

        (
          id === 'excluidos' && content === 'excluidos'
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
                        {
                          (loading && <p>carregando...</p>)
                          ||
                          (new Array(dataUser)[0]?.master.map((item) =>  <p>{item[0].nome}</p> ))
                          ||
                          (error && <p>{error}</p> )
                        }
                      </div>
                    </div>

                    <div className={style.painel__patamar__content__equipe}>
                      <h2>Equipe</h2>

                      <div>
                        {
                          (loading && <p>carregando...</p>)
                          ||
                          (new Array(dataUser)[0]?.equipe.map((item) =>  <p>{item[0].nome}</p> ))
                          ||
                          (error && <p>{error}</p> )
                        }
                      </div>
                    </div>

                    <div className={style.painel__patamar__content__saude}>
                      <h2>Saude</h2>

                      <div>
                        {
                          (loading && <p>carregando...</p>)
                          ||
                          (new Array(dataUser)[0]?.saude.map((item) =>  <p>{item[0].nome}</p> ))
                          ||
                          (error && <p>{error}</p> )
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className='painel__familias'>
              <div className={style.painel__container__table}>
                <h1>Familias excluidas do sistema.</h1>

                <div className={style.painel__table__content}>
                  dasdsadsad
                </div>
              </div>
            </section>
          </>
        )
      }
    </>
  )
}

export default Content