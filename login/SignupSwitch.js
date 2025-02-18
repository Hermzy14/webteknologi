// Purpose: Switch between the login and sign-up forms.
// Get the elements
const signupLink = document.querySelector('.signup-link');
const loginLink = document.querySelector('.login-link');
const loginForm = document.querySelector('form:not(#signup-form)');
const signupForm = document.querySelector('#signup-form');
const loginTab = document.querySelector('.login-tab');
const signupTab = document.querySelector('.signup-tab');

    // Set initial state
    loginTab.classList.add("active");
    signupTab.classList.remove("active");
    loginForm.style.display = "block";
    signupForm.style.display = "none";

// Switch to Signup Form
signupLink.addEventListener('click', (event) => {
    event.preventDefault();
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
    signupLink.classList.add('active');
    loginLink.classList.add('inactive');
    signupLink.classList.remove('inactive');
    loginLink.classList.remove('active');
});

// Switch to Login Form
loginLink.addEventListener('click', (event) => {
    event.preventDefault();
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
    loginLink.classList.add('active');
    signupLink.classList.add('inactive');
    loginLink.classList.remove('inactive');
    signupLink.classList.remove('active');
});

