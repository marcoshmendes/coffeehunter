var time = 31;

$(document).ready(function () {
    watch();
});

function watch() {
	time -=1;
	$("#seconds").text(time);
	
	if(time == 0){
		var sum = $("#counter").text();
		alert("Your Score: " + sum);
		time = 31;
	}
    setTimeout("watch()", 1000)
} 

