import { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import { router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { colors, spacing, radius, fontSize } from '../../constants/theme';

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erroLogin, setErroLogin] = useState('');
  const [erros, setErros] = useState({});
  const [loading, setLoading] = useState(false);

  function validarFormulario() {
    let novosErros = {};
    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(email)) {
      novosErros.email = 'Digite um e-mail válido';
    }

    if (senha.length < 6) {
      novosErros.senha = 'Senha incorreta';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  async function handleLogin() {
    setErroLogin('');
    if (!validarFormulario()) return;

    setLoading(true);
    try {
      await login(email.trim(), senha);
      router.replace('/(tabs)');
    } catch (error) {
      setErroLogin(error.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
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
        <Text style={styles.titulo}>Entrar na conta</Text>

        {erroLogin ? (
          <View style={styles.caixaErro}>
            <Text style={styles.erroLogin}>{erroLogin}</Text>
          </View>
        ) : null}

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

        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={{ marginTop: spacing.xl }}
          />
        ) : (
          <TouchableOpacity style={styles.botao} onPress={handleLogin}>
            <Text style={styles.botaoTexto}>Entrar</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => router.push('/(auth)/cadastro')}>
          <Text style={styles.link}>Não tenho conta — Cadastrar</Text>
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

  caixaErro: {
    backgroundColor: '#ffe5e5',
    borderWidth: 1,
    borderColor: '#ff4d4d',
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },

  erroLogin: {
    color: '#b00020',
    textAlign: 'center',
    fontWeight: 'bold',
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