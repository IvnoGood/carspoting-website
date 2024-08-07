let backgroundvideo = document.getElementById("myVideo");
let played = true;
let carouselTimeout;
console.log(played);

document.getElementById("video-controls").onclick = function() {
  playPause();
  carousel();
}

function playPause() {
  if (played) {
    played = false;
  } else {
    played = true;
  }
  console.log(played);
}

var myIndex = 0;

function carousel() {
  if (carouselTimeout) {
    clearTimeout(carouselTimeout);
  }

  if (played) {
    var i;
    var x = document.getElementsByClassName("main-slideshow");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) { myIndex = 1; }
    x[myIndex - 1].style.display = "block";
    carouselTimeout = setTimeout(carousel, 9000);
    console.log(myIndex);
  }
}

// Start the carousel initially if `played` is true
if (played) {
  carousel();
}

function view(n){
  
}
