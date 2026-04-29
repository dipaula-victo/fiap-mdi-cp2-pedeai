import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

const USUARIO_LOGADO_KEY = '@pedeai:usuarioLogado';
const USUARIOS_KEY = '@pedeai:usuarios';

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarSessao() {
      try {
        const usuarioSalvo = await AsyncStorage.getItem(USUARIO_LOGADO_KEY);

        if (usuarioSalvo) {
          setUsuario(JSON.parse(usuarioSalvo));
        }
      } catch (error) {
        console.log('Erro ao carregar sessão:', error);
      } finally {
        setCarregando(false);
      }
    }

    carregarSessao();
  }, []);

  async function cadastrar(nome, email, senha) {
    const usuariosSalvos = await AsyncStorage.getItem(USUARIOS_KEY);
    const usuarios = usuariosSalvos ? JSON.parse(usuariosSalvos) : [];

    const emailJaExiste = usuarios.some(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (emailJaExiste) {
      throw new Error('Este e-mail já está cadastrado');
    }

    const novoUsuario = {
      id: Date.now().toString(),
      nome,
      email,
      senha,
    };

    const novosUsuarios = [...usuarios, novoUsuario];

    await AsyncStorage.setItem(USUARIOS_KEY, JSON.stringify(novosUsuarios));

    return novoUsuario;
  }

  async function login(email, senha) {
    const usuariosSalvos = await AsyncStorage.getItem(USUARIOS_KEY);
    const usuarios = usuariosSalvos ? JSON.parse(usuariosSalvos) : [];

    const usuarioExiste = usuarios.find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (!usuarioExiste) {
      throw new Error('Conta não encontrada. Faça seu cadastro primeiro.');
    }

    if (usuarioExiste.senha !== senha) {
      throw new Error('Senha incorreta.');
    }

    const usuarioLogado = {
      id: usuarioExiste.id,
      nome: usuarioExiste.nome,
      email: usuarioExiste.email,
    };

    setUsuario(usuarioLogado);

    await AsyncStorage.setItem(
      USUARIO_LOGADO_KEY,
      JSON.stringify(usuarioLogado)
    );

    return usuarioLogado;
  }

  async function logout() {
    setUsuario(null);
    await AsyncStorage.removeItem(USUARIO_LOGADO_KEY);
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        carregando,
        cadastrar,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
