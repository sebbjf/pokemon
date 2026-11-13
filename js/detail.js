const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get("id");

const divDetall = document.querySelector("#detall-pokemon");
const missatgeError = document.querySelector("#missatge-error");
const buttonTornar = document.querySelector("#tornar");

const URL_API = "https://pokeapi.co/api/v2/pokemon";

const mostrarPokemon = (pokemon) => {
  const nomPokemon = document.createElement("h2");
  nomPokemon.textContent = pokemon.name;

  const imgPokemon = document.createElement("img");
  imgPokemon.src = pokemon.sprites.front_default;
  imgPokemon.alt = pokemon.name;

  const infoPokemon = document.createElement("p");
  infoPokemon.textContent = `Pes: ${pokemon.weight} | Alçada: ${pokemon.height}`;

  const taula = document.createElement("table");

  const filaTitol = document.createElement("tr");
  const thId = document.createElement("th");
  thId.textContent = "ID";

  const thHabilitat = document.createElement("th");
  thHabilitat.textContent = "Habilitat";
  
  filaTitol.appendChild(thId);
  filaTitol.appendChild(thHabilitat);
  taula.appendChild(filaTitol);

  let id = 1;
  for (const habilitat of pokemon.abilities) {
    const fila = document.createElement("tr");
    const tdId = document.createElement("td");
    tdId.textContent = id;

    const tdHabilitat = document.createElement("td");
    tdHabilitat.textContent = habilitat.ability.name;

    fila.appendChild(tdId);
    fila.appendChild(tdHabilitat);
    taula.appendChild(fila);
    id += 1;
  }

  divDetall.append(nomPokemon, imgPokemon, infoPokemon, taula);
};

const carregarPokemon = async () => {
  try {
    const resposta = await fetch(`${URL_API}/${pokemonId}`);
    if (!resposta.ok) {
      throw new Error(`Error ${resposta.status}: ${resposta.statusText}`);
    }
    const pokemon = await resposta.json();
    mostrarPokemon(pokemon);
  } catch (error) {
    missatgeError.textContent = error.message;
  }
};

buttonTornar.addEventListener("click", () => {
  history.back();
});

carregarPokemon();
