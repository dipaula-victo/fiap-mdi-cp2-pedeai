import { createContext, useState, useContext } from 'react';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  // Estado que guarda o usuário. Se for null, significa que ninguém está logado.
  const [usuario, setUsuario] = useState(null);

  // Função simulada de login. 
  // (O Membro 2 vai passar os dados do form pra cá, e o Membro 3 vai salvar no AsyncStorage)
  const login = (email) => {
    setUsuario({ email });
  };

  // Função de logout
  const logout = () => {
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook customizado para os outros membros usarem facilmente
export function useAuth() {
  return useContext(AuthContext);
}