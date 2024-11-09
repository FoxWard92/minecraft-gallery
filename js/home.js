
window.onloads = async function() {
    await loadElemnts(localStorage.getItem("newsmax"),JSON.parse(localStorage.getItem("news")));
    document.getElementsByClassName('body-page')[0].style.opacity = 1;
};

window.loadElemnts = function(max,data){
    if(data != null){
        const arr = document.getElementsByClassName('img');
        for(var i = 3; i < 6;i++){
            if((i-3) <= max){
                const key = data['100' + (i-3)];
                const itemdata = arr[i];
                itemdata.style.opacity = 1;
                itemdata.querySelector('h2').innerText = '[NUOVO] ' + key.title;
                itemdata.style.backgroundImage = `url(${key.immagine})`;
                itemdata.querySelector('p').innerText = key.descrizione;
            }else{
                arr[i].style.opacity = 0;
            }
        }
    }
};