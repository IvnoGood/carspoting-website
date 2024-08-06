let backgroundvideo = document.getElementById("myVideo");

function playPause() { 
  if (backgroundvideo.paused) 
    backgroundvideo.play(); 
  else 
    backgroundvideo.pause(); 
} 