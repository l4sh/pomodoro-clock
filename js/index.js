(function($){

  var Pomodoro = {
    breakLength: 5,
    sessionLength: 25,
    isActive: false,
    onBreak: false
  };


  function zeroPad(number) {
    var x = '00' + number
    return x.substr(x.length - 2);
  }
  
  
  /**
   * Reset the pomodoro timer
   */
  Pomodoro.resetTimer = function() {
    $('#timer').html(zeroPad(Pomodoro.sessionLength) + ':00');
    Pomodoro.isActive = Pomodoro.onBreak = false;
  }

  
  /**
   * Increase break length in minutes
   */
  Pomodoro.increaseBreakLength = function() {
    Pomodoro.breakLength++;
    $('#break-length').html(Pomodoro.breakLength);
    Pomodoro.resetTimer();
  };


  /*
   * Decrease break length in minutes
   */
  Pomodoro.decreaseBreakLength = function() {
    if (Pomodoro.breakLength > 1) {
      Pomodoro.breakLength--;
      $('#break-length').html(Pomodoro.breakLength);
      Pomodoro.resetTimer();
    }
  };


  /*
   * Increase session length in minutes
   */
  Pomodoro.increaseSessionLength = function() {
    Pomodoro.sessionLength++;
    $('#session-length').html(Pomodoro.sessionLength);
    Pomodoro.resetTimer();    
  }


  /*
   * Decrease session length in minutes
   */
  Pomodoro.decreaseSessionLength = function() {
    if (Pomodoro.sessionLength > 1) {
      Pomodoro.sessionLength--;
      $('#session-length').html(Pomodoro.sessionLength);
      Pomodoro.resetTimer();
    }
  };


  /*
   * Update remaining timer and clock text
   */
  Pomodoro.updateClock = function(interval) {
    if (!Pomodoro.isActive) {
      $('h1.pomodoro-title').html('Pomodoro clock');
      return;
    }

    // Display current timer 'Break' || 'Session"
    if (Pomodoro.onBreak) {
      $('h1.pomodoro-title').html('Break!');
    } else if (!Pomodoro.onBreak && Pomodoro.isActive) {
      $('h1.pomodoro-title').html('Session');
    }

    interval = interval || 0;

    var remainingTime = $('#timer').html().split(":").reduce(function(a,b) {
      return (Number(a) * 60) + Number(b);});

    remainingTime -= interval;

    // Set #timer text
    $('#timer').html(function() {
      if (remainingTime > 0) {
        var minutes = zeroPad(Math.floor(remainingTime / 60));
        var seconds =  zeroPad(remainingTime % 60);
        return minutes + ':' + seconds;

      } else {
        Pomodoro.onBreak = !Pomodoro.onBreak;
        if (Pomodoro.onBreak) {
          remainingTime = Pomodoro.breakLength * 60;
          return Math.floor(remainingTime / 60) + ':00';
        }

        Pomodoro.isActive = false;
        remainingTime = Pomodoro.sessionLength * 60;
        return Math.floor(remainingTime / 60) + ':00';
      }
    }());
  };



  // Set starting values
  $('#session-length').html(Pomodoro.sessionLength);
  $('#break-length').html(Pomodoro.breakLength);
  $('#timer').html(Pomodoro.sessionLength + ':00');

  // Click handlers
  $('#session-increase').click(Pomodoro.increaseSessionLength);
  $('#session-decrease').click(Pomodoro.decreaseSessionLength);
  $('#break-increase').click(Pomodoro.increaseBreakLength);
  $('#break-decrease').click(Pomodoro.decreaseBreakLength);
  $('.clock *, #start').click(function() {
    Pomodoro.isActive = !Pomodoro.isActive;
  });
  $('#reset').click(function() {
    Pomodoro.resetTimer();
  })

  setInterval(function() {
    Pomodoro.updateClock(1);
  }, 1000);


})(Zepto);