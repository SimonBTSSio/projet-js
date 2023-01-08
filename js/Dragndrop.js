//SYSTEM DE DRAG AND DROP (API DRAG & DROP)
class Dragndrop{
    sc = document.querySelectorAll('.sc');
    boxs = document.querySelectorAll('.box');

    constructor(){
        var dd = this;
        this.sc.forEach(function(item){
            dd.addListenerLfup(item);
        });
        this.boxs.forEach(box => {
            dd.addListenerBox(box);
        });
    }

    addListenerLfup(item){
        item.addEventListener('dragstart', this.dragStart);
        item.addEventListener('dragend', this.dragEnd);
    }

    addListenerBox(box){
        box.addEventListener('dragover', this.dragOver);
        box.addEventListener('drop', this.drop);
    }

    dragStart(e){
        e.dataTransfer.setData('text/plain', e.target.id);
        this.style.opacity = '0.4';
    }

    dragEnd(e){
        this.style.opacity = '1';
    }

    dragOver(e){
        e.preventDefault();
    }

    drop(e){
        let id = e.dataTransfer.getData('text/plain');
        let draggable = document.getElementById(id);
        if(this.children.length != 0){
            let parentBox = draggable.parentNode;
            let swipe = this.children[0];

            parentBox.append(swipe);
        }
        this.append(draggable);
    }
}