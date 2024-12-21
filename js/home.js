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

window.onload = async function() {
    loadbar.style.opacity = 1;
    await loadElemnts(await getDataForNode('news'));
    document.getElementsByClassName('body-page')[0].style.opacity = 1;
};

window.loadElemnts = async function(data){
    const max = data.length
    if(data != null){
        for(var i = 0; i < 3;i++){
            const itemdata = document.getElementById(`box${i+4}`)
            if(i <= max){
                const key = data[(i)];
                const descrizione = itemdata.firstElementChild;
                itemdata.style.opacity = 1;
                descrizione.children[0].innerText = '[NUOVO] ' + key.title;
                itemdata.style.backgroundImage = `url(${key.immagine})`;
                descrizione.children[1].innerText = key.descrizione;
            }else{
                itemdata.style.opacity = 0;
            }
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