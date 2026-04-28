import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { CarrinhoProvider } from '../context/CarrinhoContext';

function RootLayoutNav() {
  const { usuario } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';

    if (!usuario && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (usuario && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [usuario, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

// O Layout agora abraça o app com os DOIS provedores de estado
export default function Layout() {
  return (
    <AuthProvider>
      <CarrinhoProvider>
        <RootLayoutNav />
      </CarrinhoProvider>
    </AuthProvider>
  );
}