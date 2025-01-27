
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, collection, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDPevhscyRNzzrkNrkOykBxNA_G34ziSlk",
    authDomain: "vida-522c0.firebaseapp.com",
    projectId: "vida-522c0",
    storageBucket: "vida-522c0.firebasestorage.app",
    messagingSenderId: "16459871299",
    appId: "1:16459871299:web:f5d9864879d545b29910f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore
const db = getFirestore(app);
// Initialize auth
const auth = getAuth();
//collection reference
const colRef = collection(db, "VDS")


SignUpForm.addEventListener("submit", createUserAccount)
SignInContainer.addEventListener("submit", signInAnAccount)

function getUserDetails() {
    let { username, email, password, rpassword } = SignUpForm;
    let details = {
        username: username.value,
        email: email.value,
        password: password.value,
        rpassword: rpassword.value
    };
    return details;
}

async function createUserAccount(e) {
    e.preventDefault();
    const { username, email, password, rpassword } = getUserDetails();

    try {
        if (password !== rpassword) {
            console.log("Password does not match");
            return; // Prevent further execution if passwords don't match
        }
        const res = await createUserWithEmailAndPassword(auth, email, password);
        console.log(res.user.uid);

        const docRef = doc(colRef, res.user.uid);
        await setDoc(docRef, { username, email });
        alert("User Account created Successfully")
        window.location.href = "../genera/vida.html"
    } catch (error) {
        console.log("An error occurred:", error);
    }
}


function signinUser() {
    let { email, password } = signInForm;
    let details = {
        email: email.value,
        password: password.value,
    };
    return details;
}

async function signInAnAccount(e) {
    e.preventDefault()
    const { email, password } = signinUser();
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        alert("Signed in successfully:", user.uid);
        window.location.href = "../genera/vida.html"
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Error (${errorCode}): ${errorMessage}`);
    }

}

























get.addEventListener("click", () => {
    SignInContainer.style.display = "none"
    SignUpContainer.style.display = "block"
})
LogIn.addEventListener("click", () => {
    SignUpContainer.style.display = "none"
    SignInContainer.style.display = "block"
})












