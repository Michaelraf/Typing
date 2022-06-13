export class Handler {
    constructor() {
    }
    init(text, timer) {
        document.timer = timer; // directly on the document that will be the "this" of the method listener
        document.text = text;
        index = 0;
        countError = 0;
        error = false;
        begin = false;
        beginTime = 0;
        typed = 0;
        container1.style.height = container1.getBoundingClientRect().height * 2 + "px";
        letterContainers[index].scrollIntoView();
        letterContainers[index].classList.add("turn");
        document.addEventListener("keydown", this.listener)
        
    }
    listener(e) {
        if (/^[a-zA-Z0-9]$|^\W$|^_$/.test(e.key) || e.key === "Backspace") {
            e.preventDefault();
            if (!begin) {
                beginTime = new Date().getTime();
                begin = true;
                // begin timer
                this.timer.set();
            }
            if (0 <= index && index <= letterContainers.length) {
                if (e.key === "Backspace") {
                    if (!!this.text[index - 1]) {
                        if (!!this.text[index])
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
                    if (e.key === this.text[index]) {
                        letterContainers[index].classList.remove("untyped");
                        letterContainers[index].classList.add("typed");
                        letterContainers[index].classList.remove("turn");
                        typed++;
                        index++;
                        if (!!this.text[index]) {
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
                        if (this.text[index])
                            letterContainers[index].classList.add("turn");
                    }
                }
            }

            if (!error && index === this.text.length) {
                // remove eventListener
                document.addEventListener("keydown", this.listener)

                // end this.timer
                this.timer.close();

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
    }
}
