import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import BadgeStatus from './BadgeStatus';

import { spacing, radius, fontSize } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';

export default function CardProduto({ item, onAdd }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.card}>
      <Image source={item.imagem} style={styles.image} />

      <View style={{ flex: 1 }}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.descricao}>{item.descricao}</Text>

        <View style={styles.linha}>
          <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
          <BadgeStatus available={item.disponivel} />
        </View>

        <TouchableOpacity
          style={[styles.botao, !item.disponivel && styles.botaoDesativado]}
          disabled={!item.disponivel}
          onPress={() => onAdd(item)}
        >
          <Text style={styles.textoBotao}>
            {item.disponivel ? 'Adicionar' : 'Indisponível'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      padding: spacing.md,
      marginBottom: spacing.md,
      borderRadius: radius.md,
    },

    image: {
      width: 80,
      height: 80,
      marginRight: spacing.md,
    },

    nome: {
      fontWeight: 'bold',
      color: colors.textPrimary,
      fontSize: fontSize.md,
    },

    descricao: {
      color: colors.textSecondary,
      fontSize: fontSize.sm,
    },

    linha: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: spacing.sm,
    },

    preco: {
      color: colors.primary,
      fontWeight: 'bold',
    },

    botao: {
      backgroundColor: colors.primary,
      padding: spacing.sm,
      marginTop: spacing.sm,
      borderRadius: radius.sm,
    },

    botaoDesativado: {
      backgroundColor: colors.disabled,
    },

    textoBotao: {
      color: '#fff',
      textAlign: 'center',
    },
  });