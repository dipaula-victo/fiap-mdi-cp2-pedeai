import {
  createContext,
  useContext,
  useState,
} from 'react';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  // Usuário logado
  const [usuario, setUsuario] = useState(null);

  // Login
  function login(email) {
    setUsuario({
      email,
    });
  }

  // Logout
  function logout() {
    setUsuario(null);
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
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