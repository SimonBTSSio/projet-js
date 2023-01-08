class App{
    window;
    //Generate rdm id for app Math.random().toString(16).slice(2)
    id = Math.random().toString(16).slice(2);
    name;
    lfup;

    constructor(img, name){
        let path = "url('" + img + "')";
        this.name = name;
        this.window = new Window(path);
        this.lfup = new Lfup(this.id, path, name);
        this.lfup.div.addEventListener('dblclick', () => {
            this.openApp();
        });

        this.window.btnC.addEventListener("click", () => {
            this.window.window.remove();
            this.window.mb.remove();
            this.closeApp();
        });
    }

    openApp(){
        this.window.open();
    }
}