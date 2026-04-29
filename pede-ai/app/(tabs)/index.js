import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import { spacing, radius, fontSize } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

export default function Home() {
  const { colors, darkMode, toggleTheme } = useTheme();
  const styles = createStyles(colors);

  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Theme Button */}
      <TouchableOpacity
        style={styles.themeButton}
        onPress={toggleTheme}
      >
        <Text style={styles.themeIcon}>
          {darkMode ? '☀️' : '🌙'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.titulo}>Pede Aí</Text>

      <Text style={styles.subtitulo}>
        Peça seu lanche sem enfrentar filas
      </Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => router.push('/menu')}
      >
        <Text style={styles.textoBotao}>Ver Cardápio</Text>
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing.xl,
    },

    themeButton: {
      position: 'absolute',
      top: 60,
      right: 20,
      width: 45,
      height: 45,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },

    themeIcon: {
      fontSize: 22,
    },

    titulo: {
      fontSize: 36,
      fontWeight: 'bold',
      color: colors.primary,
      marginBottom: spacing.sm,
    },

    subtitulo: {
      fontSize: fontSize.lg,
      color: colors.textSecondary,
      marginBottom: spacing.xxl,
      textAlign: 'center',
    },

    botao: {
      backgroundColor: colors.primary,
      padding: spacing.lg,
      borderRadius: radius.md,
    },

    textoBotao: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: fontSize.md,
    },
  });