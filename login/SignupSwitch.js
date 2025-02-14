// Purpose: Switch between the login and sign-up forms.
// Get the elements
const signupLink = document.querySelector('.signup-link');
const loginLink = document.querySelector('.login-link');
const loginForm = document.querySelector('form:not(#signup-form)');
const signupForm = document.querySelector('#signup-form');
const loginTab = document.querySelector('.login-tab');
const signupTab = document.querySelector('.signup-tab');

// Switch to Signup Form
signupLink.addEventListener('click', (event) => {
    event.preventDefault();
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
    signupTab.classList.add('active');
    loginTab.classList.remove('active');

});

// Switch to Login Form
loginLink.addEventListener('click', (event) => {
    event.preventDefault();
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
    loginTab.classList.add('active');
    signupTab.classList.remove('active');

});
