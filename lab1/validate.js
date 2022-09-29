"use strict";

let x, y, r;

function editXMessage(display, message) {
	let msg = document.getElementById("x_message");
	if (display) {
		msg.innerHTML = message;
		msg.style.display = "block";
	} else {
		msg.style.display = "none";
	}
}

function validateX() {
	x = document.getElementById("x").value;
	x = x.replace(',', '.');
	if (x === "") {
		editXMessage(true, "X is not set!");
		return false;
	}
	if (isNaN(x) || x.trim() === "") {
		editXMessage(true, "X is not a number!");
		return false;
	}
	if (x.length > 17) {
		editXMessage(true, "X is too long! This page doesn't support long numbers.");
		return false;
	}
	x = parseFloat(x);
	if (x <= -5 || x >= 5) {
		editXMessage(true, "X must be between -5 and 5!");
		return false;
	}
	editXMessage(false);
	return true;
}

function hideYMessage() {
	let msg = document.getElementById("y_message");
	msg.style.display = "none";
}

function chooseY(elem) {
	let buttons = document.getElementsByClassName("y_button");
	for (let k = 0; k < buttons.length; k++) {
		buttons.item(k).classList.remove("active");
	}
	y = elem.value;
	elem.classList.add("active");
	hideYMessage();
}

function validateY() {
	return (typeof y !== "undefined");
}

function validateR() {
	r = document.getElementById("r").value;
	return (typeof r !== "undefined");
}

function validateArgs() {
	return (validateX() && validateY() && validateR());
}

function showInvalidRequestWarning(show, message) {
	let warning = document.getElementById("invalid_request_warning");
	if (!show) {
		warning.style.display = "none";
	} else {
		warning.style.display = "block";
		warning.innerHTML = message;
	}
}

function submit() {
	if (validateArgs()) {
		let xhr = new XMLHttpRequest();
		let data = new FormData();
		data.append("x", x);
		data.append("y", y);
		data.append("r", r);
		xhr.open("POST", "check.php", true);
		xhr.onload = () => {
			let status = xhr.status;
			switch (status) {
				case 200: {
					showInvalidRequestWarning(false);
					let res = JSON.parse(xhr.responseText);
					let new_row = '<tr class="' + ((res.result === 1) ? 'hit' : 'miss') + '">';
					new_row += "<td>" + res.x + "</td>";
					new_row += "<td>" + res.y + "</td>";
					new_row += "<td>" + res.r + "</td>";
					new_row += "<td>" + (res.result === 1 ? 'hit' : 'miss') + "</td>";
					new_row += "<td>" + res["cur_time"] + "</td>";
					new_row += "<td>" + res["exec_time"] + "</td>";
					new_row += "</tr>";
					$(new_row).insertAfter("#results_table .header");
					break;
				}
				case 400: {
					showInvalidRequestWarning(
						true,
						"You have somehow sent an invalid request to the server, try again.");
					break;
				}
				default: {
					showInvalidRequestWarning(
						true,
						"Unknown error, try again.");
					break;
				}
			}
		}
		xhr.send(data);
	}
	else showInvalidRequestWarning(
		true,
		"X, Y and/or R value is not set or doesn't meet their requirements (listed above).");
}