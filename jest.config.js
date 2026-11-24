module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: ['src/*.js'],
  coverageThreshold: {
    './src/agendamento.js': { statements: 70, branches: 70, functions: 70, lines: 70 },
    './src/pagamento.js': { statements: 70, branches: 70, functions: 70, lines: 70 },
  },
};
