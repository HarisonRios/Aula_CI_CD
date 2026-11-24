import { ScrollView, Text, View, StyleSheet } from 'react-native';

export default function Inicio() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Clínica Saúde</Text>
      <Text style={styles.texto}>
        Aplicativo simples para o atendimento de um hospital. Ele tem duas funções:
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Agendamento</Text>
        <Text style={styles.texto}>
          Marque consultas informando paciente, médico, data e hora. O atendimento é de segunda a
          sábado, das 8h às 17h, e o mesmo médico não pode ter dois pacientes no mesmo horário.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Pagamento</Text>
        <Text style={styles.texto}>
          Calcule o valor da consulta pela especialidade. Crianças menores de 12 anos e idosos a
          partir de 60 anos têm 20% de desconto, e quem tem convênio não paga.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f4f7fb', flexGrow: 1 },
  titulo: { fontSize: 26, fontWeight: 'bold', color: '#1a73e8', marginBottom: 8 },
  texto: { fontSize: 15, color: '#3c4858', lineHeight: 22 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#e1e8f0',
  },
  cardTitulo: { fontSize: 18, fontWeight: '700', color: '#1f2d3d', marginBottom: 6 },
});
