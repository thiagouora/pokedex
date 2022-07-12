const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`


const generatePokemonPromises = () => Array(721).fill().map((_, index) =>
    fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const fetchPokemon = () => {
    const pokemonPromises = generatePokemonPromises()
    // for (let i = 1; i <= 721; i++) {
    //     pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))    
    // }
    Promise.all(pokemonPromises)
        .then(pokemons => {
            //Gerando as Li
            return pokemons.reduce((accumulator, pokemon) => {
                const types = pokemon.types.map(typeInfo => typeInfo.type.name)
                
                accumulator += `
                <li class="card ${types[0]}">
                <img class="card-imag" alt ="${pokemon.name}" src ="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/ultra-sun-ultra-moon/${pokemon.id}.png">
                <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                <p class="card-subtitle">${types.join(' | ')}</p>
                </li>`
                return accumulator
            }, '')
        })
        // inserindo Li na pagina
        .then(pokemons => {
            const ul = document.querySelector('[data-js="pokedex"]')
            ul.innerHTML = pokemons
        })
}
fetchPokemon()

function caixaDePesquisa() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("pesquisa");
    filter = input.value.toUpperCase();
    ul = document.getElementById("pokedex");
    li = ul.getElementsByTagName("li");  
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("h2")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }