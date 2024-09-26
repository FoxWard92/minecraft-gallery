let z = 0

function clicklink(n){
    const button = document.getElementsByClassName("link");
    button[z].style.transform = 'translateY(0vh)'
    button[n].style.transform = 'translateY(0.5vw)'
    z = n
}
