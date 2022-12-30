function selectX(button) {
    let activeButtons = document.querySelectorAll(".x.input_button.active");
    activeButtons.forEach(button => {
        button.classList.remove("active");
    })
    button.classList.add("active");
}

function selectR(button) {
    let activeButtons = document.querySelectorAll(".r.input_button.active");
    activeButtons.forEach(button => {
        button.classList.remove("active");
    })
    button.classList.add("active");
}