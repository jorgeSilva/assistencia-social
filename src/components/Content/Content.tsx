import React from 'react'
import style from  './style.module.css'
import UseFetch from '../../service/useFetch';
import ModalActions from '../Modal/ModalActions';
import X from '../../assets/x-circle-fill.svg'
import Form from '../Form/Form';
import { useProviderSidebar } from '../../context/sidebarContext';

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

type IFamilias = [{
    _id: string,
		nome: string,
		cpf: number,
		parentesco: string,
		responsavel: true,
		dataNasc: string,
		nis: string,
		inicio: string,
		fim: string,
		nFilhosMaior: number,
		nFilhosMenor: number,
		residencia: string,
		idoso: boolean,
		bpc: boolean,
		contato: string,
		rua: string,
		bairro: string,
		nCasa: number,
		complemento: string,
		areaDeRisco: string,
		fkUserCad: {
      cpf: number;
      nome: string;
      patamar: string;
      senha: string;
      _id: string;
    },
}]

const Content = ({content, id}: IContentId) => {
  // ---------------------------------------------------------------------------- Variaveis -----------------------------------------------------------

  const token = localStorage.getItem('token') 
  const tokenValid = token ? token : 'nao'
  const [dataUser, setDataUser] = React.useState<Record<"master" | "equipe" | "saude", IUser[]> | null>(null)
  const [urlIntegrante, setUrlIntegrante] = React.useState<string>('')
  const [options, setOptions] = React.useState(false)
  const [modalUpdate, setModalUpdate] = React.useState(false)
  const [modalDelete, setModalDelete] = React.useState(false)
  const [modalIntegrantes, setModalIntegrantes] = React.useState(false)
  const {
    familiaFilter
  } = useProviderSidebar()

  // --------------------------------------------------------------------------- Chamadas API ----------------------------------------------------------

  const {data, loading, error} = UseFetch<IUser>(`https://backendassistenciasocial-production.up.railway.app/usuario`, {
    headers:{
      'Authorization': `Bearer ${JSON.parse(tokenValid)}`
    }
  })

  const familias = UseFetch<IFamilias>(`https://backendassistenciasocial-production.up.railway.app/familia/show`, {
    headers:{
      'Authorization': `Bearer ${JSON.parse(tokenValid)}`
    }
  })

  const excluidos = UseFetch<IFamilias>(`https://backendassistenciasocial-production.up.railway.app/excluidos/show`, {
    headers:{
      'Authorization': `Bearer ${JSON.parse(tokenValid)}`
    }
  })
    
  // --------------------------------------------------------------------- Funções front-end --------------------------------------------------------------

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

  function handleClick(item: any){
    setUrlIntegrante(item._id)
    setOptions(!options)
  }

  function formatarDataBrasileira(dataString: string): string {
    const data = new Date(dataString);
    const dia = String(data.getUTCDate()).padStart(2, '0');
    const mes = String(data.getUTCMonth() + 1).padStart(2, '0'); // O mês é baseado em zero
    const ano = data.getUTCFullYear();
  
    return `${dia}/${mes}/${ano}`;
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
                          (loading &&  <p>carregando... <span className={style.loader}></span> <span className={style.loader}></span></p>
                          ) 
                          ||
                          (new Array(dataUser)[0]?.master.map((item) =>  <p key={item[0]._id+item[0].nome}>{item[0].nome ? item[0].nome : 'Nenhum cadastrado ainda.'  }</p> ))
                          ||
                          (error && <p>{error}</p> )
                        }
                      </div>
                    </div>

                    <div className={style.painel__patamar__content__equipe}>
                      <h2>Equipe</h2>

                      <div>
                        {
                          (loading && <p>carregando... <span className={style.loader}></span></p>)
                          ||
                          (
                            new Array(dataUser)[0]?.equipe.length !== 0 ?
                            new Array(dataUser)[0]?.equipe.map((item) =>  <p key={item[0]._id+item[0].nome}>{item[0].nome}</p> )
                            :
                            <p>Ninguem cadastrado ainda</p>
                          )
                          ||
                          (error && <p>{error}</p> )
                        }
                      </div>
                    </div>

                    <div className={style.painel__patamar__content__saude}>
                      <h2>Saude</h2>

                      <div>
                        {
                          (loading && <p>carregando... <span className={style.loader}></span></p>)
                          ||
                          (
                            new Array(dataUser)[0]?.saude.length !== 0 ?
                            new Array(dataUser)[0]?.saude.map((item) =>  <p key={item[0]._id+item[0].nome}>{item[0].nome}</p> )
                            :
                            <p>Ninguem cadastrado ainda</p>
                          )
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
                <h1 className={style.painel__container__table__h1}>Familias cadastradas no sistema.</h1> 
                
                {
                  options && !modalDelete && !modalUpdate && !modalIntegrantes ?
                  <div className={style.modal__buttons__content}>
                    <button className={style.modal__button} onClick={() => setModalUpdate(!modalUpdate)}>Editar</button>
                    <button className={style.modal__button} onClick={() => setModalDelete(!modalDelete)}>Excluir</button>
                    <button className={style.modal__button} onClick={() => setModalIntegrantes(!modalIntegrantes)}>Integrantes</button>
                  </div>
                  :
                  <div className={style.modal__buttons__content}>
                    <button className={style.modal__button__disabled} disabled>Editar</button>
                    <button className={style.modal__button__disabled} disabled>Excluir</button>
                    <button className={style.modal__button__disabled} disabled>Integrantes</button>
                  </div>
                }
                <section className={style.painel__table__content}>
                  {
                    (
                      modalDelete && 
                      <>
                        <button className={style.modal__button__active} onClick={() => {
                          setModalDelete(false)
                          setOptions(!options)
                        }}>
                          <img src={X} alt="" />
                        </button>
                        <ModalActions id={urlIntegrante} type={'delete'}/> 
                      </>
                    )
                    ||
                    (
                      modalUpdate && 
                      <>
                        <button className={style.modal__button__active} onClick={() => {
                          setModalUpdate(false)
                          setOptions(!options)
                        }}>
                          <img src={X} alt="" />
                        </button>
                        <ModalActions id={urlIntegrante} type={"update"}/>
                      </>
                    )
                    ||
                    (
                      modalIntegrantes && 
                      <>
                        <button className={style.modal__button__active} onClick={() => {
                          setModalIntegrantes(false)
                          setOptions(!options)
                        }}>
                          <img src={X} alt="" />
                        </button>
                        <ModalActions id={urlIntegrante} type={"integrantes"}/>
                      </>
                    )
                    ||
                    (
                    <table>
                      <thead>
                        <tr>
                          <th>Nome</th>
                          <th>CPF</th>
                          <th>Parentesco</th>
                          <th>Responsavel</th>
                          <th>Data nascimento</th>
                          <th>NISS</th>
                          <th>Inicio</th>
                          <th>Fim</th>
                          <th>N° Filhos maior</th>
                          <th>N° Filhos menor</th>
                          <th>Residencia</th>
                          <th>Idoso</th>
                          <th>BPC</th>
                          <th>Contato</th>
                          <th>Rua</th>
                          <th>Bairro</th>
                          <th>N° Casa</th>
                          <th>Complemento</th>
                          <th>Area de Risco</th>
                          <th>Quem cadastrou ?</th>
                        </tr>
                      </thead>
                      
                      {
                        (
                          familias.loading && <p>carregando...</p>
                        )
                        ||
                        <tbody>
                          {
                            familias.data && familias.data.map(item => (
                              <tr key={item.cpf}>
                                <th> <button onClick={() => handleClick(item)}> {item.nome}</button></th>
                                <th> <button onClick={() => handleClick(item)}> {item.cpf}</button></th>
                                <th> <button onClick={() => handleClick(item)}> {item.parentesco}</button></th>
                                <th> <button onClick={() => handleClick(item)}> {item.responsavel === true ? 'SIM' : 'NÃO' }</button></th>
                                <th> <button onClick={() => handleClick(item)}> {formatarDataBrasileira(item.dataNasc)}</button></th>
                                <th> <button onClick={() => handleClick(item)}> {item.nis}</button></th>
                                <th> <button onClick={() => handleClick(item)}> {formatarDataBrasileira(item.inicio)}</button></th>
                                <th> <button onClick={() => handleClick(item)}> {formatarDataBrasileira(item.fim)}</button></th>
                                <th> <button onClick={() => handleClick(item)}> {item.nFilhosMaior}</button></th>
                                <th> <button onClick={() => handleClick(item)}> {item.nFilhosMenor}</button></th>
                                <th> <button onClick={() => handleClick(item)}> {item.residencia}</button></th>
                                <th> <button onClick={() => handleClick(item)}> {item.idoso === true ? 'SIM' : 'NÃO'}</button></th>
                                <th> <button onClick={() => handleClick(item)}> {item.bpc === true ? 'SIM' : 'NÃO'}</button></th>
                                <th> <button onClick={() => handleClick(item)}> {item.contato}</button></th>
                                <th> <button onClick={() => handleClick(item)}> {item.rua}</button></th>
                                <th> <button onClick={() => handleClick(item)}> {item.bairro}</button></th>
                                <th> <button onClick={() => handleClick(item)}> {item.nCasa}</button></th>
                                <th> <button onClick={() => handleClick(item)}> {item.complemento}</button></th>
                                <th> <button onClick={() => handleClick(item)}> {item.areaDeRisco === 'false' ? 'NÃO' : item.areaDeRisco}</button></th>
                                <th> <button onClick={() => handleClick(item)}> {item.fkUserCad?.nome}</button></th>
                              </tr>
                            ))
                          }
                        </tbody>
                      }
                    </table>
                    )
                  }
                </section>
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
                          (loading && <p>carregando... <span className={style.loader}></span></p>)
                          ||
                          (new Array(dataUser)[0]?.master.map((item) =>  <p key={item[0]._id+item[0].nome}>{item[0].nome}</p> ))
                          ||
                          (error && <p>{error}</p> )
                        }
                      </div>
                    </div>

                    <div className={style.painel__patamar__content__equipe}>
                      <h2>Equipe</h2>

                      <div>
                        {
                          (loading && <p>carregando... <span className={style.loader}></span></p>)
                          ||
                          (
                            new Array(dataUser)[0]?.equipe.length !== 0 ?
                            new Array(dataUser)[0]?.equipe.map((item) =>  <p key={item[0]._id+item[0].nome}>{item[0].nome}</p> )
                            :
                            <p>Ninguem cadastrado ainda</p>
                          )
                          ||
                          (error && <p>{error}</p> )
                        }
                      </div>
                    </div>

                    <div className={style.painel__patamar__content__saude}>
                      <h2>Saude</h2>

                      <div>
                        {
                          (loading && <p>carregando... <span className={style.loader}></span></p>)
                          ||
                          (
                            new Array(dataUser)[0]?.saude.length !== 0 ?
                            new Array(dataUser)[0]?.saude.map((item) =>  <p key={item[0]._id+item[0].nome}>{item[0].nome}</p> )
                            :
                            <p>Ninguem cadastrado ainda</p>
                          )
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
                <h1 className={style.painel__container__table__h1}>Pesquise por familias cadastradas no sistema.</h1>

                {
                  options && !modalDelete && !modalUpdate && !modalIntegrantes ?
                  <div className={style.modal__buttons__content}>
                    <button className={style.modal__button} onClick={() => setModalUpdate(!modalUpdate)}>Editar</button>
                    <button className={style.modal__button} onClick={() => setModalDelete(!modalDelete)}>Excluir</button>
                    <button className={style.modal__button} onClick={() => setModalIntegrantes(!modalIntegrantes)}>Integrantes</button>
                  </div>
                  :
                  <div className={style.modal__buttons__content}>
                    <button className={style.modal__button__disabled} disabled>Editar</button>
                    <button className={style.modal__button__disabled} disabled>Excluir</button>
                    <button className={style.modal__button__disabled} disabled>Integrantes</button>
                  </div>
                }
                <section className={style.painel__table__content}>
                  {
                    (
                      modalDelete && 
                      <>
                        <button className={style.modal__button__active} onClick={() => {
                          setModalDelete(false)
                          setOptions(!options)
                        }}>
                          <img src={X} alt="" />
                        </button>
                        <ModalActions id={urlIntegrante} type={'delete'}/> 
                      </>
                    )
                    ||
                    (
                      modalUpdate && 
                      <>
                        <button className={style.modal__button__active} onClick={() => {
                          setModalUpdate(false)
                          setOptions(!options)
                        }}>
                          <img src={X} alt="" />
                        </button>
                        <ModalActions id={urlIntegrante} type={"update"}/>
                      </>
                    )
                    ||
                    (
                      modalIntegrantes && 
                      <>
                        <button className={style.modal__button__active} onClick={() => {
                          setModalIntegrantes(false)
                          setOptions(!options)
                        }}>
                          <img src={X} alt="" />
                        </button>
                        <ModalActions id={urlIntegrante} type={"integrantes"}/>
                      </>
                    )
                    ||
                    (
                    <table>
                      <thead>
                        <tr>
                          <th>Nome</th>
                          <th>CPF</th>
                          <th>Parentesco</th>
                          <th>Responsavel</th>
                          <th>Data nascimento</th>
                          <th>NISS</th>
                          <th>Inicio</th>
                          <th>Fim</th>
                          <th>N° Filhos maior</th>
                          <th>N° Filhos menor</th>
                          <th>Residencia</th>
                          <th>Idoso</th>
                          <th>BPC</th>
                          <th>Contato</th>
                          <th>Rua</th>
                          <th>Bairro</th>
                          <th>N° Casa</th>
                          <th>Complemento</th>
                          <th>Area de Risco</th>
                          <th>Quem cadastrou ?</th>
                        </tr>
                      </thead>
                      
                      {
                        <tbody>
                          {
                            familiaFilter && familiaFilter.map(item => (
                              <tr key={item.cpf}>
                                <th> <button onClick={() => handleClick(item)}> {item.nome}</button></th>
                                <th> <button onClick={() => handleClick(item)}> {item.cpf}</button></th>
                                <th> <button onClick={() => handleClick(item)}> {item.parentesco}</button></th>
                                <th> <button onClick={() => handleClick(item)}> {item.responsavel === true ? 'SIM' : 'NÃO' }</button></th>
                                <th> <button onClick={() => handleClick(item)}> {formatarDataBrasileira(item.dataNasc)}</button></th>
                                <th> <button onClick={() => handleClick(item)}> {item.nis}</button></th>
                                <th> <button onClick={() => handleClick(item)}> {formatarDataBrasileira(item.inicio)}</button></th>
                                <th> <button onClick={() => handleClick(item)}> {formatarDataBrasileira(item.fim)}</button></th>
                                <th> <button onClick={() => handleClick(item)}> {item.nFilhosMaior}</button></th>
                                <th> <button onClick={() => handleClick(item)}> {item.nFilhosMenor}</button></th>
                                <th> <button onClick={() => handleClick(item)}> {item.residencia}</button></th>
                                <th> <button onClick={() => handleClick(item)}> {item.idoso === true ? 'SIM' : 'NÃO'}</button></th>
                                <th> <button onClick={() => handleClick(item)}> {item.bpc === true ? 'SIM' : 'NÃO'}</button></th>
                                <th> <button onClick={() => handleClick(item)}> {item.contato}</button></th>
                                <th> <button onClick={() => handleClick(item)}> {item.rua}</button></th>
                                <th> <button onClick={() => handleClick(item)}> {item.bairro}</button></th>
                                <th> <button onClick={() => handleClick(item)}> {item.nCasa}</button></th>
                                <th> <button onClick={() => handleClick(item)}> {item.complemento}</button></th>
                                <th> <button onClick={() => handleClick(item)}> {item.areaDeRisco === 'false' ? 'NÃO' : item.areaDeRisco}</button></th>
                                <th> <button onClick={() => handleClick(item)}> {item.fkUserCad?.nome}</button></th>
                              </tr>
                            ))
                          }
                        </tbody>
                      }
                    </table>
                    )
                  }
                </section>
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
                  <h1 className={style.painel__container__table__h1}>Equipe dentro do sistema</h1>

                  <div className={style.painel__content}>
                    <div className={style.painel__patamar__content__master}>
                      <h2>Master</h2>

                      <div>
                        {
                          (loading && <p>carregando... <span className={style.loader}></span></p>)
                          ||
                          (new Array(dataUser)[0]?.master.map((item) =>  <p key={item[0]._id+item[0].nome}>{item[0].nome}</p> ))
                          ||
                          (error && <p>{error}</p> )
                        }
                      </div>
                    </div>

                    <div className={style.painel__patamar__content__equipe}>
                      <h2>Equipe</h2>

                      <div>
                        {
                          (loading && <p>carregando... <span className={style.loader}></span></p>)
                          ||
                          (
                            new Array(dataUser)[0]?.equipe.length !== 0 ?
                            new Array(dataUser)[0]?.equipe.map((item) =>  <p key={item[0]._id+item[0].nome}>{item[0].nome}</p> )
                            :
                            <p>Ninguem cadastrado ainda</p>
                          )
                          ||
                          (error && <p>{error}</p> )
                        }
                      </div>
                    </div>

                    <div className={style.painel__patamar__content__saude}>
                      <h2>Saude</h2>

                      <div>
                        {
                          (loading && <p>carregando... <span className={style.loader}></span></p>)
                          ||
                          (
                            new Array(dataUser)[0]?.saude.length !== 0 ?
                            new Array(dataUser)[0]?.saude.map((item) =>  <p key={item[0]._id+item[0].nome}>{item[0].nome}</p> )
                            :
                            <p>Ninguem cadastrado ainda</p>
                          )
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
                <h1 className={style.painel__container__table__h1}>Familias excluidas do sistema.</h1>

                <div className={style.painel__table__content}>
                  <table>
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Parentesco</th>
                        <th>Responsavel</th>
                        <th>Data nascimento</th>
                        <th>NISS</th>
                        <th>Inicio</th>
                        <th>Fim</th>
                        <th>N° Filhos maior</th>
                        <th>N° Filhos menor</th>
                        <th>Residencia</th>
                        <th>Idoso</th>
                        <th>BPC</th>
                        <th>Contato</th>
                        <th>Rua</th>
                        <th>Bairro</th>
                        <th>N° Casa</th>
                        <th>Complemento</th>
                        <th>Area de Risco</th>
                        <th>Quem cadastrou ?</th>
                      </tr>
                    </thead>

                    {
                      (
                        excluidos.loading && <p>carregando...</p>
                      )
                      ||
                      <tbody>
                        {
                          excluidos.data && excluidos.data.map(item => (
                            <tr key={item.cpf}>
                              <th> <button onClick={() => handleClick(item)}> {item.nome}</button></th>
                              <th> <button onClick={() => handleClick(item)}> {item.cpf}</button></th>
                              <th> <button onClick={() => handleClick(item)}> {item.parentesco}</button></th>
                              <th> <button onClick={() => handleClick(item)}> {item.responsavel === true ? 'SIM' : 'NÃO' }</button></th>
                              <th> <button onClick={() => handleClick(item)}> {formatarDataBrasileira(item.dataNasc)}</button></th>
                              <th> <button onClick={() => handleClick(item)}> {item.nis}</button></th>
                              <th> <button onClick={() => handleClick(item)}> {formatarDataBrasileira(item.inicio)}</button></th>
                              <th> <button onClick={() => handleClick(item)}> {formatarDataBrasileira(item.fim)}</button></th>
                              <th> <button onClick={() => handleClick(item)}> {item.nFilhosMaior}</button></th>
                              <th> <button onClick={() => handleClick(item)}> {item.nFilhosMenor}</button></th>
                              <th> <button onClick={() => handleClick(item)}> {item.residencia}</button></th>
                              <th> <button onClick={() => handleClick(item)}> {item.idoso === true ? 'SIM' : 'NÃO'}</button></th>
                              <th> <button onClick={() => handleClick(item)}> {item.bpc === true ? 'SIM' : 'NÃO'}</button></th>
                              <th> <button onClick={() => handleClick(item)}> {item.contato}</button></th>
                              <th> <button onClick={() => handleClick(item)}> {item.rua}</button></th>
                              <th> <button onClick={() => handleClick(item)}> {item.bairro}</button></th>
                              <th> <button onClick={() => handleClick(item)}> {item.nCasa}</button></th>
                              <th> <button onClick={() => handleClick(item)}> {item.complemento}</button></th>
                              <th> <button onClick={() => handleClick(item)}> {item.areaDeRisco === 'false' ? 'NÃO' : item.areaDeRisco}</button></th>
                              <th> <button onClick={() => handleClick(item)}> {item.fkUserCad.nome}</button></th>
                            </tr>
                          ))
                        }
                      </tbody>
                    }
                  </table>
                </div>
              </div>
            </section>
          </>
        )

        ||

        (
          id === 'familias' && content === 'familias'
          &&
          <>
            <section className={style.form__content}>
              <h1 className={style.form__h1}>Cadastre uma familia</h1>

              <div className={style.form}>
                <Form id={id}/>  
              </div>
            </section>
          </>
        )

        ||

        (
          id === 'equipe' && content === 'equipe'
          &&
          <>
            <section className={style.form__content}>
              <h1 className={style.form__h1}>Amplie sua equipe para coletar mais dados</h1>

              <div className={style.form}>
                <Form id={id}/>  
              </div>
            </section>
          </>
        )

        ||

        (
          id === 'saude' && content === 'saude'
          &&
          <>
            <section className={style.form__content}>
              <h1 className={style.form__h1}>Adicione o pessoal da saude para ajudar</h1>

              <div className={style.form}>
                <Form id={id}/>  
              </div>
            </section>
          </>
        )
      }
    </>
  )
}

export default Content