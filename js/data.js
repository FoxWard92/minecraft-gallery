let z = 0;
let c = document.getElementsByClassName('img');

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