import { createContext, useState, useContext } from 'react';

const CarrinhoContext = createContext({});

export function CarrinhoProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);

  // Função para adicionar itens ao estado global
  const adicionarAoCarrinho = (item) => {
    setCarrinho((prevCarrinho) => [...prevCarrinho, item]);
  };

  // Função para limpar o carrinho após a compra
  const limparCarrinho = () => {
    setCarrinho([]);
  };

  return (
    <CarrinhoContext.Provider value={{ carrinho, setCarrinho, adicionarAoCarrinho, limparCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  );
}

// Hook customizado para facilitar a vida do resto do grupo
export function useCarrinho() {
  return useContext(CarrinhoContext);
}