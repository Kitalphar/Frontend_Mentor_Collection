const arrEmail = [];
const textEmail = document.getElementById("email");
const inputEmail = document.getElementById('input-email');
const errorText = document.getElementById('err-email');
const btnSubmit = document.getElementById('btn-submit');
const btnSuccess = document.getElementById('btn-success');
const pageMain = document.getElementsByClassName('card');
const pageSuccess = document.getElementsByClassName('success-message');


btnSubmit.addEventListener('click', Submit);
btnSuccess.addEventListener('click', ResetPage);


inputEmail.addEventListener('blur', OnInputFieldLeave);
inputEmail.addEventListener('mouseleave', OnInputFieldLeave);

function OnInputFieldLeave ()
{
    if (inputEmail.value != "")
        {
            if (!Validation(inputEmail.value, inputEmail.type)) {
                inputEmail.classList = '';
                inputEmail.classList.add('email-error');
                errorText.classList.remove('hidden');
            }
            else {
                errorText.classList.add('hidden');
                inputEmail.classList = '';
                inputEmail.classList.add('email-success');
            }
        }
        else {
            errorText.classList.add('hidden');
            inputEmail.classList = '';
            inputEmail.classList.add('email-normal');
        }
}


function Submit (e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    if (inputEmail.value != "")
    {
        if (Validation(inputEmail.value, inputEmail.type)) {

            arrEmail.push(inputEmail.value);
            ShowSuccess();
        }
        else {
            inputEmail.classList = '';
            inputEmail.classList.add('email-error');
            errorText.classList.remove('hidden');
        }
    }
    else {
        inputEmail.classList = '';
        inputEmail.classList.add('email-error');
        errorText.classList.remove('hidden');
    }
    
}

function Validation (textToValidate, type) {

    let regEx = '';
    let valid = false;

    switch(type) {

        case'email':
            regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (regEx.test(textToValidate)) {
                valid = true;
            }
        break;
        default:
            valid = false;
        break;
    }

    return valid;
}

function ShowSuccess() {
    pageMain[0].classList.add('hidden');
    textEmail.innerHTML = arrEmail[(arrEmail.length - 1)];
    pageSuccess[0].classList.remove('hidden');

}

function ResetPage() {
    pageSuccess[0].classList.add('hidden');
    inputEmail.value = '';
    inputEmail.classList = '';
    inputEmail.classList.add('email-normal');
    errorText.classList.add('hidden');
    pageMain[0].classList.remove('hidden');
}
