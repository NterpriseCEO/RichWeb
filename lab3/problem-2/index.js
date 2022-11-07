window.onload = function() {
	//rxjs timer every second
	let countFrom = 100;
	Rx.Observable.timer(countFrom, 1000)
		.map(i => countFrom - i)
		.takeWhile(i => i >= 0)
		.subscribe((counter) => {
		console.log(counter);
	});
}