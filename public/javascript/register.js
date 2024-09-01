// Import the functions you need from the SDKs you need
import { registerbtn, googleloginbtn } from './firebase.js';

document.getElementById('header').classList.add('visible');

document.getElementById('register').addEventListener('click', function (event) {
    registerbtn(event,
        document.getElementById('email'),
        document.getElementById('password')
    );
});

document.getElementById('googlehover').addEventListener('click', googleloginbtn);