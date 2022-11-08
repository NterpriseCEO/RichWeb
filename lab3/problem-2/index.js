window.onload = function() {
	let hoursInput = document.getElementById("hours-input"),
		minutesInput = document.getElementById("minutes-input"),
		secondsInput = document.getElementById("seconds-input"),
		countdownDisplay = document.getElementById("countdown");

	let countdown;

	let cancelCountdown = false;

	let countdownButton = document.getElementById('start-countdown');
	let countdownEventListener = Rx.Observable.fromEvent(countdownButton, 'click');
	countdownEventListener.subscribe(() => {

		// cancel rxjs observable cancel
		if (countdown) {
			cancelCountdown = true;
		}

		let hours = isNaN(hoursInput.value) ? 0 : parseInt(hoursInput.value*60*60),
			minutes = isNaN(parseInt(minutesInput.value)) ? 0 : parseInt(minutesInput.value*60),
			seconds = isNaN(parseInt(secondsInput.value)) ? 0 : parseInt(secondsInput.value);

		let countFrom = hours + minutes + seconds;

		cancelCountdown = false;

		countdown = Rx.Observable
			.timer(countFrom, 1000)
			.map(i => countFrom - i)
			.takeUntil(countdownEventListener)
			.takeWhile(i => i >= 0);

		countdown.subscribe((counter) => {
			//convert counter to HMS
			let hours = Math.floor(counter / 3600),
				minutes = Math.floor((counter - (hours * 3600)) / 60),
				seconds = counter - (hours * 3600) - (minutes * 60);

			//pads 0 to the left of the number if it is less than 10
			hours = hours < 10 ? "0" + hours : hours;
			minutes = minutes < 10 ? "0" + minutes : minutes;
			seconds = seconds < 10 ? "0" + seconds : seconds;

			countdownDisplay.innerHTML = hours + ": "+minutes + ": " + seconds;
		});
	});
}