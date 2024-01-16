import React from 'react'

import { ItemRepoContainer } from './styles'

function ItemRepo() {
  return (
    <ItemRepoContainer>
        <h3>Favaro</h3>
        <p>repo/repo</p>
        <a href="#">Ver repositório</a> 
        <br />
        <a href="#" className='remove'>Remover</a>
        <hr />
    </ItemRepoContainer>
  )
}


export default ItemRepo;
