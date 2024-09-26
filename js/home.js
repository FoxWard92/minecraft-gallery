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

window.onloads = async function() {

    var data = await getDataForNode(('news'));
    
    loadElemnts(max,data);

    document.getElementsByClassName('body-page')[0].style.opacity = 1;
};

window.loadElemnts = async function(max,data){
    const arr = document.getElementsByClassName('img');
    for(var i = 3; i < 6;i++){
        if((i-3) <= max){
            const key = data['100' + (i-3)];
            const itemdata = arr[i];
            itemdata.style.opacity = 1;
            itemdata.querySelector('h2').innerText = '[NUOVO] ' + key.title;
            itemdata.style.backgroundImage = `url(${key.immagine})`;
            itemdata.querySelector('p').innerText = key.descrizione;
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