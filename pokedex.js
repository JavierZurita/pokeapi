
const divPokemonList$$ = document.querySelector('.pokemon--list');
const inputName$$ = document.querySelector('.filter--name');
const inputType$$ = document.querySelector('.filter--type');
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
            <div class="pokemon__header--types">`;
    for (let i = 0; i < content.types.length; i++){
        html += `<div class="pokemon__types--icon ${content.types[i].type.name}--icon"></div>`;
    }
    html += `</div>     
            </div>
            <div class="pokemon__img zoom">
                <img src="${content.sprites.front_default}" alt="imagen-${content.name}" class="image--poke">
            </div>
            <div class="pokemon__name"><h3>${content.name[0].toUpperCase()}${content.name.slice(1)}</h3></div>  
            <div class="pokemon__types">`;

    for (let i = 0; i < content.types.length; i++){
                html += `<div class="pokemon__types--text ${content.types[i].type.name}--text "></div>`
                }
    html += `
        </div>
    `

    let divPokemon$$ = document.createElement('div');
    divPokemon$$.className = "pokemon";
    divPokemon$$.innerHTML = html;

    divPokemonList$$.appendChild(divPokemon$$);
}

const filterName = () =>{

    divPokemonList$$.innerHTML="";

    console.log(inputName$$.value);
        
        for (let i = 0; i < pokeArray.length; i++) {
            console.log(pokeArray[i]);
            if(pokeArray[i].name.includes(inputName$$.value.toLowerCase())){
                drawPoke(pokeArray[i]);
            }
        }    
} 

const filterType = () =>{

    divPokemonList$$.innerHTML="";

    console.log(inputType$$.value);
    
        for (let i = 0; i < pokeArray.length; i++) {
            for(let j = 0; j < pokeArray[i].types.length; i++){
                if(pokeArray[i].types[j].type.name.includes(inputType$$.value.toLowerCase())){
                    drawPoke(pokeArray[i]);
                }
             }
        }    
}

getPokemon();

inputName$$.addEventListener('input',filterName);
inputType$$.addEventListener('input',filterType);
