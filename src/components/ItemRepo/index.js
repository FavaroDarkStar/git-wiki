import React from 'react'
import { ItemRepoContainer } from './styles'

function ItemRepo({data, removeAction}) {
  return (
    <ItemRepoContainer>
        <h3>{data.name}</h3>
        <p><a href={data.clone_url} target="_blank" rel="noopener noreferrer">{data.full_name}</a></p>
        <button onClick={() => removeAction(data)} className='remove'>Remover</button>
        <hr />
    </ItemRepoContainer>
  )
}

export default ItemRepo;
