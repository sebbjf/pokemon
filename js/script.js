const selectResultats = document.querySelector("#select-resultats");
const mainLlista = document.querySelector("#llista-pokemons");
const navPaginacio = document.querySelector("#paginacio");
const missatgeError = document.querySelector("#missatge-error");
const buttonPrev = document.querySelector("#prev");
const buttonNext = document.querySelector("#next");

const URL_API = "https://pokeapi.co/api/v2/pokemon";

let urlPrev = null;
let urlNext = null;

const mostrarError = (error) => {
  missatgeError.textContent = error.message;
};

const crearCardPokemon = async (card, url) => {
  try {
    const resposta = await fetch(url);
    if (!resposta.ok) {
      throw new Error(`Error ${resposta.status}: ${resposta.statusText}`);
    }
    const pokemon = await resposta.json();

    const imgPokemon = document.createElement("img");
    imgPokemon.src = pokemon.sprites.front_default;
    imgPokemon.alt = pokemon.name;

    const nomPokemon = document.createElement("h3");
    nomPokemon.textContent = pokemon.name;

    const boto = document.createElement("button");
    boto.type = "button";
    boto.textContent = "Detall";
    boto.addEventListener("click", () => {
      location.href = `detail.html?id=${pokemon.id}`;
    });

    card.append(imgPokemon, nomPokemon, boto);
  } catch (error) {
    mostrarError(error);
  }
};

const carregarPokemons = async (url) => {
  missatgeError.textContent = "";

  try {
    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error(`Error ${resposta.status}: ${resposta.statusText}`);
    }

    const dades = await resposta.json();

    mainLlista.innerHTML = "";

    for (const pokemon of dades.results) {
      const card = document.createElement("div");
      card.classList.add("card");
      mainLlista.appendChild(card);
      crearCardPokemon(card, pokemon.url);
    }

    urlPrev = dades.previous;
    urlNext = dades.next;
    buttonPrev.disabled = urlPrev === null;
    buttonNext.disabled = urlNext === null;
  } catch (error) {
    mostrarError(error);
  }
};

selectResultats.addEventListener("change", () => {
  carregarPokemons(`${URL_API}?limit=${selectResultats.value}`);
});

buttonPrev.addEventListener("click", () => {
  if (urlPrev) carregarPokemons(urlPrev);
});

buttonNext.addEventListener("click", () => {
  if (urlNext) carregarPokemons(urlNext);
});

carregarPokemons(`${URL_API}?limit=${selectResultats.value}`);