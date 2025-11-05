
const LS_ESPECIALIDADES = "especialidades";

async function carregarEspecialidades() {
  let especialidades = carregarLocalStorage(LS_ESPECIALIDADES);

  if (especialidades.length === 0) {
    especialidades = await carregarJSON("especialidades.json");
    salvarJSON(LS_ESPECIALIDADES, especialidades);
  }

  listarEspecialidades(especialidades);
}

function listarEspecialidades(lista) {
  const ul = document.getElementById("listaEspecialidades");
  ul.innerHTML = "";

  lista.forEach(e => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${e.nome}</strong> <br>
      <button onclick="editarEspecialidade(${e.id})">Editar</button>
      <button onclick="removerEspecialidade(${e.id})">Excluir</button>
    `;
    ul.appendChild(li);
  });
}

function adicionarEspecialidade() {
  const nome = document.getElementById("nome").value.trim();

  if (!nome) {
    alert("Preencha o nome!");
    return;
  }

  const lista = carregarLocalStorage(LS_ESPECIALIDADES);
  const novo = { id: gerarId(lista), nome };

  lista.push(novo);
  salvarJSON(LS_ESPECIALIDADES, lista);
  carregarEspecialidades();
}

function removerEspecialidade(id) {
  if (!confirm("Deseja excluir esta especialidade?")) return;

  let lista = carregarLocalStorage(LS_ESPECIALIDADES);
  lista = lista.filter(e => e.id !== id);
  salvarJSON(LS_ESPECIALIDADES, lista);
  carregarEspecialidades();
}

function editarEspecialidade(id) {
  const lista = carregarLocalStorage(LS_ESPECIALIDADES);
  const esp = lista.find(e => e.id === id);

  document.getElementById("nome").value = esp.nome;

  document.getElementById("btnSalvar").onclick = function () {
    esp.nome = document.getElementById("nome").value.trim();
    salvarJSON(LS_ESPECIALIDADES, lista);
    carregarEspecialidades();
    document.getElementById("btnSalvar").onclick = adicionarEspecialidade;
  };
}

document.addEventListener("DOMContentLoaded", carregarEspecialidades);
