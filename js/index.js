let z = 0

function clicklink(n){
    const button = document.getElementsByClassName("link");
    button[z].classList.remove("active-button")
    button[n].classList.add("active-button")
    z = n
}
