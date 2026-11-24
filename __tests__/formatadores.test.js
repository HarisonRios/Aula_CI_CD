const { mascaraData, dataParaISO, isoParaBR, somenteNumeros, campoDoErro } = require('../src/formatadores');

describe('formatadores', () => {
  test('somenteNumeros remove letras', () => {
    expect(somenteNumeros('a1b2')).toBe('12');
    expect(somenteNumeros(null)).toBe('');
  });

  test('mascaraData coloca as barras', () => {
    expect(mascaraData('2')).toBe('2');
    expect(mascaraData('251')).toBe('25/1');
    expect(mascaraData('25122025')).toBe('25/12/2025');
    expect(mascaraData('25/12/20259999')).toBe('25/12/2025');
  });

  test('dataParaISO converte e valida', () => {
    expect(dataParaISO('25/12/2025')).toBe('2025-12-25');
    expect(dataParaISO('31/02/2025')).toBeNull();
    expect(dataParaISO('25/12')).toBeNull();
    expect(dataParaISO()).toBeNull();
  });

  test('isoParaBR', () => {
    expect(isoParaBR('2025-12-25')).toBe('25/12/2025');
  });

  test('campoDoErro', () => {
    expect(campoDoErro('Informe o nome do paciente')).toBe('paciente');
    expect(campoDoErro('Informe o médico')).toBe('medico');
    expect(campoDoErro('Horário já ocupado para este médico')).toBe('hora');
    expect(campoDoErro('Não há atendimento aos domingos')).toBe('data');
    expect(campoDoErro('Data de nascimento inválida')).toBe('data');
    expect(campoDoErro('Especialidade inválida')).toBe('especialidade');
    expect(campoDoErro('outro')).toBe('geral');
  });
});
