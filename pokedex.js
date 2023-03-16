let baseUrl = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1008";

const divPokemonList$$ = document.querySelector('.pokemon--list');
const inputName$$ = document.querySelector('.filter--name');
const inputType$$ = document.querySelector('#filter--type');
const inputGen$$ = document.querySelector('#filter--gen');
const btnNxt$$ = document.querySelector('.btn--nxt');
const btnPrev$$ = document.querySelector('.btn--prev');
let page = 1;
const pokeArray = [];

const init = async (url) => {
    btnPrev$$.className = "empty";
    const response = await fetch(url);
    const responseJson = await response.json();
    
    for (let i = 0; i < responseJson.results.length; i++) {
        
        const response1 = await fetch(responseJson.results[i].url);
        const responseJson1 = await response1.json();
        pokeArray.push(responseJson1);
        if(i<151){
            drawPoke(pokeArray[i]);
        }
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
            <div class="pokemon__name"><h4>${content.name[0].toUpperCase()}${content.name.slice(1)}</h4></div>  
            <div class="pokemon__types">`;

    for (let i = 0; i < content.types.length; i++){
                // html += `<div class="pokemon__types--text ${content.types[i].type.name}--text "></div>`  
                html += `<img src="./assets/pokemonTypes/texts/${content.types[i].type.name}.jpg">`
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

const filter = () => {
    inputGen$$.value = 0;
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

const filterGen = () => {
    inputType$$.value = "";
    divPokemonList$$.innerHTML="";
    console.log(inputGen$$.value);

    if(inputGen$$.value == 1){
        page == 1;
            btnNxt$$.className = "btn--nxt";
            btnPrev$$.className = "empty";
            for(let i = 0; i < 151; i++){ //check this
                drawPoke(pokeArray[i]);
            }
    } else if (inputGen$$.value == 2 ){
        btnPrev$$.className = "btn--prev";
        btnNxt$$.className = "btn--nxt";

        console.log("Enrta 2");

            page == 2;
            for(let i = 151; i < 251; i++){ //check this
                drawPoke(pokeArray[i]);
            }
    } else if (inputGen$$.value == 3){
        btnPrev$$.className = "btn--prev";
        btnNxt$$.className = "btn--nxt";

            page == 3;
            for(let i = 251; i < 386; i++){
                drawPoke(pokeArray[i]);
            }
    } else if (inputGen$$.value == 4){
        btnPrev$$.className = "btn--prev";
        btnNxt$$.className = "btn--nxt";

        page == 4;
        for(let i = 386; i < 494; i++){
            drawPoke(pokeArray[i]);
        }
    } else if (inputGen$$.value == 5){
        btnPrev$$.className = "btn--prev";
        btnNxt$$.className = "btn--nxt";

        page = 5;
            for(let i = 494; i < 649; i++){
                drawPoke(pokeArray[i]);
            }
    } else if (inputGen$$.value == 6){
        btnPrev$$.className = "btn--prev";
        btnNxt$$.className = "btn--nxt";

        page = 6;    
            for(let i = 649; i < 721; i++){
                drawPoke(pokeArray[i]);
            }
    } else if (inputGen$$.value == 7){
        btnPrev$$.className = "btn--prev";
        btnNxt$$.className = "btn--nxt";

        page = 7;
        for(let i = 721; i < 809; i++){
            drawPoke(pokeArray[i]);
        }
    } else if (inputGen$$.value == 8){
        btnPrev$$.className = "btn--prev";
        btnNxt$$.className = "btn--nxt";
        page = 8;
            for(let i = 809; i < 905; i++){
                drawPoke(pokeArray[i]);
            }
    } else if (inputGen$$.value == 9){
            btnPrev$$.className = "btn--prev";
             btnNxt$$.className = "empty";
            page = 9;

            for(let i = 905; i < 1009; i++){
                drawPoke(pokeArray[i]);
            }
    }else if (inputGen$$.value == 0 ){
            page == 1;
        btnNxt$$.className = "btn--nxt";
        btnPrev$$.className = "empty"
            for(let i = 0; i < 1009; i++){ //check this
                drawPoke(pokeArray[i]);
            }
    }
}
const nextPage = () => {
    console.log(page);
    page += 1;

    if(page == 2){
        btnPrev$$.className = "btn--prev";
        divPokemonList$$.innerHTML = "";
        for(let i = 151; i < 251; i++){ //check this
            drawPoke(pokeArray[i]);
        }
    } else if (page == 3){
        divPokemonList$$.innerHTML = "";
        for(let i = 251; i < 386; i++){
            drawPoke(pokeArray[i]);
        }
    } else if (page == 4){
        divPokemonList$$.innerHTML = "";
        for(let i = 386; i < 494; i++){
            drawPoke(pokeArray[i]);
        }
    } else if (page == 5){
        divPokemonList$$.innerHTML = "";
        for(let i = 494; i < 649; i++){
            drawPoke(pokeArray[i]);
        }
    } else if (page == 6){
        divPokemonList$$.innerHTML = "";
        for(let i = 649; i < 721; i++){
            drawPoke(pokeArray[i]);
        }
    } else if (page == 7){
        divPokemonList$$.innerHTML = "";
        for(let i = 721; i < 809; i++){
            drawPoke(pokeArray[i]);
        }
    } else if (page == 8){
        divPokemonList$$.innerHTML = "";
        for(let i = 809; i < 905; i++){
            drawPoke(pokeArray[i]);
        }
    } else if (page == 9){
        divPokemonList$$.innerHTML = "";
        btnNxt$$.className = "empty";
        for(let i = 905; i < 1009; i++){
            drawPoke(pokeArray[i]);
        } 
    }
    window.scrollTo({top:0})
}

const prevPage = () => {
    console.log(page);
    page = page - 1;

    if(page == 1){
        btnPrev$$.className = "empty";
        divPokemonList$$.innerHTML = "";
        for(let i = 0; i < 151; i++){ //check this
            drawPoke(pokeArray[i]);
        }
    } else if(page == 2){
        divPokemonList$$.innerHTML = "";
        for(let i = 151; i < 251; i++){ //check this
            drawPoke(pokeArray[i]);
        }
    } else if (page == 3){
        divPokemonList$$.innerHTML = "";
        for(let i = 251; i < 386; i++){
            drawPoke(pokeArray[i]);
        }
    } else if (page == 4){
        divPokemonList$$.innerHTML = "";
        for(let i = 386; i < 494; i++){
            drawPoke(pokeArray[i]);
        }
    } else if (page == 5){
        divPokemonList$$.innerHTML = "";
        for(let i = 494; i < 649; i++){
            drawPoke(pokeArray[i]);
        }
    } else if (page == 6){
        divPokemonList$$.innerHTML = "";
        for(let i = 649; i < 721; i++){
            drawPoke(pokeArray[i]);
        }
    } else if (page == 7){
        divPokemonList$$.innerHTML = "";
        for(let i = 721; i < 809; i++){
            drawPoke(pokeArray[i]);
        }
    } else if (page == 8){
        btnNxt$$.className = "btn--nxt";
        divPokemonList$$.innerHTML = "";
        for(let i = 809; i < 905; i++){
            drawPoke(pokeArray[i]);
        }
    } else if (page == 9){
        divPokemonList$$.innerHTML = "";
        btnNxt$$.className = "empty";
        for(let i = 905; i < 1009; i++){
            drawPoke(pokeArray[i]);
        }
    }
    window.scrollTo({top:0})

}

init(baseUrl);

inputGen$$.addEventListener('input',filterGen);
inputName$$.addEventListener('input',filter);
inputType$$.addEventListener('input',filter);
btnNxt$$.addEventListener('click', nextPage);
btnPrev$$.addEventListener('click', prevPage);