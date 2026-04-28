import { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { router } from 'expo-router';

import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [erros, setErros] = useState({});

  function validarFormulario() {
    let novosErros = {};

    // Regex de email
    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(email)) {
      novosErros.email =
        'Digite um e-mail válido';
    }

    if (senha.length < 6) {
      novosErros.senha =
        'A senha deve ter no mínimo 6 caracteres';
    }

    setErros(novosErros);

    return Object.keys(novosErros).length === 0;
  }

  function handleLogin() {
    if (!validarFormulario()) return;

    // Login no Context
    login(email);

    // Navegação protegida já fará o redirect
    router.replace('/(tabs)');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Login
      </Text>

      <TextInput
        placeholder="Digite seu e-mail"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      {erros.email && (
        <Text style={styles.erro}>
          {erros.email}
        </Text>
      )}

      <TextInput
        placeholder="Digite sua senha"
        secureTextEntry
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
      />

      {erros.senha && (
        <Text style={styles.erro}>
          {erros.senha}
        </Text>
      )}

      <TouchableOpacity
        style={styles.botao}
        onPress={handleLogin}
      >
        <Text style={styles.botaoTexto}>
          Entrar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          router.push('/(auth)/cadastro')
        }
      >
        <Text style={styles.link}>
          Criar conta
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },

  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 14,
    marginTop: 12,
  },

  erro: {
    color: 'red',
    marginTop: 5,
    marginLeft: 3,
  },

  botao: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    marginTop: 25,
  },

  botaoTexto: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },

  link: {
    marginTop: 20,
    textAlign: 'center',
    color: '#007AFF',
    fontWeight: '600',
  },
});