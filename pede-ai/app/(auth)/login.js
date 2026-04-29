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
  const [erroLogin, setErroLogin] = useState('');
  const [erros, setErros] = useState({});

  function validarFormulario() {
    let novosErros = {};
    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(email)) {
      novosErros.email = 'Digite um e-mail válido';
    }

    if (senha.length < 6) {
      novosErros.senha = 'A senha deve ter no mínimo 6 caracteres';
    }

    setErros(novosErros);

    return Object.keys(novosErros).length === 0;
  }

  async function handleLogin() {
    setErroLogin('');

    if (!validarFormulario()) return;

    try {
      await login(email.trim(), senha);

      router.replace('/(tabs)');
    } catch (error) {
      setErroLogin(error.message || 'Erro ao fazer login');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Login</Text>

      {erroLogin ? (
        <View style={styles.caixaErro}>
          <Text style={styles.erroLogin}>
            {erroLogin}
          </Text>
        </View>
      ) : null}

      <TextInput
        placeholder="Digite seu e-mail"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      {erros.email && <Text style={styles.erro}>{erros.email}</Text>}

      <TextInput
        placeholder="Digite sua senha"
        secureTextEntry
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
      />

      {erros.senha && <Text style={styles.erro}>{erros.senha}</Text>}

      <TouchableOpacity
        style={styles.botao}
        onPress={handleLogin}
      >
        <Text style={styles.botaoTexto}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push('/(auth)/cadastro')}
      >
        <Text style={styles.link}>Criar conta</Text>
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

  caixaErro: {
    backgroundColor: '#ffe5e5',
    borderWidth: 1,
    borderColor: '#ff4d4d',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },

  erroLogin: {
    color: '#b00020',
    textAlign: 'center',
    fontWeight: 'bold',
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
