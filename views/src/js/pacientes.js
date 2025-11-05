
let pacientes = [];

document.addEventListener("DOMContentLoaded", async () => {
  pacientes = carregarLocalStorage("pacientes");

  if (pacientes.length === 0) {
    pacientes = await carregarJSON("pacientes.json");
    salvarLocalStorage("pacientes", pacientes);
  }

  listarPacientes();
});

function listarPacientes() {
  const tbody = document.querySelector("#tabelaPacientes tbody");
  tbody.innerHTML = "";

  pacientes.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.id}</td>
      <td>${p.nome}</td>
      <td>${p.cpf}</td>
      <td>${p.idade}</td>
      <td>${p.telefone}</td>
      <td>
        <button class="edit" onclick="editarPaciente(${p.id})">Editar</button>
        <button class="delete" onclick="excluirPaciente(${p.id})">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function adicionarPaciente() {
  const nome = document.querySelector("#nome").value;
  const cpf = document.querySelector("#cpf").value;
  const idade = document.querySelector("#idade").value;
  const telefone = document.querySelector("#telefone").value;

  const novo = {
    id: gerarId(pacientes),
    nome,
    cpf,
    idade,
    telefone
  };

  pacientes.push(novo);
  salvarLocalStorage("pacientes", pacientes);
  listarPacientes();
}

function excluirPaciente(id) {
  pacientes = pacientes.filter(p => p.id !== id);
  salvarLocalStorage("pacientes", pacientes);
  listarPacientes();
}

function editarPaciente(id) {
  const paciente = pacientes.find(p => p.id === id);
  document.querySelector("#nome").value = paciente.nome;
  document.querySelector("#cpf").value = paciente.cpf;
  document.querySelector("#idade").value = paciente.idade;
  document.querySelector("#telefone").value = paciente.telefone;

  document.querySelector("#btnSalvar").onclick = () => salvarEdicao(id);
}

function salvarEdicao(id) {
  const paciente = pacientes.find(p => p.id === id);
  paciente.nome = document.querySelector("#nome").value;
  paciente.cpf = document.querySelector("#cpf").value;
  paciente.idade = document.querySelector("#idade").value;
  paciente.telefone = document.querySelector("#telefone").value;

  salvarLocalStorage("pacientes", pacientes);
  listarPacientes();
}
