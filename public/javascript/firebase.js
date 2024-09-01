/* // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js"
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js"
import {
    getAuth, signOut, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js"
import { getDatabase, onValue, child, ref, set, get } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
//or
//https://firebase.google.com/docs/web/learn-more?authuser=0&hl=fr#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

    apiKey: "AIzaSyC6OVBiOIM_hV17n1sKabOQd2vOYwcImoY",

    authDomain: "wespot-website.firebaseapp.com",

    databaseURL: "https://wespot-website-default-rtdb.europe-west1.firebasedatabase.app",

    projectId: "wespot-website",

    storageBucket: "wespot-website.appspot.com",

    messagingSenderId: "864768589048",

    appId: "1:864768589048:web:f76790c9abfa6b2e594f0d",

    measurementId: "G-0ZD710W4YE"

};




// Initialize Firebase

export const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export const auth = getAuth(app);

const database = getDatabase();

export const provider = new GoogleAuthProvider();

const accountredirect = "../index.html";


function writeUserData(user) {

}; */
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";


import {
    getAuth, signOut, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";


import {
    getAnalytics
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";


import {
    getDatabase, onValue, child, ref, set, get
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

    apiKey: "AIzaSyC6OVBiOIM_hV17n1sKabOQd2vOYwcImoY",

    authDomain: "wespot-website.firebaseapp.com",

    databaseURL: "https://wespot-website-default-rtdb.europe-west1.firebasedatabase.app",

    projectId: "wespot-website",

    storageBucket: "wespot-website.appspot.com",

    messagingSenderId: "864768589048",

    appId: "1:864768589048:web:f76790c9abfa6b2e594f0d",

    measurementId: "G-0ZD710W4YE"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const database = getDatabase();

const auth = getAuth();

export const provider = new GoogleAuthProvider();

const accountredirect = "../index.html";

//------------------------------------------authentification------------------------------------------------------//

export function registerbtn(register, emailinput, passwordinput) {
    register.preventDefault();
    console.log(passwordinput, emailinput);
    const email = emailinput.value;
    const password = passwordinput.value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            writeUserData(user);
            const provider = "local";
            getUserDetails(user);
            saveUserdetails(user, provider);
            window.alert(email + password);
            window.location.href = accountredirect;
            return user;

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage + errorCode);
            document.getElementById('error-text').innerHTML = errorCode;
        });
}


export function loginbtn(event, emailinput, passwordinput) {
    event.preventDefault();
    console.log(emailinput, passwordinput);
    const email = emailinput.value;
    const password = passwordinput.value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            window.alert("redirecting...");
            const provider = "local";
            const user = userCredential.user;
            console.log("Loging in...");
            getUserDetails(user);
            saveUserdetails(user, provider);
            window.alert("redirecting...");
            window.location.href = accountredirect;


        })
        .catch((error) => {
            window.alert("redirecting...");
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage + errorCode);
            document.getElementById('error-text').innerHTML = errorCode;
        });
}


export function googleloginbtn() {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            getUserDetails(user);
            saveUserdetails(user, result);
            console.log("User logged in with Google:", user);
            console.log(result);
            window.alert(5);
            // Redirect or perform other actions here
            window.location.href = accountredirect;
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error during Google login:", errorMessage + " (" + errorCode + ")");
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
        });

}


export function saveUserdetails(user) {

    let providerId = "local"; // Default to "local"
    // Check if the provider has additionalUserInfo (this will be true for Google sign-in)
    if (user.providerData && user.providerData.length > 0) {
        providerId = user.providerData[0].providerId;
    }

    localStorage.setItem("firebaseProviderId", providerId);
    localStorage.setItem('user', JSON.stringify(user));
    const userinfo = JSON.parse(localStorage.getItem('user'));
    console.log(userinfo);
}


export function getUserDetails(user) {
    auth.onAuthStateChanged(user => {
        if (user) {
            const uid = user.uid;
            const displayName = user.displayName;
            const email = user.email;
            const photoURL = user.photoURL;
            const emailVerified = user.emailVerified;

            //console.log(`User signed in: ${displayName} (${email})`);
            localStorage.setItem('user', JSON.stringify(user));

            // You can use the user's profile information here
        } else {
            console.log('No user is signed in');
        }
    });
}


export function logOut() {
    signOut(auth).then(() => {
        console.log("logedout");
        window.location.href = "./index.html";
        localStorage.clear();

    }).catch((error) => {
        // An error happened.
        console.log(error);
    });
}

//----------------------------------------------------database----------------------------------------------------//


function writeUserData(user) {
    /* console.log("writeUserData");
    const userId = user.uid;
    // Update the user's data in the database
    console.log("writing to db " + ref(database, 'users/' + userId));
    set(ref(database, 'users/' + userId), {
        email: user.email,
        displayName: user.displayName,
        profilePicture: user.photoURL
    }).then(() => {
        console.log("Data saved successfully!");
        window.alert("Data saved successfully!");
    }).catch((error) => {
        console.error("Error saving data: ", error);
        window.alert("Error saving data: ", error);
    }); */


    const userId = user.uid;
    const info = "value";

    // Update the user's data in the database
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
        username: info,
        email: info,
        profile_picture: info
    })
        .then(() => {
            console.log("User data updated successfully!");
        })
        .catch((error) => {
            console.error("Error updating user data: ", error);
        });
}

//----------------------------------------------------other-------------------------------------------------------//

export function checkLoginStatus(logedin, notlogedin) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("user logged in");
            logedin.style.display = "flex";  // Show the logged-in element
            notlogedin.style.display = "none";  // Hide the not-logged-in element
        } else {
            console.log("user not logged in");
            logedin.style.display = "none";  // Hide the logged-in element
            notlogedin.style.display = "flex";  // Show the not-logged-in element
        }
    });
}

export function test() {
    console.log("hi");
}