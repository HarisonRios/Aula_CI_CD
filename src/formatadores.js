// Funções de formatação (data brasileira e somente números)

function somenteNumeros(texto) {
  return String(texto || '').replace(/\D/g, '');
}

// Digita 25122025 -> 25/12/2025
function mascaraData(texto) {
  const n = somenteNumeros(texto).slice(0, 8);
  if (n.length <= 2) return n;
  if (n.length <= 4) return `${n.slice(0, 2)}/${n.slice(2)}`;
  return `${n.slice(0, 2)}/${n.slice(2, 4)}/${n.slice(4)}`;
}

// 25/12/2025 -> 2025-12-25 (retorna null se incompleta ou inexistente)
function dataParaISO(texto) {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(texto || '');
  if (!m) return null;
  const [, d, mes, a] = m;
  const dt = new Date(Number(a), Number(mes) - 1, Number(d));
  if (dt.getFullYear() !== Number(a) || dt.getMonth() !== Number(mes) - 1 || dt.getDate() !== Number(d)) {
    return null;
  }
  return `${a}-${mes}-${d}`;
}

// 2025-12-25 -> 25/12/2025
function isoParaBR(iso) {
  const [a, m, d] = iso.split('-');
  return `${d}/${m}/${a}`;
}

// Descobre em qual campo mostrar a mensagem de erro
function campoDoErro(msg) {
  if (/paciente/i.test(msg)) return 'paciente';
  if (/médico/i.test(msg) && !/ocupado/i.test(msg)) return 'medico';
  if (/data|passado|domingo/i.test(msg)) return 'data';
  if (/horário/i.test(msg)) return 'hora';
  if (/nascimento/i.test(msg)) return 'nascimento';
  if (/especialidade/i.test(msg)) return 'especialidade';
  return 'geral';
}

module.exports = { somenteNumeros, mascaraData, dataParaISO, isoParaBR, campoDoErro };
