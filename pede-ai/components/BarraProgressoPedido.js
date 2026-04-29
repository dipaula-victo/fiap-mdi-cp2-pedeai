import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, fontSize } from '../constants/theme';

const ETAPAS = [
  { key: 'Pedido recebido', label: 'Recebido' },
  { key: 'Preparando...', label: 'Preparando' },
  { key: 'Quase pronto...', label: 'Quase pronto' },
  { key: 'Pronto para retirada!', label: 'Pronto! ✓' },
];

export default function BarraProgressoPedido({ currentStatus }) {
  const currentIndex = ETAPAS.findIndex((e) => e.key === currentStatus);

  return (
    <View style={styles.container}>
      {ETAPAS.map((etapa, index) => {
        const isDone = index < currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <View key={etapa.key} style={styles.stepWrapper}>
            {index > 0 && (
              <View style={[styles.connector, (isDone || isCurrent) && styles.connectorActive]} />
            )}
            <View style={[styles.circle, isDone && styles.circleDone, isCurrent && styles.circleCurrent]}>
              <Text style={styles.circleText}>{isDone ? '✓' : index + 1}</Text>
            </View>
            <Text style={[styles.label, isCurrent && styles.labelCurrent, isDone && styles.labelDone]}>
              {etapa.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xs,
  },
  stepWrapper: {
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  connector: {
    position: 'absolute',
    top: 14,
    right: '50%',
    left: '-50%',
    height: 2,
    backgroundColor: colors.border,
    zIndex: 0,
  },
  connectorActive: {
    backgroundColor: colors.primary,
  },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.disabled,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  circleDone: {
    backgroundColor: colors.primaryDark,
  },
  circleCurrent: {
    backgroundColor: colors.primary,
  },
  circleText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: fontSize.sm,
  },
  label: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  labelCurrent: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  labelDone: {
    color: colors.primaryDark,
  },
});
