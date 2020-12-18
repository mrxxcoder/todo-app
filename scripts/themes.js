const toggleBtn = document.getElementById("theme-toggler");
const body = document.querySelector("body");

const toggleLight = () => {
    body.classList.remove('default');
    body.classList.add('light');
    toggleBtn.setAttribute("src", "images/icon-moon.svg")
}

const toggleDark = () => {
    body.classList.remove('light');
    body.classList.add('default');
    toggleBtn.setAttribute("src", "images/icon-sun.svg")
}

toggleBtn.addEventListener("click" , () => {
    if(body.className=="default") {
        toggleLight();
    } else {
        toggleDark();
    }
})

