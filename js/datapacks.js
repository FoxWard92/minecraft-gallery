
function onloads(){
    let rb = document.getElementById('rbutton');
    let lb = document.getElementById('lbutton');
    rb.style.opacity = 0;
    lb.style.opacity = 0;
}

function isMobileScroll(){
        var q = document.getElementsByClassName('img');
        for(var i = 0; i < 6;i++){
            var ypos = (Math.round(q[i].getBoundingClientRect().top))/innerHeight;
            if((ypos) >= -0.25 && (ypos) <= 0.35){
                q[i].classList.add('InWiew');
            }else{
                q[i].classList.remove('InWiew');
            }
        }

}

