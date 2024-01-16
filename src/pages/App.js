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

  const handleSearchRepo = async() => {
    if(currentRepo){
      try{ 
        const {data} = await api.get(`repos/${currentRepo}`);
        const duplicates = repos.filter((repo) => repo.id === data.id).length !== 0 ? true : false;
        if(!duplicates){
          setRepos(prev=>[...prev, data]);
          Swal.fire({
            position: "bottom-end",
            backdrop: false,
            showConfirmButton: false,
            icon: "success",
            title: `Repositório "${data.full_name}" adicionado com sucesso!`,
            timer: 3500
          });
        }else{
          Swal.fire({
            icon: 'warning',
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
        });
      }
    }
  }

  const handleRemoveRepo = (data) => {
    Swal.fire({
      title: `Tem certeza que deseja remover o repositório ${data.full_name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, pode remover!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        const newRepos = repos.filter(repo => repo.id !== data.id);
        setRepos(newRepos);
        Swal.fire({
          title: "Removido!",
          text: `O repositório ${data.full_name} foi removido.`,
          icon: "success",
          position: "bottom-end",
          backdrop: false,
          showConfirmButton: false,
          timer: 3500
        });
      }
    });
  }

  const handleEnterPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchRepo();
    }
  };

  return (
    <Container>
      <img src={gitLogo} alt="gitlogo" width={72} height={72} />
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)} onKeyDown={handleEnterPress} />
      <Button onClick={handleSearchRepo}/>
      {repos.map(repo => <ItemRepo data={repo} repos={repos} key={repo.id} removeAction={handleRemoveRepo}/>)}
    </Container>
  );
}

export default App;
