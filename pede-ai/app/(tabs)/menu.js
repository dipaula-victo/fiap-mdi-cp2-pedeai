import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';

import { useRouter } from 'expo-router';

import ProductCard from '../../components/CardProduto';
import CustomButton from '../../components/BotaoCustomizado';

import {
  colors,
  spacing,
  fontSize,
  radius,
} from '../../constants/theme';

import { useAuth } from '../../context/AuthContext';
import { useCarrinho } from '../../context/CarrinhoContext';

const cardapio = [
  {
    id: '1',
    nome: 'Coxinha de Frango',
    descricao: 'Massa crocante com recheio',
    preco: 7.5,
    imagem: 'https://picsum.photos/seed/coxinha/100',
    disponivel: true,
  },
  {
    id: '2',
    nome: 'Pão de Queijo',
    descricao: 'Assado na hora',
    preco: 5,
    imagem: 'https://picsum.photos/seed/pao/100',
    disponivel: true,
  },
  {
    id: '3',
    nome: 'Suco de Laranja',
    descricao: 'Copo 500ml, natural sem açúcar',
    preco: 8,
    imagem: 'https://picsum.photos/seed/suco/100',
    disponivel: false,
  },
];

export default function Menu() {
  const router = useRouter();

  const { usuario, logout } = useAuth();

  const {
    carrinho,
    adicionarAoCarrinho,
  } = useCarrinho();

  const adicionar = (item) => {
    adicionarAoCarrinho(item);

    Alert.alert(
      'Produto adicionado',
      `${item.nome} foi para o carrinho`
    );
  };

  function handleLogout() {
    logout();
  }

  const itensDisponiveis = cardapio.filter(
    (item) => item.disponivel
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.titulo}>
            Cardápio
          </Text>

          <Text style={styles.usuario}>
            Olá, {usuario?.nome || 'Aluno'}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>

      {itensDisponiveis.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>
            🍽️
          </Text>

          <Text style={styles.emptyTitle}>
            Nenhum item disponível
          </Text>

          <Text style={styles.emptySubtitle}>
            A cantina ainda não atualizou o cardápio.
          </Text>
        </View>
      ) : (
        [...cardapio]
          .sort(
            (a, b) =>
              (b.disponivel ? 1 : 0) -
              (a.disponivel ? 1 : 0)
          )
          .map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              onAdd={adicionar}
            />
          ))
      )}

      <View style={styles.carrinhoWrapper}>
        <CustomButton
          label={
            carrinho.length === 0
              ? 'Carrinho vazio'
              : `Ir para Carrinho (${carrinho.length})`
          }
          variant="secondary"
          disabled={carrinho.length === 0}
          onPress={() => router.push('/cart')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    padding: spacing.xl,
    paddingBottom: spacing.xl * 2,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },

  titulo: {
    fontSize: fontSize.xxl,
    color: colors.primary,
    fontWeight: 'bold',
  },

  usuario: {
    color: '#666',
    marginTop: 4,
    fontSize: 14,
  },

  logoutButton: {
    backgroundColor: '#ff3b30',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: radius.md,
  },

  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xl * 2,
  },

  emptyIcon: {
    fontSize: 48,
    marginBottom: spacing.lg,
  },

  emptyTitle: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: spacing.sm,
  },

  emptySubtitle: {
    fontSize: fontSize.md,
    color: '#888',
    textAlign: 'center',
  },

  carrinhoWrapper: {
    marginTop: spacing.xl,
  },
});
