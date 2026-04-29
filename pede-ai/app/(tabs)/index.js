import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing, radius, fontSize } from '../../constants/theme';

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
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