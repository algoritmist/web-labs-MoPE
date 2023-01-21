"use strict";

let r;

function hideWarning(warningId) {
    let warning = document.getElementById(warningId)
    warning.style.display = "none";
}

function selectX(button, value) {
    let x_field = document.getElementById("main_form:XValue");
    x_field.setAttribute("value", value);

    hideWarning("x_warning");

    let activeButtons = document.querySelectorAll(".x.input_button");
    activeButtons.forEach(button => {
        button.classList.remove("active");
    });
    button.classList.add("active");

    return false;
}

function selectR(button, value) {
    r = value;
    let r_field = document.getElementById("main_form:RValue");
    r_field.setAttribute("value", value);

    hideWarning("r_warning");

    let activeButtons = document.querySelectorAll(".r.input_button");
    activeButtons.forEach(button => {
        button.classList.remove("active");
    });
    button.classList.add("active");

    return false;
}