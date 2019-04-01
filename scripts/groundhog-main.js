function main(){
  setSlider("infectionDuration","infectionDurationVal", 1, maxInfectionDuration, 3);
  setSlider("deathRate","deathRateVal", 0, 100, 50);
  setSlider("infectionDistance","infectionDistanceVal", 10, maxInfectionDistance, 100);
  setSlider("infectionRate","infectionRateVal", 0, 100, 100);

  setProgress("currentInfectionDiv", 0, false, "currentInfectedVal", (0 + "%"));
  document.getElementById("currentDayVal").innerHTML = "0";

  var btn = document.getElementById("stopButton");
  btn.onclick = function(){
    if (isRunning){
      isStopped = true;
      isPaused = false;
      isRunning = false;
    }
    this.innerHTML = '<img src="images/stop-gray.png" alt="stop">';
    setTimeout(function(){
         var tbtn = document.getElementById("stopButton");
         tbtn.innerHTML = '<img src="images/stop-red.png" alt="stop">';
         tbtn.blur();
    }, 200);
  };
  btn = document.getElementById("playButton");
  btn.onclick = function(){
    if ((isStopped && isReset) || isPaused){
      if(!isPaused){
        runSim();
      }
      isRunning = true;
      isStopped = false;
      isPaused = false;
      isReset = false;
    }
    this.innerHTML = '<img src="images/play-gray.png" alt="Pause">';
    setTimeout(function(){
         var tbtn = document.getElementById("playButton");
         tbtn.innerHTML = '<img src="images/play-red.png" alt="play">';
         tbtn.blur();
    }, 200);
  };
  btn = document.getElementById("pauseButton");
  btn.onclick = function(){
    if (isRunning){
      isPaused = true;
      isRunning = false;
    }
    this.innerHTML = '<img src="images/pause-gray.png" alt="Pause">';
    setTimeout(function(){
         var tbtn = document.getElementById("pauseButton");
         tbtn.innerHTML = '<img src="images/pause-red.png" alt="Pause">';
         tbtn.blur();
    }, 200);
  };
  btn = document.getElementById("resetButton");
  btn.onclick = function(){
    if (isStopped || (isRunning && confirm("End the simulation and reset?"))){
      initializeSim(parseInt(document.getElementById("infectionDuration").value));
    }
    this.innerHTML = '<img src="images/full-rewind-gray.png" alt="Reset simulation">';
    setTimeout(function(){
         var tbtn = document.getElementById("resetButton");
         tbtn.innerHTML = '<img src="images/full-rewind-red.png" alt="Reset simulation">';
         tbtn.blur();
    }, 200);
  };

  //preload the mouseover images for the play buttons
  var images = [
    "info-gray.png",
    "play-gray.png",
    "stop-gray.png",
    "pause-gray.png",
    "full-rewind-gray.png",
    "play-step-gray.png",
    "home-gray.png"
  ];

  var imageArr = [images.length];
  for (img in images){
    alert(new Image());
    imageArr[imageArr.length] = new Image();
    imageArr[imageArr.length].src = "images/" + images[img];
  }

  initializeSim(parseInt(document.getElementById("infectionDuration").value));
  //TODO: make sure the infections array is updated to reflect the correct number of days when the slider is changed
  //TODO: Disable the sliders when the simulation is running
}
