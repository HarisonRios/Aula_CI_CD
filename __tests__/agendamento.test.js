const { agendarConsulta, cancelarConsulta, validarHorario } = require('../src/agendamento');

const hoje = new Date(2025, 5, 10); // terça 10/06/2025
const base = { paciente: 'Maria', medico: 'Dr. João', data: '2025-06-11', hora: 9 };

describe('agendarConsulta', () => {
  test('agenda consulta válida', () => {
    const r = agendarConsulta([], base, hoje);
    expect(r).toHaveLength(1);
    expect(r[0]).toMatchObject({ id: 1, paciente: 'Maria', hora: 9 });
  });

  test('aceita agendamento no mesmo dia (limite)', () => {
    const r = agendarConsulta([], { ...base, data: '2025-06-10' }, hoje);
    expect(r).toHaveLength(1);
  });

  test('aceita horários limite 8 e 17', () => {
    expect(agendarConsulta([], { ...base, hora: 8 }, hoje)).toHaveLength(1);
    expect(agendarConsulta([], { ...base, hora: 17 }, hoje)).toHaveLength(1);
  });

  test('rejeita paciente ou médico vazio', () => {
    expect(() => agendarConsulta([], { ...base, paciente: ' ' }, hoje)).toThrow('paciente');
    expect(() => agendarConsulta([], { ...base, medico: '' }, hoje)).toThrow('médico');
  });

  test('rejeita data inválida e passada', () => {
    expect(() => agendarConsulta([], { ...base, data: 'abc' }, hoje)).toThrow('Data inválida');
    expect(() => agendarConsulta([], { ...base, data: '2025-06-09' }, hoje)).toThrow('passado');
  });

  test('rejeita domingo', () => {
    expect(() => agendarConsulta([], { ...base, data: '2025-06-15' }, hoje)).toThrow('domingos');
  });

  test('rejeita horário fora do expediente', () => {
    expect(() => agendarConsulta([], { ...base, hora: 7 }, hoje)).toThrow('Horário');
    expect(() => agendarConsulta([], { ...base, hora: 18 }, hoje)).toThrow('Horário');
    expect(() => agendarConsulta([], { ...base, hora: 9.5 }, hoje)).toThrow('Horário');
  });

  test('rejeita horário duplicado do mesmo médico, mas aceita outro médico', () => {
    const lista = agendarConsulta([], base, hoje);
    expect(() => agendarConsulta(lista, base, hoje)).toThrow('ocupado');
    expect(agendarConsulta(lista, { ...base, medico: 'Dra. Ana' }, hoje)).toHaveLength(2);
  });
});

describe('cancelarConsulta', () => {
  test('cancela consulta existente', () => {
    const lista = agendarConsulta([], base, hoje);
    expect(cancelarConsulta(lista, 1)).toEqual([]);
  });

  test('erro se não existir', () => {
    expect(() => cancelarConsulta([], 5)).toThrow('não encontrada');
  });
});

describe('validarHorario', () => {
  test('valida limites', () => {
    expect(validarHorario(8)).toBe(true);
    expect(validarHorario(17)).toBe(true);
    expect(validarHorario(18)).toBe(false);
  });
});
