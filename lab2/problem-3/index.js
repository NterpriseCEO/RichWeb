window.onload = function() {

	//QuerySelector #repos
	let repos = document.querySelector('#repos');

	document.querySelector("button").addEventListener("click", () => {
		let value = document.querySelector("input").value;

		while(repos.firstChild) {
			repos.removeChild(repos.firstChild);
		}

		if(value) {
			let reposRequest = new XMLHttpRequest();
			reposRequest.open("GET", `https://api.github.com/users/${value}/repos`, true);
			reposRequest.send();
			reposRequest.onload = function() {
				if (reposRequest.status >= 200 && reposRequest.status < 400) {
					// Success!
					let data = JSON.parse(reposRequest.responseText);
					let template = document.querySelector("template");
					data.forEach(repo => {
						let clone = template.content.cloneNode(true);
						//Add the data to the DOM
						clone.querySelector(".repo-name").innerHTML = repo.name;
						clone.querySelector(".repo-name").href = repo.html_url;
						clone.querySelector(".repo-description").innerHTML = repo.description ?? "No description provided";

						//Add the clone to the DOM
						document.querySelector("#repos").appendChild(clone);
					});
				} else {
					// We reached our target server, but it returned an error
					console.log('Error: ' + reposRequest.status);
				}
			}

			//Users request
			let usersRequest = new XMLHttpRequest();
			usersRequest.open("GET", `https://api.github.com/users/${value}`, true);
			usersRequest.send();
			usersRequest.onload = function() {
				if (usersRequest.status >= 200 && usersRequest.status < 400) {
					// Success!
					let data = JSON.parse(usersRequest.responseText);
					console.log(data);
					document.querySelector("#name").innerHTML = data.name;
					document.querySelector("#username").innerHTML = data.login;
					document.querySelector("#email").innerHTML = data.bio ?? "No email provided";
					document.querySelector("#location").innerHTML = data.location ?? "No location provided";
					document.querySelector("#number-of-gists").innerHTML = data.public_gists ?? "No public gists";
					document.querySelector("img").src = data.avatar_url;
				} else {
					// We reached our target server, but it returned an error
					console.log('Error: ' + usersRequest.status);
				}
			}
		}
	});

	//reference to the html template in index.html
}