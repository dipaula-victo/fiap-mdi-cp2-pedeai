import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, fontSize } from '../theme';

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
    paddingVertical: 15,
    paddingHorizontal: 5,
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
    backgroundColor: '#ccc',
    zIndex: 0,
  },
  connectorActive: {
    backgroundColor: '#3d13f6',
  },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  circleDone: {
    backgroundColor: '#6ad408',
  },
  circleCurrent: {
    backgroundColor: '#3d13f6',
  },
  circleText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  label: {
    fontSize: 10,
    color: '#999',
    marginTop: 5,
    textAlign: 'center',
  },
  labelCurrent: {
    color: '#3d13f6',
    fontWeight: 'bold',
  },
  labelDone: {
    color: '#6ad408',
  },
});
