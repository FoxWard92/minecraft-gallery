import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js';
import { getDatabase, ref, get } from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js';

const firebaseConfig = {
    apiKey: "AIzaSyCqhU8DiouNlIV09U5apsTCq8PBJN6nVrM",
    authDomain: "datapack-gallery.firebaseapp.com",
    projectId: "datapack-gallery",
    storageBucket: "datapack-gallery.appspot.com",
    messagingSenderId: "781319307706",
    appId: "1:781319307706:web:63a86f15aacb3ada1f5d83",
    measurementId: "G-HJWQBKQ7VZ",
    databaseURL: "https://datapack-gallery-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let indexpos = 0;

let datalist = null;

window.onload = async function() {
    datalist = await getDataForNode("datapacks")
    if(datalist == null){
        return 0
    }
    await MoveIndex(0);
    document.getElementsByClassName('body-page')[0].style.opacity = 1;
};

window.loadElemnts = async function(data){
    const max = data.length;
    for(var i = 0; i < 6;i++){
        const itemdata = document.getElementById(`box${i+1}`) 
        if(i < max){
            const key = data[i];
            itemdata.style.opacity = 1;
            itemdata.style.backgroundImage = `url(${key.immagine})`;
            const descrizione = itemdata.firstElementChild
            const a = itemdata.firstElementChild.children[2]
            descrizione.children[0].innerText = key.title;
            const ol = descrizione.children[1]; 
            ol.children[0].innerText = 'Versione Datapack : ' + key.versione;
            ol.children[1].innerText = 'Aggiunte : ' + key.aggiunte;
            ol.children[2].innerText = 'Bug Fix  : ' + key.bugfix;
            a.href = key.datapack;
            a.innerText = 'Download For ' + key.versionegioco;
        }else{
            itemdata.style.opacity = 0;
        }
    }
};

window.MoveIndex = async function (n){
    let z = indexpos + n;
    if(z >= 0 && z < datalist.length){
        indexpos = indexpos + n;

        document.getElementById('rbutton').style.opacity = datalist.length-1 > indexpos ? 1:0;

        document.getElementById('lbutton').style.opacity = indexpos > 0 ? 1:0;
        await loadElemnts(datalist[indexpos])
    }
} 


window.isMobileScroll = function() {
    var arr = document.getElementsByClassName('img');
    for (var i = 0; i < 6; i++) {
        var ypos = (Math.round(arr[i].getBoundingClientRect().top)) / window.innerHeight;
        if ((ypos) >= -0.25 && (ypos) <= 0.35) {
            arr[i].classList.add('InWiew');
        } else {
            arr[i].classList.remove('InWiew');
        }
    }
};

window.getDataForNode = async function (nodeId) {
    const dbRef = ref(database, `/${nodeId}`);
    try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            return data
        } else {
            console.log(`No data found for node ${nodeId}`);
            return null;
        }
    } catch (error) {
        console.error("Error getting data:", error);
        return null
    }
};
