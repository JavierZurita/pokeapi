let baseUrl = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=151";

const divPokemonList$$ = document.querySelector('.pokemon--list');
const inputName$$ = document.querySelector('.filter--name');
const inputType$$ = document.querySelector('.filter--type');
const btnnext$$ = document.querySelector('.btn--next');
const pokeArray = [];

const init = async (url) => {

    const response = await fetch(url);
    const responseJson = await response.json();

    for (let i = 0; i < responseJson.results.length; i++) {
        
        const response1 = await fetch(responseJson.results[i].url);
        const responseJson1 = await response1.json();
        drawPoke(responseJson1);
        pokeArray.push(responseJson1);
    }
    console.log(pokeArray);
}


const drawPoke = (content) => {

    let percenHp = (content.stats[0].base_stat*100)/255;
    let percenAtt = (content.stats[1].base_stat*100)/255;
    let percenDef = (content.stats[2].base_stat*100)/255;
    let percenSpAtt = (content.stats[3].base_stat*100)/255;
    let percenSpDef = (content.stats[4].base_stat*100)/255;
    let percenSpd = (content.stats[5].base_stat*100)/255;

    let html = `
    <div class="pokemon zoom flip--card--inner">
        <div class="flip--card--inner--front">
            <div class="pokemon__header">
            <div class="pokemon__header--p"><p>#${content.id.toString().padStart(3,0)}</p></div>
            <div class="pokemon__header--types">`;
    for (let i = 0; i < content.types.length; i++){
        //html += `<div class="pokemon__types--icon ${content.types[i].type.name}--icon"></div>`;
        html += `<img src="./assets/pokemonTypes/icons/${content.types[i].type.name}.jpg" >`
    }
    html += `</div>     
            </div>
            <div class="pokemon__img">
                <img src="${content.sprites.front_default}" alt="imagen-${content.name}" class="image--poke">
            </div>
            <div class="pokemon__name"><h3>${content.name[0].toUpperCase()}${content.name.slice(1)}</h3></div>  
            <div class="pokemon__types">`;

    for (let i = 0; i < content.types.length; i++){
                html += `<div class="pokemon__types--text ${content.types[i].type.name}--text "><img src="./assets/pokemonTypes/texts/${content.types[i].type.name}.jpg"></div>`
                }
    html += `
            </div>
        </div>

        <div class="flip--card--inner--back">
            <div class="pokemon--back">
                <div class="pokemon__img--back">
                    <img src="${content.sprites.versions['generation-v']['black-white'].animated.front_default}" class="image--poke">
                </div>
                <h2>Base Stats</h2>
                <div class="stats">
                    <div class="stats--number">
                        <div class="stats--hp">
                            <p>Hp: ${content.stats[0].base_stat}</p>
                        </div>
                        <div class="stats--atck">
                            <p>Att: ${content.stats[1].base_stat}</p>
                        </div>
                        <div class="stats--spatack">
                            <p>Def: ${content.stats[2].base_stat}</p>
                        </div>
                        <div class="stats--dfc">
                            <p>Sp.Att: ${content.stats[3].base_stat}</p>
                        </div>
                        <div class="stats--spdfc">
                            <p>Sp.Def: ${content.stats[4].base_stat}</p>
                        </div>
                        <div class="stats--spd">
                            <p>Spd: ${content.stats[5].base_stat}</p>
                        </div>
                    </div>    
                    <div class="stats--bar">
                            <div class="progress"><div class="progressbar" style="width:${percenHp}%"></div></div>
                            <div class="progress"><div class="progressbar" style="width:${percenAtt}%"></div></div>
                            <div class="progress"><div class="progressbar" style="width:${percenDef}%"></div></div>
                            <div class="progress"><div class="progressbar" style="width:${percenSpAtt}%"></div></div>
                            <div class="progress"><div class="progressbar" style="width:${percenSpDef}%"></div></div>
                            <div class="progress"><div class="progressbar" style="width:${percenSpd}%"></div></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `

    let divPokemon$$ = document.createElement('div');
    divPokemon$$.className = "pokemon flip--card";
    divPokemon$$.innerHTML = html;

    divPokemonList$$.appendChild(divPokemon$$);
}



const filter = () =>{
    divPokemonList$$.innerHTML="";

    for (let i = 0; i < pokeArray.length; i++) {
        if(pokeArray[i].types.length === 1 ){
            if(pokeArray[i].types[0].type.name.includes(inputType$$.value.toLowerCase()) && pokeArray[i].name.includes(inputName$$.value.toLowerCase())){
                drawPoke(pokeArray[i]);
            }
        } else {
            if(pokeArray[i].types[0].type.name.includes(inputType$$.value.toLowerCase()) && pokeArray[i].name.includes(inputName$$.value.toLowerCase())
             || pokeArray[i].types[1].type.name.includes(inputType$$.value.toLowerCase()) && pokeArray[i].name.includes(inputName$$.value.toLowerCase())){
                drawPoke(pokeArray[i]);
            }
        }
    }
}


init(baseUrl);

inputName$$.addEventListener('input',filter);
inputType$$.addEventListener('input',filter);