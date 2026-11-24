import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function Campo({ label, obrigatorio, erro, ...props }) {
  return (
    <View style={styles.grupo}>
      <Text style={styles.label}>
        {label}
        {obrigatorio ? <Text style={styles.asterisco}> *</Text> : null}
      </Text>
      <TextInput
        style={[styles.input, erro ? styles.inputErro : null]}
        placeholderTextColor="#9aa5b1"
        {...props}
      />
      {erro ? <Text style={styles.erro}>{erro}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  grupo: { marginBottom: 14 },
  label: { fontSize: 14, fontWeight: '600', color: '#1f2d3d', marginBottom: 6 },
  asterisco: { color: '#d93025' },
  input: {
    borderWidth: 1,
    borderColor: '#cfd8e3',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
  inputErro: { borderColor: '#d93025' },
  erro: { color: '#d93025', fontSize: 12, marginTop: 4 },
});
