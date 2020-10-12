var firstclick = 0;
var StartTime;
var EndTime;
var Duration;
    
$(function() {

  
  $(".numbers-row").append('<div1 class="button">+</div1><div2 class="dec button">-</div2><div3 class="Resetbutton">Reset</div3>'); 
  

  $(".button").on("click", function() {

    var $button = $(this);
    var oldValue = $button.parent().find("input").val();
  
    if ($button.text() == "+") {
  	  var newVal = parseFloat(oldValue) + 1;
        if (firstclick == 0 ) {
            StartTime = new Date();
            EndTime = new Date();
            document.getElementById("StTime").innerHTML = StartTime;
            document.getElementById("EndTime").innerHTML = EndTime;
            document.getElementById("Duration").innerHTML = 1;
            firstclick = 1;
            }
        else {
            EndTime = new Date();
            document.getElementById("EndTime").innerHTML = EndTime;
            // the following is to handle cases where the times are on the opposite side of
            // midnight e.g. when you want to get the difference between 11:55 PM and 12:05 AM
            if (EndTime < StartTime) {
                EndTime.setDate(EndTime.getDate() + 1);
            }
            // duration in milli seconds
            Duration = EndTime - StartTime;
            
            var msec = Duration;
            var hh = Math.floor(msec / 1000 / 60 / 60);
            msec -= hh * 1000 * 60 * 60;
            var mm = Math.floor(msec / 1000 / 60);
            msec -= mm * 1000 * 60;
            var ss = Math.floor(msec / 1000);
            msec -= ss * 1000;
            
            document.getElementById("Duration").innerHTML = hh + ' hours, ' + mm + ' mins, ' + ss + ' secs, ' + msec + ' milliseconds';
        } 
  	} else if ($button.text() == "-"){
	   // Don't allow decrementing below zero
      if (oldValue > 0) {
        var newVal = parseFloat(oldValue) - 1;
	    } else {
        newVal = 0;
        }
      }

    $button.parent().find("input").val(newVal);

  });
    
  $(".Resetbutton").on("click", function() {

    var $button = $(this);
    var oldValue = $button.parent().find("input").val();

    var newVal = 0;

    $button.parent().find("input").val(newVal);

  });           
    

});