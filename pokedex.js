
const getPokemon = async () => {

    const response = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=151");
    const responseJson = await response.json();

    for (let i = 0; i < responseJson.results.length; i++) {

        console.log(responseJson.results[i].url);

        const response1 = await fetch(responseJson.results[i].url);
        const responseJson1 = await response1.json();
     
        console.log(responseJson1.name);
        drawPoke(responseJson1);
    }
}

    const divPokemonList$$ = document.querySelector('.pokemon--list');

const drawPoke = (content) => {

    let divPokemon$$ = document.createElement('div');
    divPokemon$$.className = "pokemon";
    divPokemon$$.innerHTML = `
    <div class="pokemon">
            <div class="pokemon__header">
            <div class="pokemon__header--p"><p>${content.id}</p></div>
            <div class="pokemon__header--img"><h3>${content.name}</h3></div>       
            </div>
            <div class="pokemon__img">
                <img src="${content.sprites.front_default}" alt="imagen-${content.name}" class="image--poke">
            </div>
            <div class="pokemon__types">
                <div class="pokemon__types1">
                    <p class="pokemon__types1--p">${content.types[0].type.name}</p>
                    <img src="" alt="" class="pokemon__types1--img">
                </div>
                <div class="pokemon__types2">
                    <p class="pokemon__types2--p"></p>
                    <img src="" alt="" class="pokemon__types2--img">
                </div>
            </div>
        </div>
    `

    let pType1$$ = document.querySelector('.pokemon__types1--p');
    let pType2$$ = document.querySelector('.pokemon__types2--p');
    let pImg1$$ = document.querySelector('.pokemon__imgs1--p');
    let pImg2$$ = document.querySelector('.pokemon__imgs2--p');


  /*  
    if(content.types.length >= 2){
       console.log(content.types.length);
       console.log("Tipo 1:"+content.types[0].type.name);
       console.log("Tipo 2:"+content.types[1].type.name);

        pType2$$.textContent = content.types[1].type.name;
    }
*/
    divPokemonList$$.appendChild(divPokemon$$);
}

getPokemon();