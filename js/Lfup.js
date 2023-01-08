//class links to frequently-used programs
class Lfup{
    div = document.createElement("div");

    constructor(id, img, title){
        this.div.draggable = true;
        this.div.className = "sc";
        this.div.id = id;
        this.div.style.backgroundImage = img;
        this.div.setAttribute("title", title);
    }
}