import { loginbtn, googleloginbtn } from "./firebase.js";

document.getElementById('header').classList.add('visible');

document.getElementById('login').addEventListener('click', function (event) {
    loginbtn(event,
        document.getElementById('username'),
        document.getElementById('password')
    );
});
document.getElementById('googlehover').addEventListener('click', googleloginbtn);
