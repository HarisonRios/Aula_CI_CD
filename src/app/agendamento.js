import { useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Campo from '../components/Campo';
import { agendarConsulta, cancelarConsulta } from '../agendamento';
import { mascaraData, somenteNumeros, dataParaISO, isoParaBR, campoDoErro } from '../formatadores';

export default function Agendamento() {
  const [paciente, setPaciente] = useState('');
  const [medico, setMedico] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [consultas, setConsultas] = useState([]);
  const [erros, setErros] = useState({});
  const [sucesso, setSucesso] = useState('');

  function agendar() {
    setSucesso('');
    const e = {};
    if (!paciente.trim()) e.paciente = 'Informe o nome do paciente';
    if (!medico.trim()) e.medico = 'Informe o médico';
    const iso = dataParaISO(data);
    if (!data) e.data = 'Informe a data';
    else if (!iso) e.data = 'Data inválida (use DD/MM/AAAA)';
    if (!hora) e.hora = 'Informe a hora';

    if (Object.keys(e).length === 0) {
      try {
        setConsultas(agendarConsulta(consultas, { paciente, medico, data: iso, hora: Number(hora) }));
        setPaciente('');
        setMedico('');
        setData('');
        setHora('');
        setErros({});
        setSucesso('Consulta agendada com sucesso!');
        return;
      } catch (err) {
        e[campoDoErro(err.message)] = err.message;
      }
    }
    setErros(e);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Agendar consulta</Text>
        <Text style={styles.nota}>Campos com <Text style={styles.ast}>*</Text> são obrigatórios</Text>

        <Campo label="Paciente" obrigatorio placeholder="Nome completo" value={paciente}
          onChangeText={setPaciente} erro={erros.paciente} />
        <Campo label="Médico" obrigatorio placeholder="Ex: Dr. João" value={medico}
          onChangeText={setMedico} erro={erros.medico} />
        <Campo label="Data" obrigatorio placeholder="DD/MM/AAAA" value={data}
          onChangeText={(t) => setData(mascaraData(t))} keyboardType="numeric" maxLength={10}
          erro={erros.data} />
        <Campo label="Hora (8 a 17)" obrigatorio placeholder="Ex: 9" value={hora}
          onChangeText={(t) => setHora(somenteNumeros(t).slice(0, 2))} keyboardType="numeric"
          maxLength={2} erro={erros.hora} />

        <TouchableOpacity style={styles.botao} onPress={agendar}>
          <Text style={styles.botaoTexto}>Agendar</Text>
        </TouchableOpacity>
        {sucesso ? <Text style={styles.sucesso}>{sucesso}</Text> : null}
      </View>

      <Text style={styles.subtitulo}>Consultas agendadas</Text>
      {consultas.length === 0 ? <Text style={styles.nota}>Nenhuma consulta agendada.</Text> : null}
      {consultas.map((c) => (
        <View key={c.id} style={styles.item}>
          <View style={{ flex: 1 }}>
            <Text style={styles.itemNome}>{c.paciente}</Text>
            <Text style={styles.nota}>{c.medico} • {isoParaBR(c.data)} às {c.hora}h</Text>
          </View>
          <TouchableOpacity onPress={() => setConsultas(cancelarConsulta(consultas, c.id))}>
            <Text style={styles.cancelar}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#f4f7fb', flexGrow: 1 },
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 16, borderWidth: 1, borderColor: '#e1e8f0' },
  titulo: { fontSize: 20, fontWeight: '700', color: '#1f2d3d' },
  subtitulo: { fontSize: 17, fontWeight: '700', color: '#1f2d3d', marginTop: 22, marginBottom: 8 },
  nota: { fontSize: 13, color: '#6b7a8c', marginBottom: 12 },
  ast: { color: '#d93025' },
  botao: { backgroundColor: '#1a73e8', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  botaoTexto: { color: '#fff', fontWeight: '700', fontSize: 15 },
  sucesso: { color: '#1e8e3e', marginTop: 10, textAlign: 'center' },
  item: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 8,
    padding: 12, marginBottom: 8, borderWidth: 1, borderColor: '#e1e8f0',
  },
  itemNome: { fontWeight: '600', color: '#1f2d3d' },
  cancelar: { color: '#d93025', fontWeight: '600' },
});
