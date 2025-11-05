
document.addEventListener("DOMContentLoaded", () => {
  const menuHTML = `
    <aside class="menu">
      <h2>Clínica Médica</h2>
      <ul>
        <li><a href="index.html">🏠 Início</a></li>
        <li><a href="pacientes.html">🧍 Pacientes</a></li>
        <li><a href="medicos.html">🩺 Médicos</a></li>
        <li><a href="especialidades.html">📚 Especialidades</a></li>
        <li><a href="consultas.html">📅 Consultas</a></li>
      </ul>
    </aside>
  `;
  document.body.insertAdjacentHTML("afterbegin", menuHTML);
});
