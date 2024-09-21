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

let max = 0;

let indexpos = 0;

window.onloads = async function(n) {
    let rb = document.getElementById('rbutton');
    let lb = document.getElementById('lbutton');

    var data = await getDataForNode(('data'));
    
    var z = indexpos+n;

    if(z >= 0 && z <= (max/6)){   
        indexpos = z;
        loadElemnts(indexpos,max,data);
    }
    
    if(((indexpos*6)+6) < max){
        rb.style.opacity = 1;
    }else{
        rb.style.opacity = 0;
    }

    if((indexpos*6) > 0){
        lb.style.opacity = 1; 
    }else{
        lb.style.opacity = 0; 
    }
    
    
    
};

window.loadElemnts = async function(n,max,data){
    const arr = document.getElementsByClassName('img');
    const interapt = (n*6);
    for(var i = 0; i < 6;i++){
        if((interapt+i) < max){
            const key = data['100' + (i+(n*6))];
            const itemdata = arr[i];
            itemdata.style.opacity = 1;
            itemdata.querySelector('h2').innerText = key.title;
            itemdata.style.backgroundImage = `url(${key.immagine})`;
            itemdata.querySelector('.l1').innerText = 'Versione Datapack : ' + key.versione;
            itemdata.querySelector('.l2').innerText = 'Aggiunte : ' + key.aggiunte;
            itemdata.querySelector('.l3').innerText = 'Bug Fix  : ' + key.bugfix;
            itemdata.querySelector('a').href =key.datapack;
            itemdata.querySelector('a').innerText = 'Download For ' + key.versionegioco;
        }else{
            arr[i].style.opacity = 0;
        }
    }
};

window.getDataForNode = async function (nodeId) {
    const dbRef = ref(database, `/${nodeId}`);
    try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            max = Object.keys(data).length;
            return data;
        } else {
            console.log(`No data found for node ${nodeId}`);
            return null;
        }
    } catch (error) {
        console.error("Error getting data:", error);
        return null
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
