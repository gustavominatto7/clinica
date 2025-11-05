
async function carregarJSON(nomeArquivo) {
  const resposta = await fetch(nomeArquivo);
  return await resposta.json();
}

function salvarLocalStorage(chave, dados) {
  localStorage.setItem(chave, JSON.stringify(dados));
}

function carregarLocalStorage(chave) {
  return JSON.parse(localStorage.getItem(chave)) || [];
}

function gerarId(lista) {
  return lista.length ? Math.max(...lista.map(i => i.id)) + 1 : 1;
}
