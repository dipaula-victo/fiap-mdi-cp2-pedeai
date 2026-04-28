import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import ProductCard from '../components/CardProduto';
import CustomButton from '../components/BotaoCustomizado';
import { colors, spacing, fontSize, radius } from '../theme';

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
  const [carrinho, setCarrinho] = useState([]);
  const router = useRouter();

  const adicionar = (item) => {
    setCarrinho([...carrinho, item]);
    Alert.alert('Adicionado!', item.nome);
  };

  const itensDisponiveis = cardapio.filter((i) => i.disponivel);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>Cardápio</Text>

      {/* Estado vazio: nenhum item disponível no momento */}
      {itensDisponiveis.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🍽️</Text>
          <Text style={styles.emptyTitle}>Nenhum item disponível</Text>
          <Text style={styles.emptySubtitle}>
            A cantina ainda não atualizou o cardápio. Tente novamente em breve.
          </Text>
        </View>
      ) : (
        // Exibe todos os itens (disponíveis primeiro, esgotados por último)
        [...cardapio]
          .sort((a, b) => (b.disponivel ? 1 : 0) - (a.disponivel ? 1 : 0))
          .map((item) => (
            <ProductCard key={item.id} item={item} onAdd={adicionar} />
          ))
      )}

      {/* Botão do carrinho com badge de quantidade */}
      <View style={styles.carrinhoWrapper}>

        <CustomButton
          label={
            carrinho.length === 0
              ? 'Carrinho vazio'
              : `Ir para Carrinho (${carrinho.length})`
          }
          variant="secondary"
          disabled={carrinho.length === 0}
          onPress={() =>
            router.push({
              pathname: '/cart',
              params: { carrinho: JSON.stringify(carrinho) },
            })
          }
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
  titulo: {
    fontSize: fontSize.xxl,
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: spacing.xl,
  },
  // Estado vazio
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
  // Badge de quantidade no botão do carrinho
  carrinhoWrapper: {
    position: 'relative',
    marginTop: spacing.xl,
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: colors.primary,
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  badgeText: {
    color: colors.white,
    fontSize: fontSize.sm,
    fontWeight: 'bold',
  },
});
