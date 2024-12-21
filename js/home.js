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
const wiewpage = document.getElementsByClassName('body-page')[0]
const loadbar = document.getElementById('loadbar');

window.onload = async function() {
    await loadElemnts(await getDataForNode('news'));
};

window.loadElemnts = async function(data){
    wiewpage.style.opacity = 0;
    loadbar.style.opacity = 1;
    const max = data.length
    const imagePromises = [];
    if(data != null){
        for(var i = 0; i < 3;i++){
            const itemdata = document.getElementById(`box${i+4}`)
            if(i <= max){
                const key = data[(i)];
                const descrizione = itemdata.firstElementChild;
                itemdata.style.opacity = 1;
                descrizione.children[0].innerText = '[NUOVO] ' + key.title;
                itemdata.style.backgroundImage = `url(${key.immagine})`;
                imagePromises.push(loadImage(key.immagine));
                descrizione.children[1].innerText = key.descrizione;
            }else{
                itemdata.style.opacity = 0;
            }
        }
    }
    try {
        await Promise.all(imagePromises);
    } catch (error) {
        console.error(error);
    }
    loadbar.style.opacity = 0;
    wiewpage.style.opacity = 1;
};

window.loadImage = function(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(url);
        img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    });
}

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