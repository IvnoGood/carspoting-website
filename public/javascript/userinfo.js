import { logOut } from './javascript/firebase.js';

const user = JSON.parse(localStorage.getItem('user'));
const userprovider = localStorage.getItem('firebaseProviderId');
console.log(user);


if (user) {
    showUserdetails(user);
} else {
    console.log('No user data found in localStorage');
    document.getElementById('logOut').addEventListener('click', logOut,);
}
/* const user = userdata; */
/* showUserdetails(res.usr) */
showUserdetails(user)
function showUserdetails(user) {
    document.getElementById(`userdetails`).innerHTML = `
    <p> Source: ${userprovider}</p>
    <p> Uid: ${user.uid}</p>
    <img src="${user.photoURL}" style="widht:10%">
    <p>Name: ${user.displayName}</p>
    <p>Email ${user.email}</p>
    `
}


