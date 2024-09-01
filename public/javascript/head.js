import { checkLoginStatus, logOut } from "./firebase.js"

checkLoginStatus(
    document.getElementById('logedin'),
    document.getElementById('not-logedin'))

document.getElementById("logOut").addEventListener('click', function () {
    logOut();
});