class Window{
    /*WINDOW*/
    window = document.createElement("div");
    /*HEADER*/
    header = document.createElement("header");
    view = document.createElement("div");
    icon = document.createElement("div");
    btnM = document.createElement("div");
    /* btn header */
    btnR = document.createElement("div");
    btnMin = document.createElement("div");
    btnC = document.createElement("div");
    /**/
    mb = document.createElement("div");
    bg = document.createElement("div");
    /* Statement var */
    isOpen = true;
    fullScreen = true;
    onCorner = false;

    constructor(img){
        /*CLASS WINDOW A LA FENETRE*/
        this.window.className = "window";
        /*HEADER DE LA FENETRE*/
        this.icon.className = "icon";
        this.icon.style.backgroundImage = img;
        this.header.append(this.icon);
        this.btnM.className = "btnM";

        this.btnR.className = "btn";
        this.btnR.innerHTML = "-";
        this.btnM.append(this.btnR);
        this.btnMin.className = "btn";
        this.btnMin.innerHTML = "□";
        this.btnMin.style.textDecoration = "underline";
        this.btnM.append(this.btnMin);
        this.btnC.className = "btn";
        this.btnC.innerHTML = "x";
        this.btnM.append(this.btnC);
    
        this.header.append(this.btnM);
        this.window.append(this.header);

        this.view.className = "view";
        this.window.append(this.view);

        /* ACCESS MENU BAR */
        this.mb.className = "mb";
        this.bg.style.backgroundImage = img;
        this.mb.append(this.bg);
    }

    setViewHtml(html){
        this.view.innerHTML = html;
    }

    open(){
        /* AJOUT DE LA FENETRE SUR LE BUREAU */
        let main = document.getElementById("desktop");
        main.append(this.window);
        this.setZindex();
        document.getElementById("foot").append(this.mb);
        this.reduce();
        this.min();
        this.menuB();
        this.makeDraggable();
    }

    setZindex(){
        this.window.style.zIndex = "2";
        /*let windows = document.querySelectorAll('.window');
        windows.forEach(window => {
            window.style.zIndex = "1";
        });
        let mbs = document.querySelectorAll('.mb');
        mbs.forEach(mb => {
            mb.style.backgroundColor = "#FFFFFF00";
        });*/
    }

    min(){
        this.btnMin.addEventListener("click", () => {
            let desk = document.getElementById("desktop");
            let mainW = desk.offsetWidth;
            let mainH = desk.offsetHeight;
            if(this.fullScreen){
                let newW = mainW * 0.7;
                let newH = mainH * 0.7;
                this.window.style.width = newW + "px";
                this.window.style.height = newH + "px";
                this.fullScreen = false;
                this.btnMin.style.textDecoration = "none";
                return;
            }
            this.setFullScreen();
        });
    }

    reduce(){
        this.btnR.addEventListener("click", () => {
            this.reducing();
        });
    }

    menuB(){
        this.mb.addEventListener("click", () => {
            if(this.isOpen){
                this.reducing();
                return;
            }
            this.isOpen = true;
            this.window.style.display = "flex";
            this.mb.style.backgroundColor = "#FFFFFF36";
        });
    }

    reducing(){
        this.window.style.display = "none";
        this.mb.style.backgroundColor = "#FFFFFF00";
        this.isOpen = false;
    }

    /* set window in full screen */
    setFullScreen(){
        this.window.style.width = "100%";
        this.window.style.height = "100%";
        this.window.style.top = 0;
        this.window.style.left = 0;
        this.fullScreen = true;
        this.btnMin.style.textDecoration = "underline";
    }
    setCornerScreen(clientx){
        let desk = document.getElementById("desktop");
        let wdth = desk.offsetWidth * 0.5;
        let hgt = desk.offsetHeight;
        this.window.style.width = wdth + "px";
        this.window.style.height = hgt + "px";
        this.window.style.top = 0;
        this.onCorner = true;
        if(clientx <= 0){
            this.window.style.left = 0;
            return;
        }
        this.window.style.left = "none";
        this.window.style.right = 0;
    }

    makeDraggable () {
        let currentPosX = 0, currentPosY = 0, previousPosX = 0, previousPosY = 0;
        this.header.addEventListener('mousedown', e => {
            if(!this.fullScreen){
                if(this.onCorner){
                    this.window.style.height = (this.window.offsetHeight * 0.7) + "px";
                    this.onCorner = false;
                }
                e.preventDefault();
                previousPosX = e.clientX;
                previousPosY = e.clientY;
                document.onmouseup = (e) => {
                    if(e.clientY <= 0){
                        this.setFullScreen();
                    }
                    if(e.clientX <= 0 || e.clientX >= document.getElementById("desktop").offsetWidth){
                        this.setCornerScreen(e.clientX);
                    }
                    document.onmouseup = null;
                    document.onmousemove = null;
                };
                document.onmousemove = (e) => {
                    e.preventDefault();
                    currentPosX = previousPosX - e.clientX;
                    currentPosY = previousPosY - e.clientY;
                    previousPosX = e.clientX;
                    previousPosY = e.clientY;
                    this.window.style.top = (this.window.offsetTop - currentPosY) + 'px';
                    this.window.style.left = (this.window.offsetLeft - currentPosX) + 'px';
                };
            }
        });
    }
}