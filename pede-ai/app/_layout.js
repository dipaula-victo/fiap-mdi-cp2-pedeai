import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { AuthProvider, useAuth } from '../context/AuthContext';
import { CarrinhoProvider } from '../context/CarrinhoContext';

function RootLayoutNav() {
  const { usuario, carregando } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (carregando) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!usuario && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (usuario && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [usuario, carregando, segments]);

  if (carregando) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default function Layout() {
  return (
    <AuthProvider>
      <CarrinhoProvider>
        <RootLayoutNav />
      </CarrinhoProvider>
    </AuthProvider>
  );
}
