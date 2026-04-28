import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from '../context/AuthContext';

// Componente interno que lida com a lógica de redirecionamento
function RootLayoutNav() {
  const { usuario } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Verifica se a primeira pasta da rota atual é a (auth)
    const inAuthGroup = segments[0] === 'auth';

    if (!usuario && !inAuthGroup) {
      // Se NÃO tem usuário e NÃO está na tela de login, expulsa para o login
      router.replace('/auth/login');
    } else if (usuario && inAuthGroup) {
      // Se TEM usuário e tentou voltar pra tela de login, manda pro app principal
      router.replace('/tabs'); // Assumindo que seu index.js antigo virou (tabs)/index.js
    }
  }, [usuario, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="auth" />
      <Stack.Screen name="tabs" />
    </Stack>
  );
}

// O _layout principal apenas envelopa tudo com o Provider
export default function Layout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}