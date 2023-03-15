let baseUrl = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=151";

let superPath = "./assets/clicker/superball.png";
let ultraPath = "./assets/clicker/ultraball.png";
const catchBtn$$ = document.querySelector('.catch-button');
const countP$$ = document.querySelector('.catch-count');
const div$$ = document.querySelector('.div--img');
const imgPoke$$ = document.querySelector('.pokeball');
let count = 0;
const arrayPoke = [];

const init = async (url) => {

    const response = await fetch(url);
    const responseJson = await response.json();

    for (let i = 0; i < responseJson.results.length; i++) {
        
        const response1 = await fetch(responseJson.results[i].url);
        const responseJson1 = await response1.json();
        
        arrayPoke.push(responseJson1);
    }
}

catchBtn$$.addEventListener('click', () => {

    count++;
    countP$$.textContent = count;
    let catchPoke = arrayPoke[Math.floor(Math.random() * arrayPoke.length)];

    let p$$ = document.querySelector('.message');
    p$$.textContent = `You've capture a ${catchPoke.name}`;
    let img$$ = document.createElement('img');

    img$$.setAttribute('src',catchPoke.sprites.versions['generation-v']['black-white'].animated.front_default);
    div$$.appendChild(img$$);

    if(count == 10){
        //imgPoke$$.innerHTML = `<img src="${superPath}" class="pokemon">`
        imgPoke$$.setAttribute('src', superPath);
    } else if(count == 25){
        imgPoke$$.setAttribute('src', ultraPath);
    }
});

init(baseUrl);

