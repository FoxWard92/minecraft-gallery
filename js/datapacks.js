
function onloads(){
    let rb = document.getElementById('rbutton');
    let lb = document.getElementById('lbutton');
    rb.style.opacity = 0;
    lb.style.opacity = 0;
}

function isMobileScroll(){
        var arr = document.getElementsByClassName('img');
        var Altezza = window.innerHeight
        for(var i = 0; i < 6;i++){
            var ypos = (Math.round(arr[i].getBoundingClientRect().top))/Altezza;
            if((ypos) >= -0.25 && (ypos) <= 0.35){
                arr[i].classList.add('InWiew');
            }else{
                arr[i].classList.remove('InWiew');
            }
        }

}

