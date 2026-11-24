// Funcionalidade 1: agendamento de consultas

const HORARIO_INICIO = 8; // 08:00
const HORARIO_FIM = 18; // 18:00 (último horário às 17:00)

function validarHorario(hora) {
  return Number.isInteger(hora) && hora >= HORARIO_INICIO && hora < HORARIO_FIM;
}

function agendarConsulta(consultas, { paciente, medico, data, hora }, hoje = new Date()) {
  if (!paciente || !paciente.trim()) throw new Error('Informe o nome do paciente');
  if (!medico || !medico.trim()) throw new Error('Informe o médico');

  const dataConsulta = new Date(data + 'T00:00:00');
  if (isNaN(dataConsulta.getTime())) throw new Error('Data inválida');

  const dia = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
  if (dataConsulta < dia) throw new Error('Não é possível agendar no passado');

  if (dataConsulta.getDay() === 0) throw new Error('Não há atendimento aos domingos');
  if (!validarHorario(hora)) throw new Error('Horário deve ser entre 8h e 17h');

  const ocupado = consultas.some(
    (c) => c.medico === medico && c.data === data && c.hora === hora
  );
  if (ocupado) throw new Error('Horário já ocupado para este médico');

  const nova = { id: consultas.length + 1, paciente: paciente.trim(), medico, data, hora };
  return [...consultas, nova];
}

function cancelarConsulta(consultas, id) {
  if (!consultas.some((c) => c.id === id)) throw new Error('Consulta não encontrada');
  return consultas.filter((c) => c.id !== id);
}

module.exports = { agendarConsulta, cancelarConsulta, validarHorario };
