import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import CustomButton from '../components/BotaoCustomizado';
import { colors, spacing, radius, fontSize } from '../theme';

export default function Cart() {
  const { carrinho } = useLocalSearchParams();
  const router = useRouter();

  const inicial = carrinho ? JSON.parse(carrinho) : [];

  const agruparItens = (lista) => {
    const mapa = {};
    lista.forEach((item) => {
      if (mapa[item.nome]) {
        mapa[item.nome].quantidade += 1;
      } else {
        mapa[item.nome] = { ...item, quantidade: 1, observacao: '' };
      }
    });
    return Object.values(mapa);
  };

  const [itens, setItens] = useState(agruparItens(inicial));
  const [horario, setHorario] = useState('');
  const [pagamento, setPagamento] = useState('');

  const total = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  const aumentar = (index) => {
    const novo = [...itens];
    novo[index] = { ...novo[index], quantidade: novo[index].quantidade + 1 };
    setItens(novo);
  };

  const diminuir = (index) => {
    const novo = [...itens];
    if (novo[index].quantidade > 1) {
      novo[index] = { ...novo[index], quantidade: novo[index].quantidade - 1 };
    } else {
      novo.splice(index, 1);
    }
    setItens(novo);
  };

  // Atualiza o campo de observação de um item específico
  const atualizarObservacao = (index, texto) => {
    const novo = [...itens];
    novo[index] = { ...novo[index], observacao: texto };
    setItens(novo);
  };

  const finalizarPedido = () => {
    if (itens.length === 0) {
      Alert.alert('Erro', 'Carrinho vazio');
      return;
    }
    if (!horario || !pagamento) {
      Alert.alert('Erro', 'Preencha horário e pagamento');
      return;
    }
    router.push({
      pathname: '/status',
      params: { total, horario },
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>Carrinho</Text>

      {itens.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🛒</Text>
          <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
        </View>
      ) : (
        itens.map((item, index) => (
          <View key={index} style={styles.itemCard}>
            <Text style={styles.itemNome}>{item.nome}</Text>
            <Text style={styles.itemPreco}>R$ {item.preco.toFixed(2)} cada</Text>

            {/* Controle de quantidade */}
            <View style={styles.quantidadeRow}>
              <TouchableOpacity onPress={() => diminuir(index)} style={styles.qtdBtn}>
                <Text style={styles.qtdBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qtdTexto}>x{item.quantidade}</Text>
              <TouchableOpacity onPress={() => aumentar(index)} style={styles.qtdBtn}>
                <Text style={styles.qtdBtnText}>+</Text>
              </TouchableOpacity>
              <Text style={styles.subtotal}>
                = R$ {(item.preco * item.quantidade).toFixed(2)}
              </Text>
            </View>

            {/* Campo de observações por item */}
            <TextInput
              style={styles.observacaoInput}
              placeholder="Alguma observação? (ex: sem cebola)"
              placeholderTextColor="#aaa"
              value={item.observacao}
              onChangeText={(texto) => atualizarObservacao(index, texto)}
              maxLength={100}
            />
          </View>
        ))
      )}

      <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>

      {/* Seleção de horário */}
      <Text style={styles.label}>Horário de retirada:</Text>
      <View style={styles.opcoes}>
        {['12:00', '12:30', '13:00'].map((h) => (
          <TouchableOpacity
            key={h}
            style={[styles.opcao, horario === h && styles.opcaoSelecionada]}
            onPress={() => setHorario(h)}
          >
            <Text style={[styles.opcaoText, horario === h && styles.opcaoTextSelecionada]}>
              {h}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Seleção de pagamento */}
      <Text style={styles.label}>Forma de pagamento:</Text>
      <View style={styles.opcoes}>
        {['Pix', 'Cartão', 'Dinheiro'].map((p) => (
          <TouchableOpacity
            key={p}
            style={[styles.opcao, pagamento === p && styles.opcaoSelecionada]}
            onPress={() => setPagamento(p)}
          >
            <Text style={[styles.opcaoText, pagamento === p && styles.opcaoTextSelecionada]}>
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
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: spacing.xl,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xl * 2,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: spacing.md,
  },
  emptyText: {
    fontSize: fontSize.md,
    color: '#888',
  },
  itemCard: {
    backgroundColor: colors.white,
    padding: spacing.md + 2,
    marginBottom: spacing.md,
    borderRadius: radius.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  itemNome: {
    fontWeight: 'bold',
    fontSize: fontSize.md,
    color: colors.dark,
  },
  itemPreco: {
    color: '#888',
    fontSize: fontSize.sm + 1,
    marginBottom: spacing.sm,
  },
  quantidadeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  qtdBtn: {
    backgroundColor: colors.qtdBg,
    width: 30,
    height: 30,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtdBtnText: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.dark,
  },
  qtdTexto: {
    marginHorizontal: spacing.md,
    fontWeight: 'bold',
    fontSize: fontSize.md,
    minWidth: 28,
    textAlign: 'center',
  },
  subtotal: {
    marginLeft: spacing.sm,
    color: colors.secondary,
    fontWeight: 'bold',
  },
  // Campo de observação
  observacaoInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: radius.sm,
    padding: spacing.sm,
    fontSize: fontSize.sm + 1,
    color: colors.dark,
    backgroundColor: '#fafafa',
    marginTop: spacing.xs,
  },
  total: {
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
    fontWeight: 'bold',
    fontSize: fontSize.lg,
    color: colors.dark,
  },
  label: {
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    fontWeight: 'bold',
    color: colors.dark,
  },
  opcoes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  opcao: {
    backgroundColor: colors.optionBg,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md + 2,
    borderRadius: radius.md,
  },
  opcaoSelecionada: {
    backgroundColor: colors.primary,
  },
  opcaoText: {
    color: colors.dark,
    fontWeight: '500',
  },
  opcaoTextSelecionada: {
    color: colors.white,
    fontWeight: 'bold',
  },
  botaoFinalizar: {
    marginTop: spacing.xl,
  },
});
