import React, { useState } from 'react';
import CurrencyInput from 'react-currency-input-field';

function Formulario({ botao, eventoTeclado, cadastrar, obj, cancelar, remover, alterar }) {
    const [loading, setLoading] = useState(false);

    const handleClick = async (action) => {
        setLoading(true);
        try {
            await action();
        } catch (error) {
            console.error('Erro ao executar ação:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form>
            <input type="text" value={obj.nome} onChange={eventoTeclado} name='nome' placeholder="Nome" className='form-control' />
            <input type="text" value={obj.marca} onChange={eventoTeclado} name='marca' placeholder="Marca" className='form-control' />
            <CurrencyInput
                value={obj.price}
                onValueChange={(value) => eventoTeclado({ target: { name: 'price', value } })}
                name="price"
                placeholder="Preço"
                className="form-control"
                intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
            />
            {
                botao
                    ?
                    <input type="button" value="Cadastrar" onClick={cadastrar} className='btn btn-primary' />
                    :
                    <div>
                        <button type="button" className="btn btn-danger ml-2" onClick={() => handleClick(remover)}>
                            {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Remover'}
                        </button>
                        <button type="button" className="btn btn-warning ml-2" onClick={() => handleClick(alterar)}>
                            {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Alterar'}
                        </button>
                        <input type="button" value="Cancelar" onClick={cancelar} className='btn btn-secondary' />
                    </div>
            }
        </form>
    )
}

export default Formulario;
