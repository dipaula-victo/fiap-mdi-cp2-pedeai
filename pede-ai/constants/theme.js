// theme.js
// Centraliza todas as cores, fontes e espaçamentos do app.
// Importe este arquivo em qualquer tela ou componente que precisar de estilos.

export const colors = {
  primary: '#3d13f6',       // Roxo principal — botões, títulos
  secondary: '#f769b2',     // Rosa — preço, botão carrinho
  background: '#f6f5ff',    // Fundo geral das telas
  white: '#ffffff',
  dark: '#08011e',          // Texto escuro
  success: '#6ad408',       // Verde — item disponível
  disabled: '#cccccc',      // Cinza — item esgotado / botão desativado
  disabledText: '#d3d3d3',
  cardBg: '#ffffff',
  optionBg: '#dddddd',
  qtdBg: '#dddddd',
};

export const spacing = {
  xs: 5,
  sm: 8,
  md: 10,
  lg: 15,
  xl: 20,
  xxl: 30,
};

export const radius = {
  sm: 5,
  md: 8,
  lg: 10,
  xl: 12,
};

export const fontSize = {
  sm: 12,
  md: 16,
  lg: 18,
  xl: 24,
  xxl: 28,
  xxxl: 36,
};
