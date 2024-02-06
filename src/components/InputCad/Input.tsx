import React from 'react'
import style from './style.module.css'
import IconClose from '../../assets/x-circle-fill.svg'

type Input = React.ComponentProps<'input'> 

const Input = ({...props}: Input) => {
  const [areaRisco, setAreaRisco] = React.useState<boolean>(false)
  return (
    <>
    {
      props.type === 'radio' && props.id === 'responsavel' &&
      <div className={style.input__group}>
        <label htmlFor={props.id} className={style.label__radio} >{props.name}</label>

        <div className={style.input__content__radio}>
          <div>
            <input {...props} id={props.id+'sim'} value={1}/>
            <label htmlFor={props.id+'sim'}>Sim</label>
          </div>

          <div>
            <input {...props} id={props.id+'nao'} value={0}/>
            <label htmlFor={props.id+'nao'}>Não</label>
          </div>
        </div>
      </div>
    }

    {
      props.type === 'radio' && props.id === 'bpc' &&
      <div className={style.input__group}>
        <label htmlFor={props.id} className={style.label__radio}>{props.name}</label>

        <div className={style.input__content__radio}>
          <div>
            <input {...props} id={props.id+'sim'} value={1}/>
            <label htmlFor={props.id+'sim'}>Sim</label>
          </div>

          <div>
            <input {...props} id={props.id+'nao'} value={0}/>
            <label htmlFor={props.id+'nao'}>Não</label>
          </div>
        </div>
      </div>
    }

    {
      props.type === 'radio' && props.id ===  'idoso' &&
      <div className={style.input__group}>
        <label htmlFor={props.id} className={style.label__radio}>{props.name}</label>

        <div className={style.input__content__radio}>
          <div>
            <input {...props} id={props.id+'sim'} value={1}/>
            <label htmlFor={props.id+'sim'}>Sim</label>
          </div>

          <div>
            <input {...props} id={props.id+'nao'} value={0}/>
            <label htmlFor={props.id+'nao'}>Não</label>
          </div>
        </div>
      </div>
    }


    {
      props.type === 'radio' && props.id === 'areaRisco' &&
      <div className={style.input__group}>
        {
          areaRisco ?
          <>
            <label htmlFor={props.id} className={style.label__radio}>{props.name}</label>
            <button className={style.button__input__radio} onClick={() => setAreaRisco(!areaRisco)}>
              <img src={IconClose} alt="Icone Fechar" />
            </button>
          </>
          :
          <label htmlFor={props.id} className={style.label__radio}>{props.name}</label>
        }
        {
          areaRisco ?
          <div className={style.input__content__radio}>
            <div>
              <input {...props} id={props.id+'defesaCivil'} value={'Defesa Civil'}/>
              <label htmlFor={props.id+'defesaCivil'}>Defesa civil</label>
            </div>

            <div>
              <input {...props} id={props.id+'judicial'} value={'Judicial'}/>
              <label htmlFor={props.id+'judicial'}>Judicial</label>
            </div>
          </div>
          :
          <div className={style.input__content__radio__button}>
            <button className={style.button__input__radio} onClick={() => setAreaRisco(!areaRisco)}>
              SIM
            </button>
            <span className={style.input__info}>?</span>
          </div>
        }
      </div>
    }

    { 
      props.type === 'radio' && props.id === 'residencia' &&
      <div className={style.input__group}>
        <label htmlFor={props.id} className={style.label__radio}>{props.name}</label>

        <div className={style.input__content__radio}>
          <div>
            <input {...props} id={props.id+'cedida'} value={'Cedida'}/>
            <label htmlFor={props.id+'cedida'}>Cedida</label>
          </div>

          <div>
            <input {...props} id={props.id+'alugada'} value={'Alugada'}/>
            <label htmlFor={props.id+'alugada'}>Alugada</label>
          </div>

          <div>
            <input {...props} id={props.id+'propria'} value={'Propria'}/>
            <label htmlFor={props.id+'propria'}>Propria</label>
          </div>
        </div>
      </div>
    }

    {
      props.type === 'text' &&
      <div className={style.input__group}>
        <input className={style.input} {...props}/>
        <label className={style.label} htmlFor={props.id}>{props.name}</label>
      </div>
    }

    {
      props.type === 'number' &&
      <div className={style.input__group}>
        <input className={style.input} {...props}/>
        <label className={style.label} htmlFor={props.id}>{props.name}</label>
      </div>
    }

{
      props.type === 'date' &&
      <div className={style.input__group}>
        <input className={style.input} {...props}/>
        <label className={style.label} htmlFor={props.id}>{props.name}</label>
      </div>
    }
    </>
  )
}

export default Input