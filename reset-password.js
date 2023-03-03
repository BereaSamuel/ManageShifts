const signinReset = document.getElementById('signinReset');
const resetPassword = document.getElementById('reset-password');
const confirmResetPassword = document.getElementById('confirm-reset-password');


// INPUTS VALIDATION
function checkInputs(){
    const resetPasswordValue = resetPassword.value.trim();
    const confirmResetPasswordValue = confirmResetPassword.value.trim();

    let resetArrayValidation = [];

    if(resetPasswordValue === ''){
        setErrorFor(resetPassword, 'Field cannot be empty');
        resetArrayValidation.push('false');
    } else if(resetPasswordValue.length < 6){
        setErrorFor(resetPassword, 'Password must have at least 6 characters long');
        resetArrayValidation.push('false');
    }else if(!isPassword(resetPasswordValue)){
        setErrorFor(resetPassword, 'Password must contain letters, numbers and a special character.');
        resetArrayValidation.push('false');
    } else{
        setSuccessFor(resetPassword);
        resetArrayValidation.push('true');
    }

    if(confirmResetPasswordValue === ''){
        setErrorFor(confirmResetPassword, 'Field cannot be empty');
        resetArrayValidation.push('false');
    } else if(confirmResetPasswordValue !== resetPasswordValue){
        setErrorFor(confirmResetPassword, 'Confirmation password must be the same as password');
        resetArrayValidation.push('false');
    } else{
        setSuccessFor(confirmResetPassword);
        resetArrayValidation.push('true');
    }


    //SAVE TO LOCAL STORAGE IF ALL THE INPUTS ARE VALID
    const resetArrayValidationCheck = resetArrayValidation.every(element => element === 'true');

    if(resetArrayValidationCheck === true){
        signinReset.addEventListener('click', () =>{
            const resetPasswordValue = resetPassword.value.trim();
            const confirmResetPasswordValue = confirmResetPassword.value.trim();

            for(let key in localStorage){
                let data = localStorage.getItem(key);
                data = JSON.parse(data);// string in obiect
                console.log(data);
        
            if(data){
                if(data.loggedOn){
                    data.password = resetPasswordValue;
                    data.confirmPassword = confirmResetPasswordValue;

                    localStorage.setItem(key, JSON.stringify(data));
                    }
                }
            }

        window.location.href = 'login.html';
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

function isPassword(password){
    return /^((?=.*[a-z])(?=.*d)(?=.*[!@#$%^&*?/.])(?=.*[A-Z]).{6,16})/.test(password);
}

signinReset.addEventListener('click', (e) =>{
    e.preventDefault();

    checkInputs();
})