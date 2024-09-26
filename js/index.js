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

let z = 0;

let max = 0;

window.onloads = async function(){

    var data = await getDataForNode(('datapacks'));
    localStorage.setItem("datapacks",JSON.stringify(data));
    localStorage.setItem("datapacksmax",max)

    var data = await getDataForNode(('news'));
    localStorage.setItem("news",JSON.stringify(data));
    localStorage.setItem("newsmax",max);
}

window.clicklink = function(n){
    const button = document.getElementsByClassName('link');
    button[z].classList.remove('active-link');
    button[n].classList.add('active-link');
    z = n
}

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
