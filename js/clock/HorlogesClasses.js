//Partie heure
class Datetime{
    weekday = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
    monthNames = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];

    datetime;
    today = new Date();
    time = this.timeToStr(this.today.getHours(), this.today.getMinutes(), this.today.getSeconds());
    date = this.weekday[this.today.getDay()] + " " + this.today.getDate() + " " + this.monthNames[this.today.getMonth()] + " " + this.today.getFullYear() ;

    divT = document.getElementById("time");
    divD = document.getElementById("date");

    constructor(){
        this.divT.innerHTML = this.time;
        this.divD.innerHTML = this.date;

        this.datetime = setInterval(() => {
            let today2 = new Date();
        
            let time2 = this.timeToStr(today2.getHours(), today2.getMinutes(), today2.getSeconds());
            this.divT.innerHTML = time2;
        }, 1000);
    }

    timeToStr(hour, min, sec){
        if(hour < 10){
            hour = "0" + hour;
        }
        if(min < 10){
            min = "0" + min;
        }
        if(sec < 10){
            sec = "0" + sec;
        }
        return hour + ":" + min + ":" + sec;
    }

    dropInterval(){
        clearInterval(this.datetime);
    }
}

class Chrono{
    btn = document.getElementById("btn");
    tour = document.getElementById("rt");

    mil = 0;
    sec = 0;
    min = 0;
    hour = 0;
    isOn = false;
    chrono;
    nbrTour = 0;

    constructor(){
        this.btn.addEventListener('click', e => {
            if(this.sec == 0){
                this.tour.style.display = 'block';
            }
            if(!this.isOn){
                this.tour.innerHTML = "TOUR";
                this.start();
                this.btn.innerHTML = "STOP";
            }else{
                this.tour.innerHTML = "RESET";
                this.stop();
                this.btn.innerHTML = "START";
            }
        });

        this.tour.addEventListener('click', e => {
            let div = document.getElementById("listTour");
            if(this.isOn){
                this.nbrTour += 1;
                let tours = document.createElement("span");
                tours.innerHTML = "Tour n°" + this.nbrTour + " /\/\ " + this.hour + " : " + this.min + " : " + this.sec + " . " + this.mil;
                div.appendChild(tours);
            }else{
                div.innerHTML = '';
                this.tour.style.display = 'none';
                this.clear();
            }
        });
    }

    start(){
        this.isOn = true;
        this.chrono =  setInterval(() => {
            this.mil += 1;
            if(this.mil == 100){
                this.sec += 1;
                this.mil = 0;
            }
            if(this.sec == 60){
                this.min += 1;
                this.sec = 0;
            }
            if(this.min == 60){
                this.hour += 1;
                this.min = 0;
            }
            this.setTextChrono();
        }, 10);
    }

    stop(){
        this.isOn = false;
        clearInterval(this.chrono);
    }

    clear(){
        this.nbrTour = 0;
        this.mil = 0;
        this.sec = 0;
        this.min = 0;
        this.hour = 0;
        this.setTextChrono();
    }

    setTextChrono(){
        let visu = document.getElementById("chrono");
        visu.innerHTML = this.hour + " : " + this.min + " : " + this.sec + " . " + this.mil;
    }

    dropInterval(){
        clearInterval(this.chrono);
    }
}

class Timer{
    //BTN TIMER
    startBtn = document.getElementById("start");
    pause = document.getElementById("pause");
    resetBtn = document.getElementById("reset");

    //ATT TIMER
    timer;
    isOn = false;
    sec = 0;
    min = 0;
    nptS = document.getElementById("sec");
    nptM = document.getElementById("min");

    constructor(){
        this.startBtn.addEventListener('click', e => {
            this.getTime();
            this.setTextTimer();
        
            if(this.sec > 0 || this.min > 0){
                this.nptStmt(true);
                this.start();
        
                this.startBtn.style.display = "none";
                this.pause.style.display = "block";
                this.resetBtn.style.display = "block";
            }
        });
        this.resetBtn.addEventListener('click', e => {
            this.min = 0;
            this.sec = 0;
            this.setTextTimer();
            this.nptStmt(false);
            this.reset();
            this.btnDisplay();
            
        });
        this.pause.addEventListener('click', event => {
            if(this.isOn){
                pause.innerHTML = "RUN";
                this.isOn = false;
            }else{
                pause.innerHTML = "PAUSE";
                this.isOn = true;
            }
        });
    }

    start(){
        this.isOn = true;
        this.timer = setInterval(() => {
            if(this.isOn){
                this.sec -= 1;
                if(this.sec == -1){
                    this.min -= 1;
                    this.sec = 59;
                }
                this.setTextTimer();
                if(this.sec == 0 && this.min == 0){
                    this.btnDisplay();

                    clearInterval(this.timer);
                    let audio = new Audio('timer2.mp3');
                    audio.play();
                    this.nptStmt(false);
                }
            }
        }, 1000);
    }

    reset(){
        clearInterval(this.timer);
    }

    getTime(){
        this.sec = this.nptS.value;
        this.min = this.nptM.value;
    }

    setTextTimer(){
        let divTimer = document.getElementById("timer");
        divTimer.innerHTML = this.min + " : " + this.sec;

    }

    nptStmt(bool){
        this.nptS.disabled = bool;
        this.nptM.disabled = bool;
    }

    btnDisplay(){
        this.startBtn.style.display = "block";
        this.pause.style.display = "none";
        this.resetBtn.style.display = "none";
    }

    dropInterval(){
        clearInterval(this.timer);
    }
}