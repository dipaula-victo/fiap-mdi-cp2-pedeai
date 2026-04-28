import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import OrderProgressBar from '../components/BarraProgressoPedido';
import CustomButton from '../components/BotaoCustomizado';
import { colors, spacing, radius, fontSize } from '../theme';

export default function Status() {
  const { total, horario } = useLocalSearchParams();
  const router = useRouter();

  const [tempo, setTempo] = useState(20);
  const [status, setStatus] = useState('Pedido recebido');

  // Contador regressivo
  useEffect(() => {
    const interval = setInterval(() => {
      setTempo((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Atualiza o status com base no tempo restante
  useEffect(() => {
    if (tempo > 15) {
      setStatus('Pedido recebido');
    } else if (tempo > 5) {
      setStatus('Preparando...');
    } else if (tempo > 0) {
      setStatus('Quase pronto...');
    } else {
      setStatus('Pronto para retirada!');
    }
  }, [tempo]);

  const pedidoPronto = tempo === 0;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Status do Pedido</Text>

      {/* Barra de progresso visual com as etapas */}
      <OrderProgressBar currentStatus={status} />

      <View style={styles.card}>
        <Text style={styles.info}>📍 Horário de retirada: {horario}</Text>
        <Text style={styles.info}>💰 Total: R$ {Number(total).toFixed(2)}</Text>

        <Text style={[styles.statusText, pedidoPronto && styles.statusPronto]}>
          {status}
        </Text>

        {/*
          FIX: O tempo estimado só aparece enquanto o pedido NÃO estiver pronto.
          Quando tempo === 0, este bloco é completamente removido do layout
          (conditional rendering, não apenas oculto), liberando espaço na tela.
        */}
        {!pedidoPronto && (
          <View style={styles.tempoContainer}>
            <Text style={styles.tempoLabel}>Tempo estimado</Text>
            <Text style={styles.tempo}>{tempo}s</Text>
          </View>
        )}

        {/* Mensagem de confirmação quando o pedido fica pronto */}
        {pedidoPronto && (
          <View style={styles.prontoContainer}>
            <Text style={styles.prontoIcon}>🎉</Text> 
          </View>
        )}
      </View>

      {/* Botão para voltar ao início só aparece quando o pedido fica pronto */}
      {pedidoPronto && (
        <CustomButton
          label="Fazer novo pedido"
          onPress={() => router.push('/')}
          style={styles.botaoNovoPedido}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.xl,
  },
  titulo: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
    marginTop: spacing.xl,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  info: {
    fontSize: fontSize.md,
    marginBottom: spacing.md,
    color: colors.dark,
  },
  statusText: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    marginTop: spacing.lg,
    color: colors.secondary,
    textAlign: 'center',
  },
  statusPronto: {
    color: colors.success,
    fontSize: fontSize.xl,
  },
  // Bloco do tempo estimado (some quando pronto)
  tempoContainer: {
    alignItems: 'center',
    marginTop: spacing.lg,
    backgroundColor: colors.background,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  tempoLabel: {
    fontSize: fontSize.sm + 1,
    color: '#888',
    marginBottom: spacing.xs,
  },
  tempo: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.primary,
  },
  // Mensagem de retirada (aparece quando pronto)
  prontoContainer: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  prontoIcon: {
    fontSize: 40,
    marginBottom: spacing.sm,
  },
  prontoMensagem: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.success,
    textAlign: 'center',
  },
  botaoNovoPedido: {
    marginTop: spacing.xl,
  },
});
