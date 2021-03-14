const form = document.querySelector('#form')
const firstName = document.querySelector('#firstName')
const lastName = document.querySelector('#lastName')
const email = document.querySelector('#email')

const arrayreg = [];

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    
    checkInputs('#firstName');
    checkInputs2('#lastName');
    checkEmail(email);

    if (checkInputs ('#firstName') && checkInputs2 ('#lastName') && checkEmail(email) ) {
        let user = {
            id: Date.now().toString(),
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value
        } 
        arrayreg.push(user)
        renderUsers();
        console.log(user)
    }

    
    
    renderUsers();
    // resetForm();
    
})

const renderUsers = () => {
    
    output.innerHTML = '';

    arrayreg.forEach(user => {
        
    
        let template = `
        <div class="user">
            <div>
                <h2>${user.firstName} ${user.lastName}</h2>
                <small>${user.email}</small>
            </div>
            <div>
                <button class="btn-green btn btn-primary" id="btn">Edit</button>
                <button class="btn-red btn-primary" id="btn">Remove</button>
            </div>
        </div>
        
        `
        output.innerHTML += template;

        
    })
    
}



function checkInputs () {
    const firstNameValue = firstName.value.trim();

    const emailValue = email.value.trim();
    
    if(firstNameValue === '') {
    setErrorFor(firstName, ' Firstname must be filled');
    return false
    
    } else if (firstNameValue.length < 4) {
        setErrorFor (firstName, 'Firstname must be longer then 3 words');
        return false
    }
    else {
    setSuccessFor(firstName);
    return true
    }
}



function checkInputs2 () {
    const lastNameValue = lastName.value.trim();
    if (lastNameValue === '') {
        setErrorFor(lastName, 'Lastname must be filled')
        return false
    } else if (lastNameValue.length < 3) {
        setErrorFor(lastName, 'Lastname must be longer then 2 words')
        return false
    }
    else {
        setSuccessFor (lastName)
        return true
    }
}



function checkEmail () {
    const emailValue = email.value.trim();
    if(emailValue === '') {
        setErrorFor (email, 'Email field cannot be empty')
        return false
    } else if (!validateEmail(emailValue)) {
        setErrorFor (email, 'Email is not valid')
        return false
    }
    else {
        setSuccessFor (email)
        return true
    }
}

function validateEmail(email) {
    const re = /^([\w-]+(?:\.[\a-z]+)*)@((?:[\w-]+\.)*\w[a-z]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/
    return re.test(email);
}

function setErrorFor (input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    small.innerText = message;
    formControl.className = 'form-control error'
}

function setSuccessFor (input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success'
}


// const resetForm = () => {
//     document.querySelectorAll('input').forEach(input) => {
//         input.value = '',
//         input.classList.remove(firstName);
//     }
// }

renderUsers();