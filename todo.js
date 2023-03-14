
const input$$ = document.querySelector('input');
const list$$ = document.querySelector('ul');
const btnAdd$ = document.querySelector('.btn-add');
const task$$ = document.querySelector('.empty');

btnAdd$.addEventListener('click', () => {
    if(input$$.value != ""){
        let li$$ = document.createElement('li');
        li$$.textContent = input$$.value;

        let deleteBtn$$ = document.createElement('button');
        deleteBtn$$.className = "deleteBtn";
        deleteBtn$$.textContent = "X";

        list$$.appendChild(li$$);
        li$$.appendChild(deleteBtn$$);

        deleteBtn$$.addEventListener('click', (event) => {
            event.target.parentNode.remove();
            comprobe(list$$);
        });
        
        comprobe(list$$);
        input$$.value = "";
    }
});

const comprobe = (list) => {
    if(list.childElementCount >= 1 ){
        console.log("rellena");
        task$$.className = "invisible";
    } else {
        console.log("vacia");
        task$$.className = "empty";
    }
}