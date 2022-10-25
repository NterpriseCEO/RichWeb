let contactsArray = [];
let sortDirection = 1;
//check if document is ready vanilla js
window.onload = function() {
	showTable();
	//click event on add-contact button
	document.getElementById("add-contact").addEventListener("click", () => {
		//get the inputs fields
		const nameInput = document.getElementById("contact-name");
		const phoneInput = document.getElementById("mobile-number");
		const emailInput = document.getElementById("email");

		const name = nameInput.value;
		const phone = phoneInput.value;
		const email = emailInput.value;

		if(!name || !phone || !email) {
			showErrorMessage("Please fill all the fields");
			return;
		}
		if(name.match(/[^a-zA-Z\s]/)) {
			showErrorMessage("Name should only contain letters");
			return;
		}

		if(name.length > 20) {
			showErrorMessage("Name should be less than or equal to 20 characters");
			return;
		}

		if(phone.match(/[^0-9]/)) {
			showErrorMessage("Phone number should only contain numbers");
			return;
		}

		if(phone.length !== 10) {
			showErrorMessage("Phone number should be 10 digits");
			return;
		}

		if(!email.match(/^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/)) {
			showErrorMessage("Email should only contain letters, numbers, @ and .");
			return;
		}

		if(email.length > 40) {
			showErrorMessage("Email should be less than 40 characters");
			return;
		}

		//clear the input fields
		nameInput.value = "";
		phoneInput.value = "";
		emailInput.value = "";

		//create a new contact
		contactsArray.push(new Contact(name, phone, email));
		showTable();
	});

	//#telephone-search on change
	document.getElementById("telephone-search").addEventListener("input", (e) => showTable(e.target.value));

	document.getElementById("sort").addEventListener("click", () => {
		if(sortDirection === 1) {
			contactsArray.sort((a, b) => a.name.localeCompare(b.name));
			sortDirection = -1;
		}else {
			contactsArray.sort((a, b) => b.name.localeCompare(a.name));
			sortDirection = 1;
		}
		showTable();
	});

	document.getElementById("close-error-message").addEventListener("click", () => {
		document.getElementById("error-wrapper").classList.add("hidden");
	});
};

function showErrorMessage(message) {
	document.getElementById("error-message").innerHTML = message;
	document.getElementById("error-wrapper").classList.remove("hidden");
}

function showTable(searchedNumber) {
	const tableBody = document.querySelector("tbody");
	let filteredArray = contactsArray;

	while(tableBody.lastChild) {
		tableBody.removeChild(tableBody.lastChild);
	}

	if(searchedNumber) {
		filteredArray = filteredArray.filter(contact => (contact.getPhone()+"").includes(searchedNumber));
	}

	const table = document.querySelector("table");
	const noResult = document.getElementById("noResult");

	if(filteredArray.length === 0) {
		table.classList.add("hidden");
		noResult.classList.remove("hidden");
	}else {
		document.getElementsByTagName("table")[0].classList.remove("hidden");
		noResult.classList.add("hidden");
	}

	filteredArray.forEach(function(contact) {
		const row = document.createElement("tr");
		row.innerHTML = `
			<td>${contact.getName()}</td>
			<td>${contact.getPhone()}</td>
			<td>${contact.getEmail()}</td>
		`;
		tableBody.appendChild(row);
	});
}

class Contact {

	#name;
	#phone;
	#email;

	constructor(name, phone, email) {
		this.name = name;
		this.phone = phone;
		this.email = email;
	}

	getName() {
		return this.name;
	}
	getPhone() {
		return this.phone;
	}
	getEmail() {
		return this.email;
	}
}