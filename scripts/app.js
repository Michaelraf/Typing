import { texts } from "./texts.js";
import { Timer } from "./timer.js";

const timerElt = document.getElementById('timer');
let timer = new Timer(timerElt);
const container = document.getElementById('container');
let container1 = document.createElement('div');
const resultElt = document.getElementById('resultContainer');
const wpmElt = document.getElementById('wpm')
const accuracyElt = document.getElementById('accuracy')
const timeElt = document.getElementById('time')
const retryElt = document.getElementById('retry');

container1.id = 'container-1';
let letterContainers = [];

function renderText(text) {
    let words = text.split(' ');
    for (let i = 0; i < words.length - 1; i++) {
        let wordContainer = document.createElement('div');
        let lastSpace = document.createElement('div');
        lastSpace.classList.add("untyped");
        lastSpace.innerText = ' ';
        wordContainer.classList.add("word");
        for (let letter of words[i]) {
            let letterContainer = document.createElement('div');
            letterContainer.classList.add('untyped')
            letterContainer.innerText = letter;
            wordContainer.appendChild(letterContainer);
        }
        wordContainer.appendChild(lastSpace);
        container1.appendChild(wordContainer);
    }
    let wordContainer = document.createElement('div');
    wordContainer.classList.add("word");
    for (let letter of words[words.length - 1]) {
        let letterContainer = document.createElement('div');
        letterContainer.classList.add('untyped')
        letterContainer.innerText = letter;
        wordContainer.appendChild(letterContainer);
    }
    container1.appendChild(wordContainer);
    container.appendChild(container1);
    letterContainers = document.querySelectorAll(".untyped");
    let wordElementHeight = wordContainer.getBoundingClientRect().height + 7;
    // container element should contain 13 lines of word
    container.style.height = 13 * wordElementHeight + 20 + 'px';
}

function eventHandler(text) {
    let index = 0;
    let countError = 0;
    let error = false;
    let begin = false;
    let beginTime = 0;
    let typed = 0;
    container1.style.height = container1.getBoundingClientRect().height * 2 + "px";
    letterContainers[index].scrollIntoView();
    letterContainers[index].classList.add("turn");
    document.addEventListener("keydown", (e) => {
        if (/^[a-zA-Z0-9]$|^\W$|^_$/.test(e.key) || e.key === "Backspace") {
            e.preventDefault();
            if (!begin) {
                beginTime = new Date().getTime();
                begin = true;
                // begin timer
                timer.set();
            }
            if (0 <= index && index <= letterContainers.length) {
                if (e.key === "Backspace") {
                    if (!!text[index - 1]) {
                        if (!!text[index])
                            letterContainers[index].classList.remove("turn");
                        letterContainers[index - 1].classList.remove("typed");
                        letterContainers[index - 1].classList.remove("error");
                        letterContainers[index - 1].classList.add("untyped");
                        letterContainers[index - 1].classList.add("turn");
                        letterContainers[index - 1].scrollIntoView({ behavior: 'smooth' })
                        error = false;
                        index--;
                    }
                }
                else if (!error) {
                    if (e.key === text[index]) {
                        letterContainers[index].classList.remove("untyped");
                        letterContainers[index].classList.add("typed");
                        letterContainers[index].classList.remove("turn");
                        typed++;
                        index++;
                        if (!!text[index]) {
                            letterContainers[index].classList.add("turn");
                            letterContainers[index].scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                    else {
                        if (!!letterContainers[index]) {
                            letterContainers[index].classList.remove("untyped");
                            letterContainers[index].classList.add("typed");
                            letterContainers[index].classList.remove("turn");
                            letterContainers[index].classList.add("error");
                            letterContainers[index].scrollIntoView({ behavior: 'smooth' });
                            countError++;
                            typed++;
                            error = true;
                            index++;

                        }
                        if (text[index])
                            letterContainers[index].classList.add("turn");
                    }
                }
            }

            if (!error && index === text.length) {
                // end timer
                timer.close();

                letterContainers[index - 1].classList.remove("turn");
                let finishTime = new Date().getTime();
                let accuracy = Math.round((typed - countError) * 100 / typed)
                let time = finishTime - beginTime;
                let wpm = Math.round(((typed / 5) * 60000) / time)
                resultElt.style.opacity = 1;
                wpmElt.innerText = wpm;
                accuracyElt.innerText = accuracy + '%';
                let minute = Math.floor(time / 60000);
                let second = Math.floor((time - (minute * 60000)) / 1000);
                timeElt.innerText = minute + ' min ' + second + " s";
            }
        }
    })
}


async function run() {
    // Getting a random text from text.json
    let text = texts[Math.floor(Math.random() * texts.length)].history;
    text = "Salut toi";
    renderText(text);
    eventHandler(text);
}

// Default run
run();

// Run after click on the retry button
retryElt.addEventListener('click', () => {
    timer.time = 0;
    container1.innerHTML = '';
    letterContainers = [];
    timerElt.innerText = '0 : 00'
    resultElt.style.opacity = 0;
    run();
});