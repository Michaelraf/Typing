import { texts } from "./texts.js";
import { Timer } from "./timer.js";
import { Renderer } from "./textRender.js";
import { Handler } from "./event.js";
import { run } from "./run.js"

let timer = new Timer();
let renderer = new Renderer();
let handler = new Handler();

// Default run
run(texts, handler, renderer, timer);

// Run after click on the retry button
retryElt.addEventListener('click', () => {
    timer.time = 0;
    container1.innerHTML = '';
    letterContainers = [];
    timerElt.innerText = '0 : 00'
    resultElt.style.opacity = 0;
    run(texts, handler, renderer, timer);
});