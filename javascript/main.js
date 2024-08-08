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
    console.log(myIndex);
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
  } else {
    document.getElementById("slideshow-button2").style.color = "gray";
    document.getElementById("slideshow-button1").style.color = "white";
  }
}

// Start the carousel initially if `played` is true
if (played) {
  carousel();
}
