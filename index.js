document.addEventListener("DOMContentLoaded", main());

async function main() {
  const estados = await findEstados();

  addEstadosInLista(estados);
}

async function findEstados() {
  const URL = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

  const response = await fetch(URL);
  return await response.json();
}

function addEstadosInLista(estados) {
  const ulEstados = document.querySelector("#lista-estados");

  estados.forEach((estado) => {
    const li = createSpanEstado(estado);

    ulEstados.appendChild(li);
  });
}

function createSpanEstado(estado) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.textContent = estado.nome;
  a.href = `./municipios/index.html?uf=${estado.sigla}`;

  li.appendChild(a);

  return li;
}
