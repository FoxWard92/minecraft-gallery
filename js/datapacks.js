
let indexpos = 0;

var max = localStorage.getItem("datapacksmax");

var data = JSON.parse(localStorage.getItem("datapacks"));

window.onloads = async function(n) {
    var z = indexpos+n;

    if(z >= 0 && z < (max/6)){   
        indexpos = z;
        await loadElemnts(indexpos,max,data);
    }

    document.getElementById('rbutton').style.opacity = ((indexpos*6)+6) < max ? 1:0;
    document.getElementById('lbutton').style.opacity = ((indexpos*6)) > 0 ? 1:0; 
    document.getElementsByClassName('body-page')[0].style.opacity = 1;
}; 

window.loadElemnts = function(n,max,data){
    const arr = document.getElementsByClassName('img');
    const interapt = (n*6);
    for(var i = 0; i < 6;i++){
        if((interapt+i) < max){
            const key = data['100' + (i+(n*6))];
            const itemdata = arr[i];
            itemdata.style.opacity = 1;
            itemdata.querySelector('h2').innerText = key.title;
            itemdata.style.backgroundImage = `url(${key.immagine})`;
            itemdata.querySelector('.l1').innerText = 'Versione Datapack : ' + key.versione;
            itemdata.querySelector('.l2').innerText = 'Aggiunte : ' + key.aggiunte;
            itemdata.querySelector('.l3').innerText = 'Bug Fix  : ' + key.bugfix;
            itemdata.querySelector('a').href =key.datapack;
            itemdata.querySelector('a').innerText = 'Download For ' + key.versionegioco;
        }else{
            arr[i].style.opacity = 0;
        }
    }
};

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
