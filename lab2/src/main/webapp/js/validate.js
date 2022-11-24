"use strict";

function editYMessage(display, message) {
	let msg = document.getElementById("y_message");
	if (display) {
		msg.innerHTML = message;
		msg.style.display = "block";
	} else {
		msg.style.display = "none";
	}
}

function validateY() {
	let y = document.getElementById("y").value;
	y = y.replace(',', '.');
	if (y === "") {
		editYMessage(true, "Y is not set!");
		return false;
	}
	if (isNaN(y) || y.trim() === "") {
		editYMessage(true, "Y is not a number!");
		return false;
	}
	if (y.includes('.') && y.split('.')[1].length > 15) {
		editYMessage(true, "Y is too long! This page doesn't support long numbers.");
		return false;
	}
	y = parseFloat(y);
	if (y <= -3 || y >= 5) {
		editYMessage(true, "Y must be between -3 and 5!");
		return false;
	}
	editYMessage(false);
	return true;
}

function displayWarning(warning_id, display) {
	let warning = document.getElementById(warning_id);
	if (display) {
		warning.style.display = "block";
	} else {
		warning.style.display = "none";
	}
}

function validateX() {
	let x = document.querySelectorAll('input.x_checkbox:checked');
	displayWarning("x_warning", (x.length === 0));
}

function validateR() {
	let r = document.querySelector('input[name="r"]:checked').value;
	displayWarning("r_warning", (typeof r === "undefined"));
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
		document.forms["input_block"].submit();
	}
	else showInvalidRequestWarning(
		true,
		"X, Y and/or R value is not set or doesn't meet their requirements (listed above).");
}