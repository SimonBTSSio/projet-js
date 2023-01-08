//CETTE CLASSE PERMET DE CREER LE BUREAU
class Desktop{
    desk = document.getElementById("desktop");
    nbBox = 0;

    //CONSTRUCTEUR
    constructor(){
        this.nbBox = this.getNbBox();
        this.createBox(this.nbBox);
    }

    //PERMET CE CREER LE NBR DE "BOITE" NECESSAIRE PAR RAPPORT A LA TAILLE DE L'ECRAN DU CLIENT
    getNbBox(){
        let clHeight = document.body.clientHeight - 50;
        let clWidth = document.body.clientWidth;
        let nbColW = (clWidth - (clWidth % 95)) / 95;
        let nbColH = (clHeight - (clHeight % 80)) / 80;
        return nbColW * nbColH;
    }

    //AJOUTE UN LISTENER QUI MODIFIE LE NOMBRE DE BOITE EN FONCTION DE LA TAILLE DE LECRAN UTILISATEUR
    addListener(){
        var desk = this;
        window.addEventListener('resize', function(e){
            let nbBoxNew = desk.getNbBox();
            if(nbBoxNew < desk.nbBox){
                let dif = desk.nbBox - nbBoxNew;
                desk.nbBox = nbBoxNew;
                for (let index = 0; index < dif; index++) {
                    let lastChild = desk.desk.lastChild;
                    if(lastChild.children.length != 0){
                        let i = 0;
                        while(desk.desk.children[i].children.length != 0){
                            i++;
                        }
                        desk.desk.children[i].append(lastChild.children[0]);
                    }
                    desk.desk.removeChild(lastChild);
                }
            }else if(nbBoxNew > desk.nbBox){
                let dif = nbBoxNew - desk.nbBox;
                desk.nbBox = nbBoxNew;
                desk.createBox(dif);
                let drag = new Dragndrop();
            }
        });
    }

    //CREATION DES BOITES AVEC LA CLASS BOX ET LES AJOUTE AU BUREAU
    createBox(round){
        for (let index = 0; index < round; index++) {
            let box = document.createElement("div");
            box.className = "box";
            this.desk.append(box);
        }
    }

}