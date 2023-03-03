const form = document.getElementById('form');
const userName = document.getElementById('user-name');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const age = document.getElementById('age');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('cofirm-password');
const signuptbtn = document.getElementById('signup');

const userNameLogin = document.getElementById('user-name-login');
const userPasswordLogin = document.getElementById('user-password-login');

form.addEventListener('submit', e =>{
    e.preventDefault();
    checkInputs();
});


// INPUTS CHECK

function checkInputs(){
    
    const userNameValue = userName.value.trim();
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const ageValue = age.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();
    
    let arrayValidation = [];

    if(userNameValue === ''){
        setErrorFor(userName, 'Field cannot be empty')
        arrayValidation.push('false');
    } else if(userNameValue.length < 6){
        setErrorFor(userName, 'User name must have at least 6 characters long');
        arrayValidation.push('false');
    } else if(!isUsername(userNameValue)){
        setErrorFor(userName, 'Use letters, numbers, special character');
        arrayValidation.push('false');
    } else{
        setSuccessFor(userName);
        arrayValidation.push('true');
    }

    if(firstNameValue === ''){
        setErrorFor(firstName, 'Field cannot be empty');
        arrayValidation.push('false');
    } else if(firstNameValue.length < 2){
        setErrorFor(firstName, 'First name must have at least 2 constters');
        arrayValidation.push('false');
    } else{
        setSuccessFor(firstName);
        arrayValidation.push('true');
    }

    if(lastNameValue === ''){
        setErrorFor(lastName, 'Field cannot be empty');
        arrayValidation.push('false');
    } else if(lastNameValue.length < 2){
        setErrorFor(lastName, 'Last name must have at least 2 constters');
        arrayValidation.push('false');
    } else{
        setSuccessFor(lastName);
        arrayValidation.push('true');
    }

    if(ageValue === ''){
        setErrorFor(age, 'Field cannot be empty');
        arrayValidation.push('false');
    } else if(ageValue < 18 || ageValue > 65){
        setErrorFor(age, "You don't fit within the age limit");
        arrayValidation.push('false');
    } else{
        setSuccessFor(age);
        arrayValidation.push('true');
    }

    if(emailValue === ''){
        setErrorFor(email, 'Field cannot be empty')
        arrayValidation.push('false');
    } else if(!isEmail(emailValue)){
        setErrorFor(email, 'Invalid email');
        arrayValidation.push('false');
    } else{
        setSuccessFor(email);
        arrayValidation.push('true');
    }

    if(passwordValue === ''){
        setErrorFor(password, 'Field cannot be empty');
        arrayValidation.push('false');
    } else if(passwordValue.length < 6){
        setErrorFor(password, 'Password must have at least 6 characters');
        arrayValidation.push('false');
    } else if(!isPassword(passwordValue)){
        setErrorFor(password, 'Use letters, numbers, special character');
        arrayValidation.push('false');
    } else{
        setSuccessFor(password);
        arrayValidation.push('true');
    }

    if(confirmPasswordValue === ''){
        setErrorFor(confirmPassword, 'Field cannot be empty');
        arrayValidation.push('false');
    } else if(confirmPasswordValue !== passwordValue){
        setErrorFor(confirmPassword, 'Must be the same as password');
        arrayValidation.push('false');
    }else{
        setSuccessFor(confirmPassword);
        arrayValidation.push('true');
    }

    const arrayValidationCheck = arrayValidation.every(element => element === 'true');

    // SAVE TO LOCAL STORAGE
    if(arrayValidationCheck === true){
        signuptbtn.addEventListener('click', () =>{
            const user = {
                username: '',
                firstName: '',
                lastName: '',
                email: '',
                age: '',
                password: '',
                shift: [],
              };

            user.firstName = firstNameValue;
            user.lastName = lastNameValue;
            user.age = ageValue;
            user.password = passwordValue;
            user.email = emailValue;
            user.username = userNameValue;
            user.confirmPassword = confirmPasswordValue;
        
            const myJSON = JSON.stringify(user); //Convert a JavaScript object into a string with JSON.stringify().
            localStorage.setItem(user.username, myJSON);
            window.location.href = "login.html";
        })
    }
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}

function isUsername(userName){
    return /^((?=.*[a-z])(?=.*d)(?=.*[!@#$%^&*?/.])(?=.*[A-Z]).{6,16})/.test(userName);
}

function isPassword(password){
    return /^((?=.*[a-z])(?=.*d)(?=.*[!@#$%^&*?/.])(?=.*[A-Z]).{6,16})/.test(password);
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}


//SIGN IN
const signin = document.querySelector('#signin');

signin.addEventListener('click', () => {
    let stored = localStorage.getItem(userNameLogin.value);
    stored = JSON.parse(stored);
    if(userNameLogin.value == '' || userPasswordLogin.value == ''){
        alert('Field cannot be empty');
    }else if(stored.password === userPasswordLogin.value){

        stored.loggedOn = true;
        localStorage.setItem(stored.username, JSON.stringify(stored));

        window.location.href = "homepage.html";
    } else{
        alert('Username or password invalid');
    }
});



