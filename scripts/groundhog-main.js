function main(){
  // Set the slider values and oninput events
  setSlider("infectionDuration","infectionDurationVal", 1, maxInfectionDuration, infectionDuration, function(){
    infectionDuration = document.getElementById("infectionDuration").value;
  });
  setSlider("deathRate","deathRateVal", 0, 100, 50, function(){
    mortalityRate = document.getElementById("deathRate").value/100;
  });
  setSlider("infectionDistance","infectionDistanceVal", 10, maxInfectionDistance, 100, function(){
    infectionDistance = document.getElementById("infectionDistance").value;
  });
  setSlider("infectionRate","infectionRateVal", 0, 100, 100, function(){
    infectionRate = document.getElementById("infectionRate").value/100;
  });

  //Set the initial progress of the infection
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
  btn = document.getElementById("playStepButton");
  btn.onclick = function(){
    if (isPaused){
      isRunningOneStep = true;
      runSim();
      isRunning = false;
      isStopped = false;
      isReset = false;
      isRunningOneStep = false;
    }
    this.innerHTML = '<img src="images/play-step-gray.png" alt="Play one step">';
    setTimeout(function(){
         var tbtn = document.getElementById("playStepButton");
         tbtn.innerHTML = '<img src="images/play-step-red.png" alt="Play one step">';
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
  btn = document.getElementById("homeButton");
  btn.onclick = function(){
    if (isStopped || (isRunning && confirm("End the simulation and reset?"))){
      resetMap();
    }
    this.innerHTML = '<img src="images/home-gray.png" alt="Reset map">';
    setTimeout(function(){
         var tbtn = document.getElementById("homeButton");
         tbtn.innerHTML = '<img src="images/home-red.png" alt="Reset map">';
         tbtn.blur();
    }, 200);
  };
  btn = document.getElementById("infoButton");
  btn.onclick = function(){
    if (isStopped || (isRunning && confirm("End the simulation and reset?"))){
      //TODO
    }
    this.innerHTML = '<img src="images/info-gray.png" alt="Info">';
    setTimeout(function(){
         var tbtn = document.getElementById("infoButton");
         tbtn.innerHTML = '<img src="images/info-red.png" alt="Info">';
         tbtn.blur();
    }, 200);
  };
  btn = document.getElementById("minParamsButton");
  btn.onclick = function(){
    document.getElementById("paramsDiv").style.display = "none";
    document.getElementById("restoreDiv").style.display = "block";
    this.innerHTML = '<img src="images/minimize-gray.png" alt="Minimize">';
    setTimeout(function(){
         var tbtn = document.getElementById("minParamsButton");
         tbtn.innerHTML = '<img src="images/minimize-red.png" alt="Minimize">';
         tbtn.blur();
    }, 200);
  };
  btn = document.getElementById("restoreButton");
  btn.onclick = function(){
    document.getElementById("paramsDiv").style.display = "block";
    document.getElementById("restoreDiv").style.display = "none";
    this.innerHTML = '<img src="images/restore-gray.png" alt="Restore">';
    setTimeout(function(){
         var tbtn = document.getElementById("restoreButton");
         tbtn.innerHTML = '<img src="images/restore-red.png" alt="Restore">';
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
    "home-gray.png",
    "minimize-gray.png"
  ];

  var imageArr = [images.length];
  for (img in images){
    //alert(new Image());
    imageArr[img] = new Image();
    imageArr[img].src = "images/" + images[img];
  }

  initializeSim(parseInt(document.getElementById("infectionDuration").value));
  //TODO: make sure the infections array is updated to reflect the correct number of days when the slider is changed
  //TODO: Disable the sliders when the simulation is running
}
