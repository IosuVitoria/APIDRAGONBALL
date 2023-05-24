/*Vamos a usar de nuevo JSON SERVER para crear un listado de personajes de la serie Dragon Ball.

Para ello, ejecutemos `json-server --watch exercise-4.json`. En este caso el endpoint con los personajes es `http://localhost:3000/characters`.
La idea es crear una galería con los planetas, que podemos obtener del endpoint `http://localhost:3000/planets` y, 
que si el usuario hace click en alguno de los planetas, salga debajo los personajes que están asociados por el .idPlanet a ese planeta en cuestión, 
mostrando tanto sus imágenes .avatar como sus nombres .name. Para poder obtener la información de los personajes podemos hacer un filtro de los personajes llamando a la url, 
por ejemplo `http://localhost:3000/characters?idPlanet=1` y, teniendo en cuenta que el idPlanet variará dependiendo del planeta seleccionado.
 
Además de esto, agrega un buscador para poder filtrar los personajes por nombre una vez que has seleccionado el planeta. 
Por lo tanto, deberemos incluir el input debajo del planeta y encima de los personajes listados.

Como extra podríamos hacer que si haces click a un personaje salga la descripción debajo. 
Como extra del extra haz que la descripción se oculte si vuelves a hacer click en el mismo personaje.*/


//1º Generar variables en base a necesidades. Se toman los 3 elementos del html, la URL y la variable que me guardará los caracteres filtrados.

const planets$$ = document.querySelector('[data-function="planets"]');
const characters$$ = document.querySelector('[data-function="characters"]');
const search$$ = document.querySelector('[data-function="search"]');
const baseUrl = 'http://localhost:3000/';
let actualCharacters = [];

//2º Primera petición al servidor. Sacar los planetas que haya en la base de datos y generarlos. Hay dos callbacks uno para crear el planeta y otro para filtrar los personajes por planeta.

function planets() {
  fetch(baseUrl + "planets")
    .then(res => res.json())
    .then(planets => {
      for (const planet of planets) {
        const planet$$ = createPlanetElement(planet);
        planet$$.addEventListener('click', () => warriorsFiltered(planet.id));
        planets$$.appendChild(planet$$);
      }
    });
}

//3º Generamos un filtrado de los guerreros Z. Esto ocurre tras la ejecución Llamamos 

function warriorsFiltered(idPlanet) {
  fetch(baseUrl + "characters?idPlanet=" + idPlanet)
    .then(res => res.json())
    .then(characters => {
      actualCharacters = characters;
      createSearch();
      printCharacters(characters);
    });
}

//4º Genero el espacio que me permitirá buscar los guerreros que necesite en función del planeta que pulse el usuario. Agrego el callback desde aquí para que se ejecute si hago click.

function createSearch() {
  search$$.innerHTML = '';
  const input$$ = document.createElement("input");
  const button$$ = document.createElement("button");
  button$$.textContent = "Buscar";
  button$$.addEventListener("click", () => filterCharacters(input$$.value));
  search$$.appendChild(input$$);
  search$$.appendChild(button$$);
}

//5º Aplico el filtro a los caracteres y hago el callback para pintarlos.

function filterCharacters(searchValue) {
  const filteredCharacters = actualCharacters.filter(character =>
    character.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  printCharacters(filteredCharacters);
}

//6º Pintado de los caracteres. Le agrego además un evento toogle que me permita ver la descripción del mismo.

function printCharacters(characters) {
  characters$$.innerHTML = '';
  for (const character of characters) {
    const character$$ = createCharacterElement(character);
    character$$.addEventListener("click", () => toggleCharacterDescription(character$$, character.description));
    characters$$.appendChild(character$$);
  }
}

//7º Control de exposición de la descripción.

function toggleCharacterDescription(character$$, description) {
  const descriptionElement = character$$.querySelector("p");
  if (descriptionElement) {
    descriptionElement.remove();
  } else {
    const p$$ = document.createElement("p");
    p$$.textContent = description;
    character$$.appendChild(p$$);
  }
}

//8º Se crean las funciones que me faltan para responder a los callbacks..

function createPlanetElement(planet) {
  const planet$$ = document.createElement('div');
  planet$$.innerHTML = `
    <img height="200" src="${planet.image}"/>
    <h2>${planet.name}</h2>
  `;
  return planet$$;
}

function createCharacterElement(character) {
  const character$$ = document.createElement('div');
  character$$.innerHTML = `
    <img height="200" src="${character.avatar}"/>
    <h2>${character.name}</h2>
  `;
  return character$$;
}

planets();