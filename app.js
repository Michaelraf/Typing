import { texts } from "./texts.js";

const container = document.getElementById('container');
let spans = [];
console.log(texts);


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
        let error = false;
        document.addEventListener("keydown", (e) => {
            if(e.key === "\'")
                e.preventDefault();
            if (index > 0 && index < spans.length && e.key === "Backspace") {
                index--;
                if (spans[index].classList.contains("error"))
                    spans[index].classList.remove("error");
                spans[index].classList.remove("typed");
                spans[index].classList.add("untyped");
                error = false;
            }
            else if (!error && (index >= 0 && index < spans.length)) {
                if (e.key === spans[index].innerText || (e.key === "Enter" && spans[index].innerHTML === "<br>")) {
                    spans[index].classList.remove("untyped");
                    spans[index].classList.add("typed");
                    index++;
                }
                else if (e.key != "CapsLock" && e.key != "Shift") {
                    spans[index].classList.remove("untyped");
                    spans[index].classList.add("typed");
                    spans[index].classList.add("error");
                    error = true;
                    index++;
                }
            }
            if (index === spans.length) {
                resolve(true);
            }
        })
    })
}

async function run() {
    // Getting a random text from text.json
    renderText(texts[Math.floor(Math.random()*texts.length)].history);
    let result = await eventHandler();
    console.log(result);
}

run();