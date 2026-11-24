// Funcionalidade 2: cálculo do valor da consulta com desconto

const VALORES = { clinico: 150, pediatra: 180, cardiologista: 250 };

function calcularIdade(nascimento, hoje = new Date()) {
  const n = new Date(nascimento + 'T00:00:00');
  if (isNaN(n.getTime()) || n > hoje) throw new Error('Data de nascimento inválida');
  let idade = hoje.getFullYear() - n.getFullYear();
  const fezAniversario =
    hoje.getMonth() > n.getMonth() ||
    (hoje.getMonth() === n.getMonth() && hoje.getDate() >= n.getDate());
  if (!fezAniversario) idade--;
  return idade;
}

function calcularValorConsulta({ especialidade, nascimento, convenio = false }, hoje = new Date()) {
  const base = VALORES[especialidade];
  if (base === undefined) throw new Error('Especialidade inválida');

  const idade = calcularIdade(nascimento, hoje);

  let desconto = 0;
  if (idade >= 60 || idade < 12) desconto = 0.2; // idoso ou criança
  if (convenio) desconto = 1; // convênio cobre tudo

  const valor = base * (1 - desconto);
  return Number(valor.toFixed(2));
}

module.exports = { calcularValorConsulta, calcularIdade, VALORES };
