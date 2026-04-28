import {
  createContext,
  useContext,
  useState,
} from 'react';

const CarrinhoContext = createContext({});

export function CarrinhoProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);

  // Adicionar item
  function adicionarAoCarrinho(item) {
    setCarrinho((prev) => [...prev, item]);
  }

  // Remover item
  function removerDoCarrinho(id) {
    setCarrinho((prev) =>
      prev.filter((item) => item.id !== id)
    );
  }

  // Limpar carrinho
  function limparCarrinho() {
    setCarrinho([]);
  }

  // Total do carrinho
  const total = carrinho.reduce(
    (acc, item) => acc + item.preco,
    0
  );

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        setCarrinho,
        adicionarAoCarrinho,
        removerDoCarrinho,
        limparCarrinho,
        total,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  return useContext(CarrinhoContext);
}