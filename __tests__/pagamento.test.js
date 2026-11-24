const { calcularValorConsulta, calcularIdade } = require('../src/pagamento');

const hoje = new Date(2025, 5, 10);

describe('calcularIdade', () => {
  test('calcula idade completa', () => {
    expect(calcularIdade('1990-06-10', hoje)).toBe(35);
  });

  test('ainda não fez aniversário', () => {
    expect(calcularIdade('1990-06-11', hoje)).toBe(34);
    expect(calcularIdade('1990-07-01', hoje)).toBe(34);
  });

  test('data inválida ou futura', () => {
    expect(() => calcularIdade('xx', hoje)).toThrow('inválida');
    expect(() => calcularIdade('2026-01-01', hoje)).toThrow('inválida');
  });
});

describe('calcularValorConsulta', () => {
  test('adulto paga valor cheio', () => {
    expect(calcularValorConsulta({ especialidade: 'clinico', nascimento: '1990-01-01' }, hoje)).toBe(150);
  });

  test('idoso (60 anos) tem 20% de desconto', () => {
    expect(calcularValorConsulta({ especialidade: 'cardiologista', nascimento: '1965-06-10' }, hoje)).toBe(200);
  });

  test('59 anos não tem desconto', () => {
    expect(calcularValorConsulta({ especialidade: 'clinico', nascimento: '1965-06-11' }, hoje)).toBe(150);
  });

  test('criança menor de 12 tem desconto; 12 anos não', () => {
    expect(calcularValorConsulta({ especialidade: 'pediatra', nascimento: '2015-01-01' }, hoje)).toBe(144);
    expect(calcularValorConsulta({ especialidade: 'pediatra', nascimento: '2013-06-10' }, hoje)).toBe(180);
  });

  test('convênio zera o valor', () => {
    expect(calcularValorConsulta({ especialidade: 'clinico', nascimento: '1990-01-01', convenio: true }, hoje)).toBe(0);
  });

  test('especialidade inválida', () => {
    expect(() => calcularValorConsulta({ especialidade: 'x', nascimento: '1990-01-01' }, hoje)).toThrow('Especialidade');
  });
});
