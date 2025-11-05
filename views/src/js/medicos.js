
const LS_MEDICOS = "medicos";
const LS_ESPECIALIDADES = "especialidades";

async function carregarMedicos() {
  let medicos = carregarLocalStorage(LS_MEDICOS);

  if (medicos.length === 0) {
    medicos = await carregarJSON("medicos.json");
    salvarJSON(LS_MEDICOS, medicos);
  }

  listarMedicos(medicos);
  carregarEspecialidadesSelect();
}

async function carregarEspecialidadesSelect() {
  let especialidades = carregarLocalStorage(LS_ESPECIALIDADES);

  if (especialidades.length === 0) {
    especialidades = await carregarJSON("especialidades.json");
    salvarJSON(LS_ESPECIALIDADES, especialidades);
  }

  const select = document.getElementById("especialidade");
  select.innerHTML = `<option value="">Selecione...</option>`;

  especialidades.forEach(e => {
    const opt = document.createElement("option");
    opt.value = e.id;
    opt.textContent = e.nome;
    select.appendChild(opt);
  });
}

function listarMedicos(lista) {
  const ul = document.getElementById("listaMedicos");
  ul.innerHTML = "";

  lista.forEach(m => {
    const especialidade = carregarLocalStorage(LS_ESPECIALIDADES)
      .find(e => e.id === m.especialidadeId)?.nome || "Não definido";

    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${m.nome}</strong> (${m.crm}) <br>
      Especialidade: ${especialidade} <br>
      <button onclick="editarMedico(${m.id})">Editar</button>
      <button onclick="removerMedico(${m.id})">Excluir</button>
    `;
    ul.appendChild(li);
  });
}

function adicionarMedico() {
  const nome = document.getElementById("nome").value.trim();
  const crm = document.getElementById("crm").value.trim();
  const especialidadeId = parseInt(document.getElementById("especialidade").value);

  if (!nome || !crm || !especialidadeId) {
    alert("Preencha todos os campos!");
    return;
  }

  const lista = carregarLocalStorage(LS_MEDICOS);
  const novo = { id: gerarId(lista), nome, crm, especialidadeId };

  lista.push(novo);
  salvarJSON(LS_MEDICOS, lista);
  carregarMedicos();
}

function removerMedico(id) {
  if (!confirm("Deseja realmente excluir?")) return;

  let lista = carregarLocalStorage(LS_MEDICOS);
  lista = lista.filter(m => m.id !== id);
  salvarJSON(LS_MEDICOS, lista);
  carregarMedicos();
}

function editarMedico(id) {
  const lista = carregarLocalStorage(LS_MEDICOS);
  const medico = lista.find(m => m.id === id);

  document.getElementById("nome").value = medico.nome;
  document.getElementById("crm").value = medico.crm;
  document.getElementById("especialidade").value = medico.especialidadeId;

  document.getElementById("btnSalvar").onclick = function () {
    medico.nome = document.getElementById("nome").value.trim();
    medico.crm = document.getElementById("crm").value.trim();
    medico.especialidadeId = parseInt(document.getElementById("especialidade").value);

    salvarJSON(LS_MEDICOS, lista);
    carregarMedicos();

    document.getElementById("btnSalvar").onclick = adicionarMedico;
  };
}

document.addEventListener("DOMContentLoaded", carregarMedicos);
