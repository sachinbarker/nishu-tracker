var firstclick = 0;
var StartTime;
var EndTime;
var Duration;

$(function() {

  $(".numbers-row").append('<div1 class="button">+</div1><div2 class="dec button">-</div2>'); 
                           //<div3 class="Resetbutton">Reset</div3>'); 
  

  $(".button").on("click", function() {

    var $button = $(this);
    var oldValue = $button.parent().find("input").val();
    var Pname = $button.parent().find("input").attr('name');
      var tothd = document.getElementById("head-drops").value;
      var totjhd = document.getElementById("jump-head-drops").value;
      var newhd = tothd;
      var newjhd = totjhd;
      var occur = "";
      var changetime;
      /*
document.getElementById("StTime").innerHTML = Date();
      document.getElementById("EndTime").innerHTML = Date();
    document.getElementById("Duration").innerHTML = 0;
      */
      
      if (document.getElementById("sleep").checked){
          occur = document.getElementById("sleep").value;
      }
      else {
          occur = document.getElementById("other").value;
      }
      //console.log("occur= " + occur);
      
    if ($button.text() == "+") {
  	  var newVal = parseFloat(oldValue) + 1;
        
        switch(Pname.substring(0, 10)){
            case "head-drops":
                newhd = parseFloat(tothd) + 1;
                break;
            case "jump-head-":
                newjhd = parseFloat(totjhd) + 1;
        }
        //if (firstclick == 0 ) {
        if (document.getElementById("StTime").value == "") {
            StartTime = new Date();
            EndTime = new Date();
            document.getElementById("StTime").value = StartTime;
            document.getElementById("EndTime").value = EndTime;
            document.getElementById("Duration").value = 1000;
            document.getElementById("Durtn").innerHTML = '0 hours, 0 mins, 0 secs, 1 milliseconds';
            firstclick = 1;
            }
        else {
            EndTime = new Date();
            document.getElementById("EndTime").value = EndTime;
            // the following is to handle cases where the times are on the opposite side of
            // midnight e.g. when you want to get the difference between 11:55 PM and 12:05 AM
            if (EndTime < StartTime) {
                EndTime.setDate(EndTime.getDate() + 1);
            }
            StartTime = new Date(document.getElementById("StTime").value);
            // duration in milli seconds
            Duration = EndTime - StartTime;
            
            var msec = Duration;
            var hh = Math.floor(msec / 1000 / 60 / 60);
            msec -= hh * 1000 * 60 * 60;
            var mm = Math.floor(msec / 1000 / 60);
            msec -= mm * 1000 * 60;
            var ss = Math.floor(msec / 1000);
            msec -= ss * 1000;
            document.getElementById("Duration").value = Duration;
            document.getElementById("Durtn").innerHTML = hh + ' hours, ' + mm + ' mins, ' + ss + ' secs, ' + msec + ' milliseconds';
        }

        
        // save (+) button click data
                fetch("https://api.apispreadsheets.com/data/2516/", {
                    method: "POST",
                    body: JSON.stringify({"data": {"time":EndTime,"action":"+1","type":Pname,"Occured":occur}}),
                }).then(res =>{
                    if (res.status === 201){
                        // SUCCESS
                    }
                    else{
                        // ERROR
                    }
                }) 
  	} else if ($button.text() == "-"){
	   // Don't allow decrementing below zero
      if (oldValue > 0) {
        // adjust total counts
            var newVal = parseFloat(oldValue) - 1;
                switch(Pname.substring(0, 10)){
                case "head-drops":
                    if (tothd > 0){newhd = parseFloat(tothd) - 1;}
                    else {newhd = 0;}
                    break;
                case "jump-head-":
                    if (totjhd > 0){newjhd = parseFloat(totjhd) - 1;}
                    else {newjhd = 0;}
                }
          
        // save (-) button click instance data
                fetch("https://api.apispreadsheets.com/data/2516/", {
                    method: "POST",
                    body: JSON.stringify({"data": {"time":new Date(),"action":"-1","type":Pname,"Occured":occur}}),
                }).then(res =>{
                    if (res.status === 201){
                        // SUCCESS
                    }
                    else{
                        // ERROR
                    }
                }) 
	    } else {
        newVal = 0;
      }
        }
      
      $button.parent().find("input").val(newVal);
      document.getElementById("head-drops").value = newhd;
      document.getElementById("jump-head-drops").value = newjhd;

  });
    
  $(".Resetbutton").on("click", function() {

    var $button = $(this);
    var oldValue = $button.parent().find("input").val();

    var newVal = 0;

    $button.parent().find("input").val(newVal);

  });           
    

});
    
function SaveForm (){
        //alert("Saving data...")
   
    $.ajax({
        url:'https://api.apispreadsheets.com/data/1984/',
        type:'post',
        data:$("#trackerForm").serializeArray(),
        success: function(){
          alert("Data Saved :)")
            //console.log("Form Data Submitted :)")
        },
        error: function(){
          alert("Error saving data :(")
            //console.log("There was an error posting :(")
        }
    });
        
        alert("Submitted")
    
    }