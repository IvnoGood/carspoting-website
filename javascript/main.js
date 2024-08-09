let played = true;
let carouselTimeout;
let myIndex = 0;

document.getElementById("video-controls").onclick = function() {
  playPause();
}

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
  } else if(myIndex === 1) {
    document.getElementById("slideshow-button1").style.color = "white";
    document.getElementById("slideshow-button2").style.color = "gray";
    document.getElementById("slideshow-button3").style.color = "white";
    document.getElementById("slideshow-button4").style.color = "white";
  }
   else if(myIndex === 2) {
    document.getElementById("slideshow-button1").style.color = "white";
    document.getElementById("slideshow-button2").style.color = "white";
    document.getElementById("slideshow-button3").style.color = "gray";
    document.getElementById("slideshow-button4").style.color = "white";
  }
   else if(myIndex === 3) {
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
document.getElementById("search-input").addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("search-enter").click();
    console.log("enter");
  }
});


document.getElementById("search-input").addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("search-enter-top-bar").click();
    console.log("enter");
  }
});
