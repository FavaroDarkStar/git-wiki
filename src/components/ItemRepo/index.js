import React from 'react'

import { ItemRepoContainer } from './styles'

function ItemRepo({data, removeAction}) {
  return (
    <ItemRepoContainer>
        <h3>{data.name}</h3>
        <p>{data.full_name}</p>
        <a href={data.clone_url} target="_blank" rel="noopener noreferrer">Ver repositório</a> 
        <br />
        <button onClick={() => removeAction(data.id)} className='remove'>Remover</button>
        <hr />
    </ItemRepoContainer>
  )
}
//favarodarkstar/git-find

export default ItemRepo;
