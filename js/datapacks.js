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



window.onloads = async function() {
    let rb = document.getElementById('rbutton');
    let lb = document.getElementById('lbutton');
    var max = await countElements();

    if(((indexpos*6)+6) >= max){
        rb.style.opacity = 0;
    }
    if((indexpos*6) <= 0){
        lb.style.opacity = 0; 
    }
    
    loadElemnts(indexpos,max);
    
};

window.loadElemnts = async function(n,max){
    var arr = document.getElementsByClassName('img');
    var interapt = (n*6); 
    var data = await getDataForNode(('data'));
    for(var i = 0; i < 6;i++){
        if((interapt+i) < max){
            var key = '100' + i;
            arr[i].querySelector('h2').innerText = data[key].title;
            arr[i].querySelector('.l1').innerText = 'Versione : ' + data[key].versione;
            arr[i].querySelector('.l2').innerText = 'Aggiunte : ' + data[key].aggiunte;
            arr[i].querySelector('.l3').innerText = 'Bug Fix  : ' + data[key].bugfix;
            arr[i].style.backgroundImage = `url(${data[key].immagine})`;
            arr[i].querySelector('a').href = data[key].datapack;
        }else{
            break;
        }
    }
};

window.countElements = async function() {
    try {
        const snapshot = await get(ref(database, '/data'));
        if (snapshot.exists()) {
            return Object.keys(snapshot.val()).length;
        } else {
            console.log("Nessun dato trovato");
            return 0;
        }
    } catch (error) {
        console.error(error);
        return 0;
    }
};


async function getDataForNode(nodeId) {
    const dbRef = ref(database, `/${nodeId}`);
    try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            return data;
        } else {
            console.log(`No data found for node ${nodeId}`);
            return null;
        }
    } catch (error) {
        console.error("Error getting data:", error);
    }
};

window.isMobileScroll = function() {
    var arr = document.getElementsByClassName('img');
    var Altezza = window.innerHeight;
    for (var i = 0; i < 6; i++) {
        var ypos = (Math.round(arr[i].getBoundingClientRect().top)) / Altezza;
        if ((ypos) >= -0.25 && (ypos) <= 0.35) {
            arr[i].classList.add('InWiew');
        } else {
            arr[i].classList.remove('InWiew');
        }
    }
};
