import './App.css';
import Formulario from './components/Formulario';
import Tabela from './components/Tabela';
import Login from './components/Login';
import Cart from './components/Cart';
import ProductDetail from './components/ProductDetail';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const produto = { codigo: 0, nome: '', marca: '' };

  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [objProduto, setObjProduto] = useState(produto);

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/listar")
      .then(retorno => retorno.json())
      .then(retorno_convertido => setProdutos(retorno_convertido));
  }, []);

  const aoDigitar = (e) => {
    setObjProduto({ ...objProduto, [e.target.name]: e.target.value });
  };

  const cadastrar = () => {
    fetch('http://localhost:8080/cadastrar', {
      method: 'post',
      body: JSON.stringify(objProduto),
      headers: { 'Content-type': 'application/json', 'Accept': 'application/json' }
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
      });
  };

  const remover = () => {
    fetch('http://localhost:8080/remover/' + objProduto.condigo, {
      method: 'delete',
      headers: { 'Content-type': 'application/json', 'Accept': 'application/json' }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        let vetorTemp = [...produtos];
        let indice = vetorTemp.findIndex((p) => {
          return p.codigo === objProduto.condigo;
        });

        alert(retorno_convertido.mensagem);
        vetorTemp.splice(indice, 1);
        setProdutos(vetorTemp);
        limparFormulario();
      });
  };

  const alterar = () => {
    fetch('http://localhost:8080/alterar', {
      method: 'put',
      body: JSON.stringify(objProduto),
      headers: { 'Content-type': 'application/json', 'Accept': 'application/json' }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        if (retorno_convertido.mensagem !== undefined) {
          alert(retorno_convertido.mensagem);
        } else {
          alert('Produto alterado com sucesso!');
          let vetorTemp = [...produtos];
          let indice = vetorTemp.findIndex((p) => {
            return p.codigo === objProduto.codigo;
          });

          vetorTemp[indice] = objProduto;
          setProdutos(vetorTemp);
          limparFormulario();
        }
      });
  };

  const limparFormulario = () => {
    setObjProduto(produto);
    setBtnCadastrar(true);
  };

  const selecionarProduto = (indice) => {
    setObjProduto(produtos[indice]);
    setBtnCadastrar(false);
  };

  const handleAddToCart = (objProduto) => {
    setCartItems([...cartItems, { ...objProduto, quantity: 1 }]);
  };

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Formulario
                botao={btnCadastrar}
                eventoTeclado={aoDigitar}
                cadastrar={cadastrar}
                obj={objProduto}
                cancelar={limparFormulario}
                remover={remover}
                alterar={alterar}
              />
              <Tabela vetor={produtos} selecionar={selecionarProduto} onAddToCart={handleAddToCart} />
            </>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path="/carrinho" element={<Cart  items={cartItems} onQuantityChange={handleQuantityChange} onRemoveItem={handleRemoveItem} />} />
        <Route path="/produto/:id" element={<ProductDetail products={produtos} setProducts={setProdutos} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
