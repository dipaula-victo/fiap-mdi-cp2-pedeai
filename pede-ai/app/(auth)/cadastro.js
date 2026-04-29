import { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';

import { router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { colors, spacing, radius, fontSize } from '../../constants/theme';

export default function Cadastro() {
  const { cadastrar } = useAuth();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erros, setErros] = useState({});

  function validarFormulario() {
    let novosErros = {};
    const emailRegex = /\S+@\S+\.\S+/;

    if (nome.trim().length < 3) {
      novosErros.nome = 'Digite seu nome completo';
    }

    if (!emailRegex.test(email)) {
      novosErros.email = 'Digite um e-mail válido';
    }

    if (senha.length < 6) {
      novosErros.senha = 'A senha deve ter no mínimo 6 caracteres';
    }

    if (senha !== confirmarSenha) {
      novosErros.confirmarSenha = 'As senhas não coincidem';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  async function handleCadastro() {
    if (!validarFormulario()) return;

    try {
      await cadastrar(nome.trim(), email.trim(), senha);

      Alert.alert('Cadastro realizado!', 'Agora faça login com sua conta.');
      router.replace('/(auth)/login');
    } catch (error) {
      Alert.alert('Erro no cadastro', error.message);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.marca}>PedeAí</Text>
        <Text style={styles.titulo}>Criar conta</Text>

        <TextInput
          placeholder="Digite seu nome"
          placeholderTextColor={colors.textSecondary}
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />
        {erros.nome && <Text style={styles.erro}>{erros.nome}</Text>}

        <TextInput
          placeholder="Digite seu e-mail"
          placeholderTextColor={colors.textSecondary}
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        {erros.email && <Text style={styles.erro}>{erros.email}</Text>}

        <TextInput
          placeholder="Digite sua senha"
          placeholderTextColor={colors.textSecondary}
          secureTextEntry
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
        />
        {erros.senha && <Text style={styles.erro}>{erros.senha}</Text>}

        <TextInput
          placeholder="Confirme sua senha"
          placeholderTextColor={colors.textSecondary}
          secureTextEntry
          style={styles.input}
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />
        {erros.confirmarSenha && (
          <Text style={styles.erro}>{erros.confirmarSenha}</Text>
        )}

        <TouchableOpacity style={styles.botao} onPress={handleCadastro}>
          <Text style={styles.botaoTexto}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
          <Text style={styles.link}>Já tenho conta — Entrar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.xl,
    backgroundColor: colors.background,
  },

  marca: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },

  titulo: {
    fontSize: fontSize.lg,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xxl,
  },

  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginTop: spacing.md,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    backgroundColor: colors.surface,
  },

  erro: {
    color: colors.error,
    marginTop: spacing.xs,
    marginLeft: spacing.xs,
    fontSize: fontSize.sm,
  },

  botao: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    borderRadius: radius.md,
    marginTop: spacing.xl,
  },

  botaoTexto: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: fontSize.lg,
  },

  link: {
    marginTop: spacing.xl,
    textAlign: 'center',
    color: colors.primary,
    fontWeight: '600',
    fontSize: fontSize.md,
  },
});