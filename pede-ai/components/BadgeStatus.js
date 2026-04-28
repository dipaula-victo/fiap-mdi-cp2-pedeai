import { Text, StyleSheet } from 'react-native';
import { colors, fontSize } from '../theme';

export default function BadgeStatus({ available }) {
  return (
    <Text style={[styles.badge, available ? styles.available : styles.unavailable]}>
      {available ? 'Disponível' : 'Esgotado'}
    </Text>
  );
}

const styles = StyleSheet.create({
  badge: { fontSize: fontSize.sm, fontWeight: 'bold' },
  available: { color: colors.success },
  unavailable: { color: colors.disabledText },
});
