import React, { useState } from 'react';

function Tabela({ vetor, selecionar, onAddToCart }) {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [searchQuery, setSearchQuery] = useState('');
    // Função para ordenar os dados da tabela
    const sortedVetor = [...vetor].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const filteredProdutos = sortedVetor.filter((produto) =>
        produto.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
        produto.marca.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (produto.price !== null && produto.price.toString().includes(searchQuery))
    );
    // Função para controlar a troca de página
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const paginatedProdutos = filteredProdutos.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredProdutos.length / itemsPerPage);

    // Função para obter os dados da página atual
    //const getCurrentItems = () => {
     //   const startIndex = (currentPage - 1) * itemsPerPage;
      //  const endIndex = startIndex + itemsPerPage;
       // return sortedVetor.slice(startIndex, endIndex);
    //};

    // Função para ordenar os dados ao clicar no cabeçalho da coluna
    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    // Função para obter as classes de estilo do cabeçalho da coluna ordenada
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    const renderSortIcon = (name) => {
        if (sortConfig.key === name) {
            if (sortConfig.direction === 'ascending') {
                return <i className="fas fa-sort-up"></i>;
            } else {
                return <i className="fas fa-sort-down"></i>;
            }
        }
        return <i className="fas fa-sort"></i>;
    };

    return (
        <div className='table-container'>
             <input
                type="text"
                className="form-control mb-3"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <table className="table">
            <thead>
                    <tr>
                        <th>#</th>
                        <th onClick={() => requestSort('nome')} className={getClassNamesFor('nome')}>
                            Nome {renderSortIcon('nome')}
                        </th>
                        <th onClick={() => requestSort('marca')} className={getClassNamesFor('marca')}>
                            Marca {renderSortIcon('marca')}
                        </th>
                        <th onClick={() => requestSort('price')} className={getClassNamesFor('price')}>
                            Preço {renderSortIcon('price')}
                        </th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {paginatedProdutos.map((obj, indice) => (
                        <tr key={indice}>
                            <td>{(currentPage - 1) * itemsPerPage + indice + 1}</td>
                            <td>{obj.nome}</td>
                            <td>{obj.marca}</td>
                            <td>{obj.price !== null ? obj.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '0'}</td>
                            <td><button onClick={() => {selecionar(indice)}} className="btn btn-success">Selecionar</button></td>
                            <td><button onClick={() => onAddToCart(obj)} className="btn btn-success">Adicionar ao Carrinho</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Controles de paginação */}
            <div className="pagination">
                <button
                    className="btn btn-link"
                    onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : currentPage)}
                    disabled={currentPage === 1}
                >
                    Anterior
                </button>
                <span className="page-number">{currentPage}</span>
                <button
                    className="btn btn-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Próxima
                </button>
            </div>
        </div>
    );
}

export default Tabela;
