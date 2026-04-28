import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

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
    backgroundColor: '#f6f5ff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#3d13f6',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 16,
    color: '#08011e',
    marginBottom: 30,
  },
  botao: {
    backgroundColor: '#3d13f6',
    padding: 15,
    borderRadius: 10,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
});