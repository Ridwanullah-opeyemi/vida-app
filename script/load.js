const load = document.querySelector(".loadf");
const section1 = document.querySelector(".sec1");
const section2 = document.querySelector(".sec2");

function loading() {
    let width = 100;
    const intervalId = setInterval(() => {
        if (width >= 100) {
            clearInterval(intervalId);
            section1.style.display = 'block';
            section2.style.display = 'none';
        } else {
            width++;
            load.style.width = width + "%";
            document.getElementById("loads").textContent = width + '%';
        }
    }, 100);
}

loading();