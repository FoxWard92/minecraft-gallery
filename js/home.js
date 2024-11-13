
let datalist = JSON.parse(localStorage.getItem('data'))

window.onload = async function() {
    await loadElemnts(datalist.news);
    document.getElementsByClassName('body-page')[0].style.opacity = 1;
};

window.loadElemnts = function(data){
    max = data.length
    if(data != null){
        for(var i = 0; i < 3;i++){
            const itemdata = document.getElementById(`box${i+4}`)
            if(i <= max){
                const key = data[(i)];
                const descrizione = itemdata.firstElementChild;
                itemdata.style.opacity = 1;
                descrizione.children[0].innerText = '[NUOVO] ' + key.title;
                itemdata.style.backgroundImage = `url(${key.immagine})`;
                descrizione.children[1].innerText = key.descrizione;
            }else{
                itemdata.style.opacity = 0;
            }
        }
    }
};