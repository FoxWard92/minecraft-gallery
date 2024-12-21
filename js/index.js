
const button = document.getElementsByClassName('link');
const iframe = document.getElementById('iframe');

window.LinkIsClick = function(n,callback){
    for (var i = button.length-1; i >= 0;i--){
        if(i == n){
            button[i].classList.add('active-link');
        }else{
            button[i].classList.remove('active-link');
        }
    }
    callback();
}

window.opendatapacks = function(){
    iframe.src = "html/datapack.html";
}

window.openhome = function(){
    iframe.src = "html/home.html";
}

window.openyoutube = function(){
    window.open("https://www.youtube.com/@FoxWard92", '_blank');
}