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

const button = document.getElementsByClassName('link');
const iframe = document.getElementById('iframe');

window.onload = async function(){
    localStorage.setItem('data',JSON.stringify(await getDataForNode('')))
}

window.LinkIsClick = function(n,callback){
    for (var i = button.length-1; i >= 0;i--){
        if(i == n){
            button[i].classList.add('active-link');
        }else{
            button[i].classList.remove('active-link');
        }
    }
    callback();
}

window.opendatapacks = function(){
    iframe.src = "html/datapack.html";
}

window.openhome = function(){
    iframe.src = "html/home.html";
}

window.openyoutube = function(){
    window.open("https://www.youtube.com/@FoxWard92", '_blank');
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