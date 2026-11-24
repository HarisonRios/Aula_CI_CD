import { useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import Campo from '../components/Campo';
import { calcularValorConsulta } from '../pagamento';
import { mascaraData, dataParaISO, campoDoErro } from '../formatadores';

const ESPECIALIDADES = [
  { id: 'clinico', nome: 'Clínico' },
  { id: 'pediatra', nome: 'Pediatra' },
  { id: 'cardiologista', nome: 'Cardiologista' },
];

export default function Pagamento() {
  const [especialidade, setEspecialidade] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [convenio, setConvenio] = useState(false);
  const [erros, setErros] = useState({});
  const [valor, setValor] = useState(null);

  function calcular() {
    const e = {};
    const iso = dataParaISO(nascimento);
    if (!especialidade) e.especialidade = 'Selecione a especialidade';
    if (!nascimento) e.nascimento = 'Informe a data de nascimento';
    else if (!iso) e.nascimento = 'Data inválida (use DD/MM/AAAA)';

    if (Object.keys(e).length === 0) {
      try {
        setValor(calcularValorConsulta({ especialidade, nascimento: iso, convenio }));
        setErros({});
        return;
      } catch (err) {
        e[campoDoErro(err.message)] = err.message;
      }
    }
    setValor(null);
    setErros(e);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Valor da consulta</Text>
        <Text style={styles.nota}>Campos com <Text style={styles.ast}>*</Text> são obrigatórios</Text>

        <Text style={styles.label}>Especialidade <Text style={styles.ast}>*</Text></Text>
        <View style={styles.linha}>
          {ESPECIALIDADES.map((esp) => (
            <TouchableOpacity key={esp.id}
              style={[styles.chip, especialidade === esp.id && styles.chipAtivo]}
              onPress={() => setEspecialidade(esp.id)}>
              <Text style={especialidade === esp.id ? styles.chipTextoAtivo : styles.chipTexto}>
                {esp.nome}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {erros.especialidade ? <Text style={styles.erro}>{erros.especialidade}</Text> : null}

        <View style={{ height: 14 }} />
        <Campo label="Data de nascimento" obrigatorio placeholder="DD/MM/AAAA" value={nascimento}
          onChangeText={(t) => setNascimento(mascaraData(t))} keyboardType="numeric" maxLength={10}
          erro={erros.nascimento} />

        <View style={styles.switchLinha}>
          <Text style={styles.label}>Possui convênio</Text>
          <Switch value={convenio} onValueChange={setConvenio} />
        </View>

        <TouchableOpacity style={styles.botao} onPress={calcular}>
          <Text style={styles.botaoTexto}>Calcular</Text>
        </TouchableOpacity>

        {valor !== null ? (
          <View style={styles.resultado}>
            <Text style={styles.nota}>Valor a pagar</Text>
            <Text style={styles.valor}>R$ {valor.toFixed(2).replace('.', ',')}</Text>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#f4f7fb', flexGrow: 1 },
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 16, borderWidth: 1, borderColor: '#e1e8f0' },
  titulo: { fontSize: 20, fontWeight: '700', color: '#1f2d3d' },
  nota: { fontSize: 13, color: '#6b7a8c', marginBottom: 12 },
  ast: { color: '#d93025' },
  label: { fontSize: 14, fontWeight: '600', color: '#1f2d3d', marginBottom: 6 },
  linha: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { borderWidth: 1, borderColor: '#cfd8e3', borderRadius: 20, paddingVertical: 8, paddingHorizontal: 14 },
  chipAtivo: { backgroundColor: '#1a73e8', borderColor: '#1a73e8' },
  chipTexto: { color: '#1f2d3d' },
  chipTextoAtivo: { color: '#fff', fontWeight: '600' },
  erro: { color: '#d93025', fontSize: 12, marginTop: 4 },
  switchLinha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  botao: { backgroundColor: '#1a73e8', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  botaoTexto: { color: '#fff', fontWeight: '700', fontSize: 15 },
  resultado: { marginTop: 18, alignItems: 'center', padding: 14, backgroundColor: '#e8f0fe', borderRadius: 8 },
  valor: { fontSize: 28, fontWeight: 'bold', color: '#1a73e8' },
});
