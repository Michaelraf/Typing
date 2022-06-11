export class Timer{
    constructor(element){
        this.element = element;
        this.intervalID = 0;
        this.time = 0;
        this.minute = 0;
        this.second = 0;
    }
    set = function(){
        this.intervalID = window.setInterval(() => {
            this.time++;
            this.minute = Math.floor(this.time/60);
            this.second = this.time - (this.minute*60);
            if(this.second/10 < 1)
                this.element.innerText = this.minute + " : 0" + this.second;
            else
                this.element.innerText = this.minute + " : " + this.second;
        }, 1000);
    }

    close = function(){
        window.clearInterval(this.intervalID);
        console.log(this.time)
    }
}
