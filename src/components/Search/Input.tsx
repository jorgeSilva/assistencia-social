import React from 'react'
import style from './style.module.css'

type Input = React.ComponentProps<'input'>&{
  idButton: string | null;
}

const Input = ({idButton, ...props}: Input) => {

  return (
    <>
      <div className={style.input__group}>
        <input className={style.input} {...props}/>
        <label className={style.label} htmlFor={props.id}>{props.name}</label>
      </div>
    </>
  )
}

export default Input