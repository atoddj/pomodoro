
var running = 0;
var breakFlag = 1;
var sessionLength = Number(document.getElementById("sessionLength").innerHTML);
var breakLength = Number(document.getElementById("breakLength").innerHTML);
var sessionTime=sessionLength*60*10;
var breakTime=breakLength*60*10;



$("#increaseSession").click(function(){
	sessionLength++;
	sessionTime = sessionLength*60*10;
	$("#sessionLength").html(sessionLength);
});
$("#increaseBreak").click(function(){
	breakLength++;
	breakTime = breakLength*60*10;
	$("#breakLength").html(breakLength);
});
$("#decreaseSession").click(function(){
	if (sessionLength>1)sessionLength--;
	sessionTime = sessionLength*60*10;
	$("#sessionLength").html(sessionLength);
});
$("#decreaseBreak").click(function(){
	if (breakLength>1) breakLength--;
	breakTime = breakLength*60*10;
	$("#breakLength").html(breakLength);
});

var time = sessionTime;
document.getElementById("timer").innerHTML = time/10/60 + ":0" + (time/10)%60;

function startPause(){
	if (running == 0) {
		document.getElementById("startPause").innerHTML = "Pause";
		running = 1;
    	countDown();
	} else {
		document.getElementById("startPause").innerHTML = "Resume";
		running = 0;
	}
}

function restart() {
	$("#title").html("Pomodoro Time");
	running = 0;
	time = Number($("#breakLength").text())*10*60;
	$("#startPause").html("Start");
}

function breakCountDown() {
  time = Number($("#breakLength").text())*10*60;
  countDown();
}


function countDown() {
	if (running==1 && time > 0) {
		setTimeout(function(){
			time--;
			var secs = Math.floor((time/10)%60);
			if (secs<10) {
				secs = "0"+secs;
			}
			var mins = Math.floor(time/10/60);
			document.getElementById("timer").innerHTML = mins + ":" + secs;
			countDown();
		}, 100);
	} else if (time===0 && breakFlag===1) {
		document.getElementById("title").innerHTML="Break Time";
		breakFlag = 0;
		breakCountDown();
	} else if (time ===0 && breakFlag===0) {
		$("#title").html("Pomodoro Time");
		breakFlag = 1;
		time = Number($("#sessionLength").text())*10*60;
		countDown();
	}
}
