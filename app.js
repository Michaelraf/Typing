import { texts } from "./texts.js";

const container = document.getElementById('container');
let spans = [];


function renderText(text) {
    for (let letter of text) {
        let span = document.createElement('span');
        span.classList.add('untyped')
        span.innerText = letter;
        container.appendChild(span);
    }
    spans = document.querySelectorAll(".untyped");
}

function eventHandler() {
    return new Promise((resolve, reject) => {
        let index = 0;
        let countError = 0;
        let error = false;
        let begin = false;
        let beginTime = 0;
        let typed = 0;
        spans[index].classList.add("turn");
        document.addEventListener("keydown", (e) => {
            if(!begin){
                beginTime = new Date().getTime();
                begin = true;
            }
            if(e.key === "\'")
                e.preventDefault();
            if (index > 0 && index <= spans.length && e.key === "Backspace") {
                index--;
                if (spans[index].classList.contains("error")){
                    spans[index].classList.remove("error");
                    error = false;
                }
                if(!!spans[index+1]){
                    spans[index+1].classList.remove("turn");
                    spans[index].classList.add("turn")
                }
                spans[index].classList.remove("typed");
                spans[index].classList.add("untyped");
            }
            else if (!error && index >= 0 && index < spans.length) {

                if ( e.key === spans[index].innerText || (e.key === "Enter" && spans[index].innerHTML === "<br>")) {
                    spans[index].classList.remove("untyped");
                    spans[index].classList.add("typed");
                    if(!!spans[index+1]){
                        spans[index].classList.remove("turn");
                        spans[index+1].classList.add("turn")
                    }
                    index++;
                    typed++;
                }
                else if (e.key != "CapsLock" && e.key != "Shift") {
                    spans[index].classList.remove("untyped");
                    spans[index].classList.add("typed");
                    spans[index].classList.add("error");
                    error = true;
                    countError++;
                    index++;
                    typed++;
                }
            }
            if (!error && index === spans.length) {
                let finishTime = new Date().getTime();
                let accuracy = Math.floor((typed-countError)*100/typed)
                let time = finishTime - beginTime;
                let wpm = Math.floor(((typed/5)*60000)/time)
                resolve({
                    typed,
                    error: countError,
                    accuracy,
                    time,
                    wpm
                });
            }
        })
    })
}

async function run() {
    // Getting a random text from text.json
    renderText(texts[Math.floor(Math.random()*texts.length)].history);
    // renderText("Salut toi");
    let result = await eventHandler();
    console.log(result);
}

run();