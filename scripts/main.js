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
    this.innerHTML = '<img src="https://chri7928.github.io/candrews/images/stop-gray.png" alt="stop">';
    setTimeout(function(){
         document.getElementById("stopButton").innerHTML = '<img src="https://chri7928.github.io/candrews/images/stop-red.png" alt="stop">';
         document.getElementById("stopButton").blur();
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
    this.innerHTML = '<img src="https://chri7928.github.io/candrews/images/play-gray.png" alt="Pause">';
    setTimeout(function(){
         document.getElementById("playButton").innerHTML = '<img src="https://chri7928.github.io/candrews/images/play-red.png" alt="play">';
         document.getElementById("playButton").blur();
    }, 200);
  };
  btn = document.getElementById("pauseButton");
  btn.onclick = function(){
    if (isRunning){
      isPaused = true;
      isRunning = false;
    }
    this.innerHTML = '<img src="https://chri7928.github.io/candrews/images/pause-gray.png" alt="Pause">';
    setTimeout(function(){
         document.getElementById("pauseButton").innerHTML = '<img src="https://chri7928.github.io/candrews/images/pause-red.png" alt="Pause">';
         document.getElementById("pauseButton").blur();
    }, 200);
  };
  btn = document.getElementById("resetButton");
  btn.onclick = function(){
    if (isStopped || (isRunning && confirm("End the simulation and reset?"))){
      initializeSim(parseInt(document.getElementById("infectionDuration").value));
    }
    this.innerHTML = '<img src="https://chri7928.github.io/candrews/images/full-rewind-gray.png" alt="Pause">';
    setTimeout(function(){
         document.getElementById("resetButton").innerHTML = '<img src="https://chri7928.github.io/candrews/images/full-rewind-red.png" alt="Pause">';
         document.getElementById("resetButton").blur();
    }, 200);
  };

  initializeSim(parseInt(document.getElementById("infectionDuration").value));
  //TODO: make sure the infections array is updated to reflect the correct number of days when the slider is changed
  //TODO: Disable the sliders when the simulation is running
}
