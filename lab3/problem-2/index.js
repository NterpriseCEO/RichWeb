window.onload = function() {
	let countdownButton = document.getElementById('start-countdown');
	Rx.Observable.fromEvent(countdownButton, 'click').subscribe(() => {
		let countFrom = 100;
		Rx.Observable.timer(countFrom, 1000)
			.map(i => countFrom - i)
			.takeWhile(i => i >= 0)
			.subscribe((counter) => {
			console.log(counter);
		});
	});
}