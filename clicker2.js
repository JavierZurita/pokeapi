let baseUrl = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=151";

const catchBtn$$ = document.querySelector('.catch-button');
const countP$$ = document.querySelector('.catch-count');
// const divClicker$$ = document.querySelector('.clicker');
const divCenter$$ = document.querySelector('.clicker__center');
const imgPoke$$ = document.querySelector('.pokeball');
const btnsUpgrade$$ = document.querySelectorAll('.upgrade');

let i = 0, j = 0;
let count = 0;
let pulse = 1;
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
function zoomIn(btn) {
    btn.style.transform = "scale(1.2)"; // aumenta el tamaño en un 20%
    setTimeout(function() {
      btn.style.transform = "scale(1)"; // restablece el tamaño original después de 300ms
    }, 300);
  }
catchBtn$$.addEventListener('click', (event) => {

    count += pulse;
    countP$$.textContent = count;
    let cada5 = parseInt(count/5);
    console.log(cada5);
    if(i >= 150){
            
            event.target.parentNode.parentNode.parentNode.remove();

            const divClicker$$ = document.createElement('div');
            document.body.appendChild(divClicker$$);
            divClicker$$.innerHTML = `
                <div class="final">
                    <h2>You caught them  all!</h2>
                </div>`;
        }
    if( cada5 > i){
        while(i < cada5){

            let catchPoke = arrayPoke[i];
            i++;
            let img$$ = document.createElement('img');
            img$$.setAttribute('src',catchPoke.sprites.versions['generation-v']['black-white'].animated.front_default);
            divCenter$$.appendChild(img$$);
        }
    }
    

});

btnsUpgrade$$[0].addEventListener('click', (event) => {
    if(count >= 10){ 
        pulse *= 2;
        event.target.parentNode.remove();

        count -= 10;
        countP$$.textContent = count;
    }
});
btnsUpgrade$$[1].addEventListener('click', (event) => {
    if(count >= 20){ 
        pulse *= 2;
        event.target.parentNode.remove();

        count -= 20;
    countP$$.textContent = count;

    }
});
btnsUpgrade$$[2].addEventListener('click', (event) => {
    if(count >= 40){ 
        pulse *= 4;
        event.target.parentNode.remove();

        count -= 40;
    countP$$.textContent = count;

    }
});

init(baseUrl);

