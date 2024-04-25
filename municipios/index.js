document.addEventListener("DOMContentLoaded", main());

async function main() {
  const urlSearchParams = new URLSearchParams(location.search);
  const uf = urlSearchParams.get("uf");

  document.title = `Municípios de ${uf}`;
  const h1 = document.querySelector("h1");
  h1.textContent = `Municípios de ${uf}`;

  const municipios = await findMunicipios(uf);

  addMunicipiosInLista(municipios);
  eventClickButton();
}

async function findMunicipios(uf) {
  const teste = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

  const response = await fetch(`${teste}/${uf}/municipios`);
  return await response.json();
}

function addMunicipiosInLista(municipios) {
  const ulMunicipios = document.querySelector("#lista-municipios");

  municipios.forEach((municipio) => {
    const li = createSpanMunicipio(municipio);

    ulMunicipios.appendChild(li);
  });
}

function createSpanMunicipio(municipio) {
  const span = document.createElement("span");

  const li = document.createElement("li");
  const p = document.createElement("p");
  p.textContent = municipio.nome;

  const button = document.createElement("button");
  button.textContent = "Favoritar";
  button.id = `${municipio.id}-${municipio.nome}`;

  span.appendChild(p);
  span.appendChild(button);
  li.appendChild(span);

  return li;
}

function eventClickButton() {
  const buttons = document.querySelectorAll("button");

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      saveInFavorites(event.target.id);
    });
  });
}

function saveInFavorites(idMunicipio) {
  const nomeMunicipio = idMunicipio.split("-")[1];

  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  if (favoritos.includes(nomeMunicipio)) {
    return;
  }

  favoritos.push(nomeMunicipio);
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
}
