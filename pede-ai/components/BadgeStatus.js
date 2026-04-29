import { Text, StyleSheet } from 'react-native';

import { fontSize } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';

export default function BadgeStatus({ available }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <Text
      style={[
        styles.badge,
        available ? styles.available : styles.unavailable,
      ]}
    >
      {available ? 'Disponível' : 'Esgotado'}
    </Text>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    badge: {
      fontSize: fontSize.sm,
      fontWeight: 'bold',
    },

    available: {
      color: colors.success,
    },

    unavailable: {
      color: colors.error,
    },
  });