let userArray = [];
const formInfo = document.getElementById("userInfo");


// Error Elements
const emailError = document.getElementById("emailError");
const numberError = document.getElementById("numberError");
const passwordError = document.getElementById("passwordError");
const passwordrError = document.getElementById("passwordrError");

formInfo.addEventListener('submit', (event) => {
    event.preventDefault();
    if (validateForm()) {
        saveUser();
    }
});

function validateForm() {
    const name = document.getElementById("names").value.trim();
    const number = document.getElementById("number").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const passwordr = document.getElementById("passwordr").value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numberRegex =  /^(?:\+234\d{10}|234\d{10}|0(7|8|9)(0|1)\d{8})$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    emailError.textContent = '';
    numberError.textContent = '';
    passwordError.textContent = '';
    passwordrError.textContent = '';

    if (!numberRegex.test(number)) {
        numberError.textContent = "Invalid phone number format. Please enter Nigerian number.";
        return;
    }

    if (!emailRegex.test(email)) {
        emailError.textContent = "Invalid email format. Please try again.";
        return;
    }

    if (!passwordRegex.test(password)) {
        passwordError.textContent = "Password must be at least 8 characters long, contain at least one letter, one number, and one special character.";
        return;
    }

    if (password !== passwordr) {
        passwordrError.textContent = "Passwords don't match. Please try again.";
        return;
    }

    return true;
}

function saveUser() {
    const name = document.getElementById("names").value.trim();
    const number = document.getElementById("number").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const userObj = {
        name,
        number,
        email,
        password
    };

    userArray.push(userObj);
    storeUser();
    console.log(userArray);
}

function storeUser() {
    localStorage.setItem('Vuser', JSON.stringify(userArray));
}

// function loading() {
//     let width = 0;
//     const intervalId = setInterval(() => {
//         if (width >= 100) {
//             clearInterval(intervalId);
//             section1.style.display = 'block';
//             section2.style.display = 'none';
//         } else {
//             width++;
//             load.style.width = width + "%";
//             document.getElementById("loads").textContent = width + '%';
//         }
//     }, 20);
// }

// loading();