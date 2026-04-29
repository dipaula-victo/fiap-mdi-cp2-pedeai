import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
} from 'react-native';

import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import CustomButton from '../../components/BotaoCustomizado';
import { spacing, radius, fontSize } from '../../constants/theme';
import { useCarrinho } from '../../context/CarrinhoContext';
import { useTheme } from '../../context/ThemeContext';

export default function Cart() {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const router = useRouter();

  const {
    carrinho,
    setCarrinho,
    limparCarrinho,
    adicionarPedido,
  } = useCarrinho();

  const agruparItens = (lista) => {
    const mapa = {};

    lista.forEach((item) => {
      if (mapa[item.nome]) {
        mapa[item.nome].quantidade += 1;
      } else {
        mapa[item.nome] = {
          ...item,
          quantidade: 1,
          observacao: item.observacao || '',
        };
      }
    });

    return Object.values(mapa);
  };

  const expandirItensParaCarrinho = (lista) => {
    return lista.flatMap((item) => {
      const itensIndividuais = [];

      for (let i = 0; i < item.quantidade; i++) {
        itensIndividuais.push({
          id: item.id,
          nome: item.nome,
          descricao: item.descricao,
          preco: item.preco,
          imagem: item.imagem,
          disponivel: item.disponivel,
          observacao: item.observacao,
        });
      }

      return itensIndividuais;
    });
  };

  const [itens, setItens] = useState(agruparItens(carrinho));
  const [horario, setHorario] = useState('');
  const [pagamento, setPagamento] = useState('');

  useEffect(() => {
    setItens(agruparItens(carrinho));
  }, [carrinho.length]);

  const total = itens.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  const atualizarItensECarrinho = (novosItens) => {
    setItens(novosItens);
    setCarrinho(expandirItensParaCarrinho(novosItens));
  };

  const aumentar = (index) => {
    const novo = [...itens];

    novo[index] = {
      ...novo[index],
      quantidade: novo[index].quantidade + 1,
    };

    atualizarItensECarrinho(novo);
  };

  const diminuir = (index) => {
    const novo = [...itens];

    if (novo[index].quantidade > 1) {
      novo[index] = {
        ...novo[index],
        quantidade: novo[index].quantidade - 1,
      };
    } else {
      novo.splice(index, 1);
    }

    atualizarItensECarrinho(novo);
  };

  const atualizarObservacao = (index, texto) => {
    const novo = [...itens];

    novo[index] = {
      ...novo[index],
      observacao: texto,
    };

    atualizarItensECarrinho(novo);
  };

  const finalizarPedido = async () => {
    if (itens.length === 0) {
      Alert.alert('Erro', 'Carrinho vazio');
      return;
    }

    if (!horario || !pagamento) {
      Alert.alert('Erro', 'Preencha horário e pagamento');
      return;
    }

    await adicionarPedido({
      itens,
      total,
      horario,
      pagamento,
    });

    limparCarrinho();

    router.push({
      pathname: '/status',
      params: { total, horario },
    });
  };

  if (itens.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🛒</Text>
        <Text style={styles.emptyTitle}>Seu carrinho está vazio</Text>
        <Text style={styles.emptySubtitle}>
          Adicione itens do cardápio para continuar
        </Text>

        <TouchableOpacity
          style={styles.emptyButton}
          onPress={() => router.push('/menu')}
        >
          <Text style={styles.emptyButtonText}>Ver Cardápio</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.titulo}>Carrinho</Text>

      {itens.map((item, index) => (
        <View key={index} style={styles.itemCard}>
          <Text style={styles.itemNome}>{item.nome}</Text>

          <Text style={styles.itemPreco}>
            R$ {item.preco.toFixed(2)} cada
          </Text>

          <View style={styles.quantidadeRow}>
            <TouchableOpacity
              onPress={() => diminuir(index)}
              style={styles.qtdBtn}
            >
              <Text style={styles.qtdBtnText}>−</Text>
            </TouchableOpacity>

            <Text style={styles.qtdTexto}>x{item.quantidade}</Text>

            <TouchableOpacity
              onPress={() => aumentar(index)}
              style={styles.qtdBtn}
            >
              <Text style={styles.qtdBtnText}>+</Text>
            </TouchableOpacity>

            <Text style={styles.subtotal}>
              = R$ {(item.preco * item.quantidade).toFixed(2)}
            </Text>
          </View>

          <TextInput
            style={styles.observacaoInput}
            placeholder="Alguma observação? (ex: sem cebola)"
            placeholderTextColor={colors.textSecondary}
            value={item.observacao}
            onChangeText={(texto) => atualizarObservacao(index, texto)}
            maxLength={100}
          />
        </View>
      ))}

      <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>

      <Text style={styles.label}>Horário de retirada:</Text>

      <View style={styles.opcoes}>
        {['12:00', '12:30', '13:00'].map((h) => (
          <TouchableOpacity
            key={h}
            style={[
              styles.opcao,
              horario === h && styles.opcaoSelecionada,
            ]}
            onPress={() => setHorario(h)}
          >
            <Text
              style={[
                styles.opcaoText,
                horario === h && styles.opcaoTextSelecionada,
              ]}
            >
              {h}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Forma de pagamento:</Text>

      <View style={styles.opcoes}>
        {['Pix', 'Cartão', 'Dinheiro'].map((p) => (
          <TouchableOpacity
            key={p}
            style={[
              styles.opcao,
              pagamento === p && styles.opcaoSelecionada,
            ]}
            onPress={() => setPagamento(p)}
          >
            <Text
              style={[
                styles.opcaoText,
                pagamento === p && styles.opcaoTextSelecionada,
              ]}
            >
              {p}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <CustomButton
        label="Finalizar Pedido"
        onPress={finalizarPedido}
        style={styles.botaoFinalizar}
      />
    </ScrollView>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
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
      fontWeight: 'bold',
      color: colors.primary,
      marginBottom: spacing.xl,
    },

    emptyContainer: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      padding: spacing.xl,
    },

    emptyIcon: {
      fontSize: 64,
      marginBottom: spacing.lg,
    },

    emptyTitle: {
      fontSize: fontSize.xl,
      fontWeight: 'bold',
      color: colors.primary,
      marginBottom: spacing.sm,
    },

    emptySubtitle: {
      fontSize: fontSize.md,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: spacing.xxl,
    },

    emptyButton: {
      backgroundColor: colors.primary,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xxl,
      borderRadius: radius.md,
    },

    emptyButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: fontSize.md,
    },

    itemCard: {
      backgroundColor: colors.surface,
      padding: spacing.md + 2,
      marginBottom: spacing.md,
      borderRadius: radius.md,
    },

    itemNome: {
      fontWeight: 'bold',
      fontSize: fontSize.md,
      color: colors.textPrimary,
    },

    itemPreco: {
      color: colors.textSecondary,
      fontSize: fontSize.sm + 1,
      marginBottom: spacing.sm,
    },

    quantidadeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },

    qtdBtn: {
      backgroundColor: colors.border,
      width: 30,
      height: 30,
      borderRadius: radius.sm,
      alignItems: 'center',
      justifyContent: 'center',
    },

    qtdBtnText: {
      fontSize: fontSize.lg,
      fontWeight: 'bold',
      color: colors.textPrimary,
    },

    qtdTexto: {
      marginHorizontal: spacing.md,
      fontWeight: 'bold',
      fontSize: fontSize.md,
      minWidth: 28,
      textAlign: 'center',
      color: colors.textPrimary,
    },

    subtotal: {
      marginLeft: spacing.sm,
      color: colors.secondary,
      fontWeight: 'bold',
    },

    observacaoInput: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radius.sm,
      padding: spacing.sm,
      fontSize: fontSize.sm + 1,
      color: colors.textPrimary,
      backgroundColor: colors.surface,
      marginTop: spacing.xs,
    },

    total: {
      marginTop: spacing.xl,
      marginBottom: spacing.sm,
      fontWeight: 'bold',
      fontSize: fontSize.lg,
      color: colors.textPrimary,
    },

    label: {
      marginTop: spacing.lg,
      marginBottom: spacing.sm,
      fontWeight: 'bold',
      color: colors.textPrimary,
    },

    opcoes: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
    },

    opcao: {
      backgroundColor: colors.border,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md + 2,
      borderRadius: radius.md,
    },

    opcaoSelecionada: {
      backgroundColor: colors.primary,
    },

    opcaoText: {
      color: colors.textPrimary,
      fontWeight: '500',
    },

    opcaoTextSelecionada: {
      color: '#fff',
      fontWeight: 'bold',
    },

    botaoFinalizar: {
      marginTop: spacing.xl,
    },
  });