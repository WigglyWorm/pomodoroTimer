var value;
$(document).ready(function (){
		    value = 25;
        $('#display').html('25:00');
    });

		function display () {
        $('#display').empty().html(value + ':00');
		}
		$('#plus').on('click',function() {
		    value = value + 1 ;
		    display();
		});
        $('#minus').on('click',function() {
            if (value > 1) {
                value = value - 1;
                display();
            }
		});
        
        var x, now, remaining, end, minutes, seconds;

        // Update count down every 1 second
        function updateCount () {
            x = setInterval(function () {
                // Get the time when the user clicks
                now = $.now();
                // Find the distance between now and the count down time
                remaining = end - now;
                // Time calculations for minutes and seconds
                minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
                seconds = Math.round((remaining % (1000 * 60)) / 1000);
                // Display the result 
                if (seconds == 60) {
                    document.getElementById("display").innerHTML = "1:00";
                }
                else if (seconds < 10) {
                    document.getElementById("display").innerHTML = minutes + ":0" + seconds;
                }
                else document.getElementById("display").innerHTML = minutes + ":" + seconds;


                // display if count down is finished 
                if (remaining < 0) {
                    clearInterval(x);
                    document.getElementById("display").innerHTML = "Time Up";
                }
                var a, b;
                //animate timer
                a = 360 / length;
                b = length - remaining;
                right = -90 + a * b;
                left = -90 + a * b - 180;
                
                var left, right, line=[];
                if (right < 90) {
                    line = ['linear-gradient(' + right + 'deg, #e89774 50%, transparent 50%)',
                        'linear-gradient(-90deg, #c5e874 50%, transparent 50%)'];
                }
                else {
                    line = ['linear-gradient(' + left + 'deg, #c5e874 50%, transparent 50%)',
                        'linear-gradient(-90deg, #c5e874 50%, transparent 50%)'];
                }
                  
                //update timer css
                var slice;
                slice = $('#timer').css({
                    'background-image': line.join(',')
                });

            }, 1000);

        }
        var pauseTime, start, length, pauseLength;
		//user to start or resume
        $('#start').on('click', function () {
		  //start
            if (isNaN(pauseTime)) {
                start = $.now();
                length = value * 60 * 1000;
                end = start + length;
                updateCount();
            }
		        //resume
            else {
                start = $.now();
                end = start + pauseLength;
            	updateCount();
            }
        });
        //pause
        $('#pause').on('click', function () {
            pauseTime = $.now();
            pauseLength = end - pauseTime;
            clearInterval(x);

        });
        //refresh
        $('#reset').on('click',function() {
            clearInterval(x);
            slice = $('#timer').css({
                'background-image': 'linear-gradient(-90deg, #e89774 50%, transparent 50%)'
            });
            value = 25;
            display();
			pauseTime = NaN;
        });