
let indexpos = 0

let datalist = JSON.parse(localStorage.getItem('data'))

window.onload = async function() {

    await MoveIndex(indexpos);

    document.getElementsByClassName('body-page')[0].style.opacity = 1;
};

window.loadElemnts = async function(data){
    const max = data.length;
    for(var i = 0; i < 6;i++){
        const itemdata = document.getElementById(`box${i+1}`) 
        if(i < max){
            const key = data[i];
            itemdata.style.opacity = 1;
            itemdata.style.backgroundImage = `url(${key.immagine})`;
            const descrizione = itemdata.firstElementChild
            const a = itemdata.firstElementChild.children[2]
            descrizione.children[0].innerText = key.title;
            const ol = descrizione.children[1]; 
            ol.children[0].innerText = 'Versione Datapack : ' + key.versione;
            ol.children[1].innerText = 'Aggiunte : ' + key.aggiunte;
            ol.children[2].innerText = 'Bug Fix  : ' + key.bugfix;
            a.href = key.datapack;
            a.innerText = 'Download For ' + key.versionegioco;
        }else{
            itemdata.style.opacity = 0;
        }
    }
};

window.MoveIndex = async function (n){
    let z = indexpos + n;
    if(z >= 0 && z < datalist.datapacks.length){
        indexpos = indexpos + n;

        document.getElementById('rbutton').style.opacity = datalist.datapacks.length-1 > indexpos ? 1:0;

        document.getElementById('lbutton').style.opacity = indexpos > 0 ? 1:0;

        await loadElemnts(datalist.datapacks[indexpos])
    }
} 


window.isMobileScroll = function() {
    var arr = document.getElementsByClassName('img');
    for (var i = 0; i < 6; i++) {
        var ypos = (Math.round(arr[i].getBoundingClientRect().top)) / window.innerHeight;
        if ((ypos) >= -0.25 && (ypos) <= 0.35) {
            arr[i].classList.add('InWiew');
        } else {
            arr[i].classList.remove('InWiew');
        }
    }
};
