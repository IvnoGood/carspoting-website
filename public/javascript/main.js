//server side
let played = true;
let carouselTimeout;
let myIndex = 0;

let prevScrollPos = window.scrollY;
const navbar = document.getElementById('header');
navbar.classList.add('visible');

const user = JSON.parse(localStorage.getItem('user'));

function playPause() {
  played = !played;
  if (played) {
    carousel(); // Restart the carousel when resumed
  } else {
    clearTimeout(carouselTimeout); // Stop the carousel when paused
  }
  console.log(played);
}

function carousel() {
  if (carouselTimeout) {
    clearTimeout(carouselTimeout);
    updateButtons();
  }

  if (played) {
    updateButtons();
    var x = document.getElementsByClassName("main-slideshow");
    for (let i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) {
      myIndex = 1;
    }
    x[myIndex - 1].style.display = "block";
    carouselTimeout = setTimeout(carousel, 9000);
  }
}

function view(n) {
  myIndex = n - 1; // Convert 1-based index to 0-based index
  updateButtons();

  var x = document.getElementsByClassName("main-slideshow");
  for (let i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[myIndex].style.display = "block"; // Show the selected slide

  if (played) {
    clearTimeout(carouselTimeout); // Reset the carousel timeout
    carouselTimeout = setTimeout(carousel, 9000);
  }
}

function updateButtons() {
  if (myIndex === 0) {
    document.getElementById("slideshow-button1").style.color = "gray";
    document.getElementById("slideshow-button2").style.color = "white";
    document.getElementById("slideshow-button3").style.color = "white";
    document.getElementById("slideshow-button4").style.color = "white";
  } else if (myIndex === 1) {
    document.getElementById("slideshow-button1").style.color = "white";
    document.getElementById("slideshow-button2").style.color = "gray";
    document.getElementById("slideshow-button3").style.color = "white";
    document.getElementById("slideshow-button4").style.color = "white";
  }
  else if (myIndex === 2) {
    document.getElementById("slideshow-button1").style.color = "white";
    document.getElementById("slideshow-button2").style.color = "white";
    document.getElementById("slideshow-button3").style.color = "gray";
    document.getElementById("slideshow-button4").style.color = "white";
  }
  else if (myIndex === 3) {
    document.getElementById("slideshow-button1").style.color = "white";
    document.getElementById("slideshow-button2").style.color = "white";
    document.getElementById("slideshow-button3").style.color = "white";
    document.getElementById("slideshow-button4").style.color = "gray";
  }
}

// Start the carousel initially if `played` is true
if (played) {
  carousel();
}

// Execute a function when the user presses a key on the keyboard
/* document.getElementById("search-input").addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("search-enter").click();
    console.log("enter");
  }
}); */


/* document.getElementById("search-input").addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("search-enter-top-bar").click();
    console.log("enter");
  }
}); */

/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
// keep track of previous scroll position

window.addEventListener('scroll', () => {
  const currentScrollPos = window.scrollY;

  if (prevScrollPos > currentScrollPos) {
    navbar.classList.add('visible');
  } else if (document.getElementById('sidebar-active').checked == true) {
    navbar.classList.add('visible');
  } else {
    navbar.classList.remove('visible');
  }

  prevScrollPos = currentScrollPos;
});

/* document.getElementById('testbutton').addEventListener("click", getHeader)
function getHeader() {
  var content = document.getElementById('header').innerHTML;
  console.log(content);
  var x = window.open();
  x.document.open();
  x.document.write(content);
  x.document.close();
} */

document.getElementById("video-controls").addEventListener('click', playPause)


document.getElementById("slideshow-button1").addEventListener('click', view.bind(null, 1))

document.getElementById("slideshow-button2").addEventListener('click', view.bind(null, 2))

document.getElementById("slideshow-button3").addEventListener('click', view.bind(null, 3))

document.getElementById("slideshow-button4").addEventListener('click', view.bind(null, 4))


document.getElementById("profile-box").addEventListener('click', function () {
  window.location.href = "./pages/register.html";
})

showUserdetails(user);

function showUserdetails(user) {
  if (user.displayName == undefined) {
    document.getElementById(`currentuser-username`).innerHTML = `
    Guest ${user.uid}
    `
  } else {
    document.getElementById(`currentuser-username`).innerHTML = `
    ${user.displayName}
    `
  }



  if (user.photoURL == undefined) {
    //TODO replace the link with the real pic for copyrights reasons
    document.getElementById('currentuser-profilepicture').src = "https://images.macrumors.com/t/n4CqVR2eujJL-GkUPhv1oao_PmI=/1600x/article-new/2019/04/guest-user-250x250.jpg"
  } else {
    document.getElementById('currentuser-profilepicture').src = user.photoURL;
  }

  /*  <p>Email ${ user.email }</p> */
}