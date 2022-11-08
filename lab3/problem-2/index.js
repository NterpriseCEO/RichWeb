window.onload = function() {
	//References the elements in the HTML
	let hoursInput = document.getElementById("hours-input"),
		minutesInput = document.getElementById("minutes-input"),
		secondsInput = document.getElementById("seconds-input"),
		countdownButton = document.getElementById('start-countdown'),
		countdownDisplay = document.getElementById("countdown");

	//The countdown observer
	let countdown;

	let countdownEventListener = Rx.Observable.fromEvent(countdownButton, 'click');
	countdownEventListener.subscribe(() => {

		//Takes the values from the input fields and converts them to seconds
		let hours = isNaN(hoursInput.value) ? 0 : parseInt(hoursInput.value*60*60),
			minutes = isNaN(parseInt(minutesInput.value)) ? 0 : parseInt(minutesInput.value*60),
			seconds = isNaN(parseInt(secondsInput.value)) ? 0 : parseInt(secondsInput.value);

		//Calculates the total seconds
		let countFrom = hours + minutes + seconds;

		//Creates the countdown observable
		countdown = Rx.Observable
			.timer(countFrom, 1000)
			//Reverses the counter so it counts down
			.map(i => countFrom - i)
			//Takes until the start countdown button is clicked
			.takeUntil(countdownEventListener)
			//Takes until the counter reaches 0
			.takeWhile(i => i >= 0);

		//Subscribes to the countdown observable to display the countdown
		countdown.subscribe((counter) => {
			//convert counter to HMS
			let hours = Math.floor(counter / 3600),
				minutes = Math.floor((counter - (hours * 3600)) / 60),
				seconds = counter - (hours * 3600) - (minutes * 60);

			//pads 0 to the left of the number if it is less than 10
			hours = hours < 10 ? "0" + hours : hours;
			minutes = minutes < 10 ? "0" + minutes : minutes;
			seconds = seconds < 10 ? "0" + seconds : seconds;

			//Displays the countdown in the HTML
			countdownDisplay.innerHTML = hours + ": "+minutes + ": " + seconds;
		});
	});
}