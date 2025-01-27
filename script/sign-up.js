// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
// import { getFirestore, doc, setDoc,collection} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyCU8cY-G-7C3HCd7__GolMXytfymPWOGvM",
//     authDomain: "vida-bc10d.firebaseapp.com",
//     projectId: "vida-bc10d",
//     storageBucket: "vida-bc10d.firebasestorage.app",
//     messagingSenderId: "972713597559",
//     appId: "1:972713597559:web:2c9691bee8977ac7e04472"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // Initialize Firestore
// const db = getFirestore(app);
// //collection
// const userColRef = collection(db,"vdx-users")



// class SignUp {
//     constructor(formId, errors) {
//         this.signUpForm = document.getElementById(formId);
//         this.errors = errors;

//         this.signUpForm.addEventListener('submit', (event) => {
//             event.preventDefault();
//             if (this.validateForm()) {
//                 this.fireStoreSaveUser();
//             }
//         });
//     }

//     validateForm() {
//         const name = document.getElementById("names").value.trim();
//         const number = document.getElementById("number").value.trim();
//         const email = document.getElementById("email").value.trim();
//         const password = document.getElementById("password").value.trim();
//         const passwordr = document.getElementById("passwordr").value.trim();

//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         const numberRegex = /^(?:\+234\d{10}|234\d{10}|0(7|8|9)(0|1)\d{8})$/;
//         const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

//         // Clear previous errors
//         for (const error of Object.values(this.errors)) {
//             error.textContent = '';
//         }

//         if (!numberRegex.test(number)) {
//             this.errors.numberError.textContent = "Invalid phone number format. Please enter a Nigerian number.";
//             return false;
//         }

//         if (!emailRegex.test(email)) {
//             this.errors.emailError.textContent = "Invalid email format. Please try again.";
//             return false;
//         }

//         if (!passwordRegex.test(password)) {
//             this.errors.passwordError.textContent = "Password must be at least 8 characters long, contain at least one letter, one number, and one special character.";
//             return false;
//         }

//         if (password !== passwordr) {
//             this.errors.passwordrError.textContent = "Passwords don't match. Please try again.";
//             return false;
//         }

//         return true;
//     }

//     // saveUser() {
//     //     const name = document.getElementById("names").value.trim();
//     //     const number = document.getElementById("number").value.trim();
//     //     const email = document.getElementById("email").value.trim();
//     //     const password = document.getElementById("password").value.trim();

//     //     const userObj = {
//     //         username: name,
//     //         number,
//     //         email,
//     //         password
//     //     };


//     //     fireStoreSaveUser()
//     //     // const users = JSON.parse(localStorage.getItem('Vuser')) || [];
//     //     // users.push(userObj);
//     //     // localStorage.setItem('Vuser', JSON.stringify(users));

//     //     // alert(`${name}, your account has been created successfully!`);
//     //     // window.location.href = './sign_in.html';
//     // }
//     async fireStoreSaveUser() {
//         try {
//             const name = document.getElementById("names").value.trim();
//             const number = document.getElementById("number").value.trim();
//             const email = document.getElementById("email").value.trim();
//             const password = document.getElementById("password").value.trim();
    
//             const userObj = {
//                 username: name,
//                 number,
//                 email,
//                 password
//             };
//             const docRef = doc(userColRef, userObj.email)
//             await setDoc(docRef, userObj)
//             console.log(docRef);
//             alert("sign-in succesful")
            
//         } catch (error) {
//             console.log(error);
            
//         }
//     }
// }

// // Instantiate the SignUp class
// new SignUp('signUpForm', {
//     numberError: document.getElementById("numberError"),
//     emailError: document.getElementById("emailError"),
//     passwordError: document.getElementById("passwordError"),
//     passwordrError: document.getElementById("passwordrError")
// });

































// Import the necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCU8cY-G-7C3HCd7__GolMXytfymPWOGvM",
    authDomain: "vida-bc10d.firebaseapp.com",
    projectId: "vida-bc10d",
    storageBucket: "vida-bc10d.firebasestorage.app",
    messagingSenderId: "972713597559",
    appId: "1:972713597559:web:2c9691bee8977ac7e04472"
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const userColRef = collection(db, "vdx-users");

class SignUp {
    constructor(formId, errors) {
        this.signUpForm = document.getElementById(formId);
        this.errors = errors;

        this.signUpForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            if (this.validateForm()) {
                await this.signUpUser();
            }
        });
    }

    validateForm() {
        const name = document.getElementById("names").value.trim();
        const number = document.getElementById("number").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const passwordr = document.getElementById("passwordr").value.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const numberRegex = /^(?:\+234\d{10}|234\d{10}|0(7|8|9)(0|1)\d{8})$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;

        for (const error of Object.values(this.errors)) {
            error.textContent = '';
        }

        if (!numberRegex.test(number)) {
            this.errors.numberError.textContent = "Invalid phone number format.";
            return false;
        }

        if (!emailRegex.test(email)) {
            this.errors.emailError.textContent = "Invalid email format.";
            return false;
        }

        if (!passwordRegex.test(password)) {
            this.errors.passwordError.textContent = "Password must meet complexity requirements.";
            return false;
        }

        if (password !== passwordr) {
            this.errors.passwordrError.textContent = "Passwords don't match.";
            return false;
        }

        return true;
    }

    async signUpUser() {
        try {
            const name = document.getElementById("names").value.trim();
            const number = document.getElementById("number").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            // Firebase Authentication to securely create user
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Store non-sensitive user info in Firestore
            await setDoc(doc(userColRef, user.uid), {
                username: name,
                number,
                email
            });

            alert(`${name}, your account has been created successfully!`);
            window.location.href = './sign_in.html';
        } catch (error) {
            console.error("Error:", error.message);
            alert(`Error: ${error.message}`);
        }
    }
}

// Instantiate the SignUp class
new SignUp('signUpForm', {
    numberError: document.getElementById("numberError"),
    emailError: document.getElementById("emailError"),
    passwordError: document.getElementById("passwordError"),
    passwordrError: document.getElementById("passwordrError")
});
