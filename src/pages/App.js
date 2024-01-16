import React, {  useState } from 'react';
import gitLogo from '../assets/github.png' 
import { Container } from './styles.js'

import Input from '../components/Input'
import ItemRepo from '../components/ItemRepo';

import Button from '../components/Button';

import api from '../services/api'

import Swal from 'sweetalert2';

function App() {


  const [currentRepo, setCurrentRepo] = useState("");
  const [repos, setRepos] = useState([]);


  //todo ao tentar adicionar um repositorio já existente sinalizar de alguma forma onde está 
  const handleSearchRepo = async() => {
    if(currentRepo){
      try{ 
        const {data} = await api.get(`repos/${currentRepo}`);
        const duplicates = repos.filter((repo) => repo.id === data.id).length !== 0 ? true : false;
        if(!duplicates){
          setRepos(prev=>[...prev, data]);
        }else{
          Swal.fire({
            icon: 'error',
            title: 'O repositório já está sendo exibido',
            text: 'O repositório que você está buscando já está sendo exibido.',
            background: '#fafafa',
            confirmButtonColor: '#22272e',     
          });
        }
      }catch{
        Swal.fire({
          icon: 'error',
          title: 'Repositório não encontrado',
          text: 'O repositório que você está buscando não foi encontrado.',
          background: '#fafafa',
          confirmButtonColor: '#22272e',     
        });
      }
    }
  }


  const handleRemoveRepo = (id) => {
    const newRepos = repos.filter(repo => repo.id !== id);
    setRepos(newRepos);
  }


  return (
    <Container>
      <img src={gitLogo} alt="gitlogo" width={72} height={72} />
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)}/>
      <Button onClick={handleSearchRepo}/>
      {repos.map(repo => <ItemRepo data={repo} repos={repos} key={repo.id} removeAction={handleRemoveRepo}/>)}

    </Container>
  );
}

export default App;
