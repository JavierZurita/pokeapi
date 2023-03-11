
const divPokemonList$$ = document.querySelector('.pokemon--list');
const input$$ = document.querySelector('input');
const pokeArray = [];
const getPokemon = async () => {

    const response = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=151");
    const responseJson = await response.json();

    for (let i = 0; i < responseJson.results.length; i++) {

        console.log(responseJson.results[i].url);

        const response1 = await fetch(responseJson.results[i].url);
        const responseJson1 = await response1.json();
     
        console.log(responseJson1.name);
       drawPoke(responseJson1);
       pokeArray.push(responseJson1);
    }
}


const drawPoke = (content) => {

    let html = `
    <div class="pokemon zoom">
            <div class="pokemon__header">
            <div class="pokemon__header--p"><p>#${content.id.toString().padStart(3,0)}</p></div>
            <div class="pokemon__header--img"><h3>${content.name[0].toUpperCase()}${content.name.slice(1)}</h3></div>       
            </div>
            <div class="pokemon__img zoom">
                <img src="${content.sprites.front_default}" alt="imagen-${content.name}" class="image--poke">
            </div>
            <div class="pokemon__types">`

    for (let i = 0; i < content.types.length; i++){
                html += `<div class="pokemon__types--div">
                            <div class="pokemon__types--icon ${content.types[i].type.name}--text "></div>
                            <div class="pokemon__types--icon ${content.types[i].type.name}--icon"></div>
                        </div> `
                }
    html += `
        </div>
    `

    let divPokemon$$ = document.createElement('div');
    divPokemon$$.className = "pokemon";
    divPokemon$$.innerHTML = html;

    divPokemonList$$.appendChild(divPokemon$$);
}

const filter = () =>{

    divPokemonList$$.innerHTML="";

    console.log(input$$.value);
        
        for (let i = 0; i < pokeArray.length; i++) {
            if(pokeArray[i].name.includes(input$$.value.toLowerCase())){
                drawPoke(pokeArray[i]);
            }
        }    
} 


getPokemon();

input$$.addEventListener('input',filter);
