var z = 0;
var c = document.getElementsByClassName('img');

function wiewwet(n){

    var x = z+n;
    var k = (c.length/6)-1;
    
    if(x >= 0 && x <= k){
       datawiew(x);
       document.getElementById('lbutton').style.opacity = x;
       document.getElementById('rbutton').style.opacity = (k-x);
    }
}

function datawiew(n){

    for(var i = 0; i < 6;i++){
        c[(z*6)+i].style.display = 'none';
        c[(n*6)+i].style.display = 'block';
    }
    z = n;
}

function isMobileScroll(){
        for(var i = 0; i < 6;i++){
            var q = (c[(z*6)+i]);
            var ypos = (Math.round(q.getBoundingClientRect().top))/innerHeight;
            if((ypos) >= -0.25 && (ypos) <= 0.35){
                q.classList.add('InWiew');
            }else{
                q.classList.remove('InWiew');
            }
        }

}

