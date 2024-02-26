import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged ,signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyC2uncXK-a4JRnQdcZuwfgjzz0jET0BZh0",
    authDomain: "vetwell-connect.firebaseapp.com",
    projectId: "vetwell-connect",
    storageBucket: "vetwell-connect.appspot.com",
    messagingSenderId: "173129071010",
    appId: "1:173129071010:web:b5a25a1f1d0b4d8bb75afb",
    measurementId: "G-40M3DKLS1X"

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);ß

//get user detail slots



onAuthStateChanged(auth, (user) => {
    if (user) {
        //get user details
        const uid = user.uid;

        const email = document.getElementById('userEmail');
        const username = document.getElementById('userName');
        const profile = document.getElementById('profileImage');
        const time = document.getElementById('lastSeen');
        //append user details
        email.innerText = user.email;
        username.innerText = user.displayName;
        profile.src = "https://lh3.googleusercontent.com/a/ACg8ocLKnJjfskBaCFPsLm8YN2vuXzWCE8iyF0WiKA5XoAqC2w=s96-c"
        console.log(user)


    } else {
        alert("logged out...")
        window.location.href = "index.html"
    }
});

const logout = document.getElementById("logout");
logout.addEventListener("click" , function(){
    signOut(auth).then(() => {
       alert("logging out...");
       window.location.href = "index.html"
      }).catch((error) => {
        // An error happened.
      });
})