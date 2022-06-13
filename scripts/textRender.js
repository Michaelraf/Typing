export class Renderer {
    constructor(){
    }
    render(text){
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
}