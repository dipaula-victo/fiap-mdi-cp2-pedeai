import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { colors } from '../../constants/theme';

export default function Login() {
  const { login } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Login Pede Aí</Text>
      
      {/* Botão provisório que força o login para você poder testar */}
      <TouchableOpacity 
        style={styles.botao} 
        onPress={() => login('aluno@fiap.com.br')}
      >
        <Text style={styles.textoBotao}>Entrar (Mock)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f6f5ff' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: colors?.primary || '#3d13f6' },
  botao: { backgroundColor: colors?.primary || '#3d13f6', padding: 15, borderRadius: 8 },
  textoBotao: { color: '#fff', fontWeight: 'bold' }
});