
const LS_CONSULTAS = "consultas";
const LS_PACIENTES = "pacientes";
const LS_MEDICOS = "medicos";

async function carregarConsultas() {
  let consultas = carregarLocalStorage(LS_CONSULTAS);

  if (consultas.length === 0) {
    consultas = await carregarJSON("consultas.json");
    salvarJSON(LS_CONSULTAS, consultas);
  }

  listarConsultas(consultas);
  carregarSelects();
}

async function carregarSelects() {
  const pacientes = carregarLocalStorage(LS_PACIENTES);
  const medicos = carregarLocalStorage(LS_MEDICOS);

  const selPac = document.getElementById("paciente");
  const selMed = document.getElementById("medico");

  selPac.innerHTML = `<option value="">Selecione...</option>`;
  selMed.innerHTML = `<option value="">Selecione...</option>`;

  pacientes.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.id;
    opt.textContent = p.nome;
    selPac.appendChild(opt);
  });

  medicos.forEach(m => {
    const opt = document.createElement("option");
    opt.value = m.id;
    opt.textContent = m.nome;
    selMed.appendChild(opt);
  });
}

function listarConsultas(lista) {
  const ul = document.getElementById("listaConsultas");
  ul.innerHTML = "";

  const pacientes = carregarLocalStorage(LS_PACIENTES);
  const medicos = carregarLocalStorage(LS_MEDICOS);

  lista.forEach(c => {
    const paciente = pacientes.find(p => p.id === c.pacienteId)?.nome || "Desconhecido";
    const medico = medicos.find(m => m.id === c.medicoId)?.nome || "Sem médico";

    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${c.data} - ${c.hora}</strong><br>
      Paciente: ${paciente} <br>
      Médico: ${medico} <br>
      <button onclick="editarConsulta(${c.id})">Editar</button>
      <button onclick="removerConsulta(${c.id})">Excluir</button>
    `;
    ul.appendChild(li);
  });
}

function adicionarConsulta() {
  const pacienteId = parseInt(document.getElementById("paciente").value);
  const medicoId = parseInt(document.getElementById("medico").value);
  const data = document.getElementById("data").value;
  const hora = document.getElementById("hora").value;

  if (!pacienteId || !medicoId || !data || !hora) {
    alert("Preencha todos os campos!");
    return;
  }

  const lista = carregarLocalStorage(LS_CONSULTAS);
  const novo = { id: gerarId(lista), pacienteId, medicoId, data, hora };

  lista.push(novo);
  salvarJSON(LS_CONSULTAS, lista);
  carregarConsultas();
}

function removerConsulta(id) {
  if (!confirm("Deseja excluir esta consulta?")) return;

  let lista = carregarLocalStorage(LS_CONSULTAS);
  lista = lista.filter(c => c.id !== id);
  salvarJSON(LS_CONSULTAS, lista);
  carregarConsultas();
}

function editarConsulta(id) {
  const lista = carregarLocalStorage(LS_CONSULTAS);
  const consulta = lista.find(c => c.id === id);

  document.getElementById("paciente").value = consulta.pacienteId;
  document.getElementById("medico").value = consulta.medicoId;
  document.getElementById("data").value = consulta.data;
  document.getElementById("hora").value = consulta.hora;

  document.getElementById("btnSalvar").onclick = function () {
    consulta.pacienteId = parseInt(document.getElementById("paciente").value);
    consulta.medicoId = parseInt(document.getElementById("medico").value);
    consulta.data = document.getElementById("data").value;
    consulta.hora = document.getElementById("hora").value;

    salvarJSON(LS_CONSULTAS, lista);
    carregarConsultas();

    document.getElementById("btnSalvar").onclick = adicionarConsulta;
  };
}

document.addEventListener("DOMContentLoaded", carregarConsultas);
