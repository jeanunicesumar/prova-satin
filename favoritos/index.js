document.addEventListener("DOMContentLoaded", main());

function main() {
  const favoritos = JSON.parse(localStorage.getItem("favoritos"));

  if (!favoritos) {
    return;
  }

  listFavoritos(favoritos);
}

function listFavoritos(favoritos) {
  const ulFavoritos = document.querySelector("#lista-favoritos");

  favoritos.forEach((favorito) => {
    const li = createSpanFavoritos(favorito);

    ulFavoritos.appendChild(li);
  });
}

function createSpanFavoritos(favorito) {
  const li = document.createElement("li");
  const p = document.createElement("p");
  p.textContent = favorito;

  li.appendChild(p);

  return li;
}
