import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius, fontSize } from '../theme';

export default function BotaoCustomizado({ label, onPress, variant = 'primary', disabled = false, style }) {
  const bg = disabled
    ? colors.disabled
    : variant === 'secondary'
    ? colors.secondary
    : colors.primary;

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: bg }, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: spacing.lg,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fontSize.md,
    textAlign: 'center',
  },
});
