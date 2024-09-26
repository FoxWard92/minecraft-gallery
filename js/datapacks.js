
let max = 0;

let indexpos = 0;

window.onloads = async function(n) {
    let rb = document.getElementById('rbutton');
    let lb = document.getElementById('lbutton');
    
    var z = indexpos+n;

    if(z >= 0 && z <= (max/6)){   
        indexpos = z;
        await loadElemnts(indexpos,localStorage.getItem("datapacksmax"),JSON.parse(localStorage.getItem("datapacks")));
    }
    
    if(((indexpos*6)+6) < max){
        rb.style.opacity = 1;
    }else{
        rb.style.opacity = 0;
    }

    if((indexpos*6) > 0){
        lb.style.opacity = 1; 
    }else{
        lb.style.opacity = 0; 
    }
    
    document.getElementsByClassName('body-page')[0].style.opacity = 1;
};

window.loadElemnts = async function(n,max,data){
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
    var Altezza = window.innerHeight;
    for (var i = 0; i < 6; i++) {
        var ypos = (Math.round(arr[i].getBoundingClientRect().top)) / Altezza;
        if ((ypos) >= -0.25 && (ypos) <= 0.35) {
            arr[i].classList.add('InWiew');
        } else {
            arr[i].classList.remove('InWiew');
        }
    }
};
