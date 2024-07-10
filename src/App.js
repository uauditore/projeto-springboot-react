import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';
import { useState, useEffect } from 'react';

function App() {

  const produto = {
    codigo: 0,
    nome: '',
    marca: ''
  }

  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([])
  const [objProduto, setObjProduto] = useState(produto)

  //UseEffect
  useEffect(() => {
    fetch("http://localhost:8080/listar")
      .then(retorno => retorno.json())
      .then(retorno_convertido => setProdutos(retorno_convertido));
  }, []);

  //obter dados do formulário
  const aoDigitar = (e) => {
    setObjProduto({ ...objProduto, [e.target.name]: e.target.value });
  }

  //cadastrar
  const cadastrar = () => {
    fetch('http://localhost:8080/cadastrar', {
      method: 'post',
      body: JSON.stringify(objProduto),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        if (retorno_convertido.mensagem !== undefined) {
          alert(retorno_convertido.mensagem);
        } else {
          setProdutos([...produtos, retorno_convertido]);
          alert('Produto cadastrado com sucesso!');
          limparFormulario();
        }
      })
  }

  // remover
  const remover = () => {
    fetch('http://localhost:8080/remover/' + objProduto.condigo, {
      method: 'delete',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {

        //cópia
        let vetorTemp = [...produtos];
        let indice = vetorTemp.findIndex((p) => {
          return p.condigo === objProduto.condigo;
        });

        alert(retorno_convertido.mensagem);
        // remover produto do vetorTemp
        vetorTemp.splice(indice, 1);
        setProdutos(vetorTemp);

        limparFormulario();
      })
  }

  //alterar
  const alterar = () => {
    fetch('http://localhost:8080/alterar', {
      method: 'put',
      body: JSON.stringify(objProduto),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        if (retorno_convertido.mensagem !== undefined) {
          alert(retorno_convertido.mensagem);
        } else {
          alert('Produto alterado com sucesso!');
          //cópia
          let vetorTemp = [...produtos];
          let indice = vetorTemp.findIndex((p) => {
            return p.condigo === objProduto.condigo;
          });

          alert(retorno_convertido.mensagem);
          // alterar produto do vetorTemp
          vetorTemp[indice] = objProduto;
          setProdutos(vetorTemp);
          limparFormulario();
        }
      })
  }

  //limpar formulario
  const limparFormulario = () => {
    setObjProduto(produto);
    setBtnCadastrar(true)
  }

  //Selecionar produto
  const selecionarProduto = (indice) => {
    setObjProduto(produtos[indice]);
    setBtnCadastrar(false);
  }

  return (
    <div>
      <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrar} obj={objProduto} cancelar={limparFormulario} remover={remover} alterar={alterar} />
      <Tabela vetor={produtos} selecionar={selecionarProduto} />
    </div>
  );
}

export default App;
