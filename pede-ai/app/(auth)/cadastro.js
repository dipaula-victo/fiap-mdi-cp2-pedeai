import { useState } from 'react';

import {
  View,
  Text,
 TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { router } from 'expo-router';

export default function Cadastro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] =
    useState('');

  const [erros, setErros] = useState({});

  function validarFormulario() {
    let novosErros = {};

    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(email)) {
      novosErros.email =
        'Digite um e-mail válido';
    }

    if (senha.length < 6) {
      novosErros.senha =
        'A senha deve ter no mínimo 6 caracteres';
    }

    if (senha !== confirmarSenha) {
      novosErros.confirmarSenha =
        'As senhas não coincidem';
    }

    setErros(novosErros);

    return Object.keys(novosErros).length === 0;
  }

  function handleCadastro() {
    if (!validarFormulario()) return;


    router.replace('/(auth)/login');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Cadastro
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

      <TextInput
        placeholder="Confirme sua senha"
        secureTextEntry
        style={styles.input}
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />

      {erros.confirmarSenha && (
        <Text style={styles.erro}>
          {erros.confirmarSenha}
        </Text>
      )}

      <TouchableOpacity
        style={styles.botao}
        onPress={handleCadastro}
      >
        <Text style={styles.botaoTexto}>
          Cadastrar
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
});