"use strict";

function changeInfoDisplay() {
	let info = document.getElementById("header_info");
	let display = window.getComputedStyle(info).getPropertyValue("display");
	if (display === "none") {
		info.style.display = "block";
	} else {
		info.style.display = "none";
	}
}

function updateDateTime() {
	let datetime = document.getElementsByClassName("datetime");
	for (let i = 0; i < datetime.length; i++) {
		datetime.item(i).innerHTML = Date().toLowerCase();
	}
}

updateDateTime(); //onload

setInterval(updateDateTime, 9000);