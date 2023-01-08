class Clock extends App{
    datetime;
    chrono;
    timer;

    constructor(){
        super("imgs/horloge.svg", "Horloge");
        this.window.setViewHtml(this.htmlApp());
    }

    openApp(){
        super.openApp();
        let btn = document.getElementsByClassName("page-btn");

        for(let aBtn of btn){
            aBtn.addEventListener("click", event =>{
                for(let aBtnn of btn){
                    aBtnn.classList.remove();
                    aBtnn.className = "page-btn";
                }

                aBtn.className = "page-btn active";
                let seg = document.getElementsByClassName("seg")[0].children;
                
                for(let aSeg of seg){
                    aSeg.style.zIndex = "1";
                }
                document.getElementsByClassName(aBtn.id)[0].style.zIndex = "2";
            });
        }
        this.datetime = new Datetime();
        this.chrono = new Chrono();
        this.timer = new Timer();
    }

    closeApp(){
        this.datetime.dropInterval();
        this.chrono.dropInterval();
        this.timer.dropInterval();
        delete this.datetime;
        delete this.chrono;
        delete this.timer;
        this.window.setViewHtml(this.htmlApp());
    }

    htmlApp(){
        return `
        <nav>
            <div id="heure" class="page-btn active">
                HEURE / DATE
            </div>
            <div id="chronometre" class="page-btn">
                CHRONOMETRE
            </div>
            <div id="minuteur" class="page-btn">
                MINUTEUR
            </div>
        </nav>
        <section class="seg">
            <div class="heure">
                <div id="date"></div>
                <div id="time"></div>
            </div>
            <div class="chronometre">
                <div class="chrono">
                    <span id="chrono">0 : 0 : 0 . 0</span>
                    <div id="chronoBtn">
                        <button id="btn">START</button><button class="rt" id="rt">TOUR</button>
                    </div>
                    <div class="tour" id="listTour">
        
                    </div>
                </div>
            </div>
            <div class="minuteur">
                <div>
                    <input type="number" id="min" min="0" max="59" value="0">
                    <input type="number" id="sec" min="0" max="59" value="0">
                    <div>
                        <button id="start">START</button>
                        <button id="pause">PAUSE</button>
                        <button id="reset">RESET</button>
                    </div>
                </div>
                <div id="timer">0 : 0</div>
            </div>
        </section>
        `;
    }
}