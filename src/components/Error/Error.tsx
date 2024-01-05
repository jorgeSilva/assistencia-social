import React from 'react'

type IContent = {
  content: string
}

const Error = ({content}: IContent) => {
  return (
    <div style={{fontSize: "1rem", color: "var(--p4)", padding: ".5rem" }}>*{content}*</div>
  )
}

export default Error