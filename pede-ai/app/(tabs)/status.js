import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import OrderProgressBar from '../../components/BarraProgressoPedido';
import CustomButton from '../../components/BotaoCustomizado';

import { spacing, radius, fontSize } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

export default function Status() {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const { total, horario } = useLocalSearchParams();
  const router = useRouter();

  const [tempo, setTempo] = useState(20);
  const [status, setStatus] = useState('Pedido recebido');

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

      <OrderProgressBar currentStatus={status} />

      <View style={styles.card}>
        <Text style={styles.info}>📍 Horário de retirada: {horario}</Text>
        <Text style={styles.info}>💰 Total: R$ {Number(total).toFixed(2)}</Text>

        <Text style={[styles.statusText, pedidoPronto && styles.statusPronto]}>
          {status}
        </Text>

        {!pedidoPronto && (
          <View style={styles.tempoContainer}>
            <Text style={styles.tempoLabel}>Tempo estimado</Text>
            <Text style={styles.tempo}>{tempo}s</Text>
          </View>
        )}

        {pedidoPronto && (
          <View style={styles.prontoContainer}>
            <Text style={styles.prontoIcon}>🎉</Text>
          </View>
        )}
      </View>

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

const createStyles = (colors) =>
  StyleSheet.create({
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
      backgroundColor: colors.surface,
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
      color: colors.textPrimary,
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

    tempoContainer: {
      alignItems: 'center',
      marginTop: spacing.lg,
      backgroundColor: colors.background,
      borderRadius: radius.md,
      padding: spacing.md,
    },

    tempoLabel: {
      fontSize: fontSize.sm + 1,
      color: colors.textSecondary,
      marginBottom: spacing.xs,
    },

    tempo: {
      fontSize: 40,
      fontWeight: 'bold',
      color: colors.primary,
    },

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