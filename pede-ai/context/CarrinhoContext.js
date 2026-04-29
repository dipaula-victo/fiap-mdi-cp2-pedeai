import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

const CarrinhoContext = createContext({});

const CARRINHO_KEY = '@pedeai:carrinho';
const PEDIDOS_KEY = '@pedeai:pedidos';

export function CarrinhoProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [carregandoCarrinho, setCarregandoCarrinho] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const carrinhoSalvo = await AsyncStorage.getItem(CARRINHO_KEY);
        const pedidosSalvos = await AsyncStorage.getItem(PEDIDOS_KEY);

        if (carrinhoSalvo) {
          setCarrinho(JSON.parse(carrinhoSalvo));
        }

        if (pedidosSalvos) {
          setPedidos(JSON.parse(pedidosSalvos));
        }
      } catch (error) {
        console.log('Erro ao carregar carrinho/pedidos:', error);
      } finally {
        setCarregandoCarrinho(false);
      }
    }

    carregarDados();
  }, []);

  useEffect(() => {
    if (!carregandoCarrinho) {
      AsyncStorage.setItem(CARRINHO_KEY, JSON.stringify(carrinho));
    }
  }, [carrinho, carregandoCarrinho]);

  function adicionarAoCarrinho(item) {
    setCarrinho((prev) => [...prev, item]);
  }

  function removerDoCarrinho(id) {
    setCarrinho((prev) => prev.filter((item) => item.id !== id));
  }

  function limparCarrinho() {
    setCarrinho([]);
  }

  async function adicionarPedido(pedido) {
    const novoPedido = {
      ...pedido,
      id: Date.now().toString(),
      data: new Date().toLocaleString('pt-BR'),
    };

    const novosPedidos = [novoPedido, ...pedidos];

    setPedidos(novosPedidos);
    await AsyncStorage.setItem(PEDIDOS_KEY, JSON.stringify(novosPedidos));

    return novoPedido;
  }

  const total = carrinho.reduce((acc, item) => acc + item.preco, 0);

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        setCarrinho,
        pedidos,
        carregandoCarrinho,
        adicionarAoCarrinho,
        removerDoCarrinho,
        limparCarrinho,
        adicionarPedido,
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
