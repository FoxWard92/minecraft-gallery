let z = 0

function clicklink(n){
    const button = document.getElementsByClassName('link');
    button[z].classList.remove('active-link');
    button[n].classList.add('active-link');
    z = n
}
