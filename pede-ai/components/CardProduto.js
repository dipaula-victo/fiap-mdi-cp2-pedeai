import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import BadgeStatus from './BadgeStatus';
import { colors, spacing, radius, fontSize } from '../theme';

export default function CardProduto({ item, onAdd }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.imagem }} style={styles.image} />

      <View style={{ flex: 1 }}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text>{item.descricao}</Text>

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

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  nome: {
    fontWeight: 'bold',
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  preco: {
    color: '#f769b2',
    fontWeight: 'bold',
  },
  botao: {
    backgroundColor: '#3d13f6',
    padding: 6,
    marginTop: 8,
    borderRadius: 5,
  },
  botaoDesativado: {
    backgroundColor: '#ccc',
  },
  textoBotao: {
    color: '#fff',
    textAlign: 'center',
  },
});
