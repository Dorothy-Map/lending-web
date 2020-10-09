window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
});

const buttonForm = document.getElementById('submit-button');
const insuranceForm = document.getElementById('insurance-form');
const emailForm = document.getElementById('email-form');
const formResponse = document.getElementById('form-response');

const alreadyExists = "Contact email exists";

insuranceForm.addEventListener('submit', function(event) {
    event.preventDefault();
    emailForm.value ? checkSpelling() : console.log("email cannot left empty")
});


function checkSpelling() {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let testResult = re.test(emailForm.value);

    if (!testResult) {
        console.log("wrong")
        writeResponse("Please enter a valid email address");
    } else {
        sendEmail();
    }
}

function sendEmail() {
    var url = new URL("https://api.dorothymap.com/v1/contactUs/insurance?");
    var params = {email : emailForm.value}

    url.search = new URLSearchParams(params).toString();
    url = decodeURIComponent(url)

    var requestOptions = {
        method: 'POST',
        redirect: 'follow'
    };

    fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => {
            if (result == alreadyExists) {
                formResponse.style.display = "block"
                writeResponse("You email is already on the list 😉");
            } else {
                writeResponse("Great! We added you to the waitlist 🦄✨!");
                emailForm.value='';
            }
        })
        .catch(error => {
            console.log('error', error);
        })
}

function writeResponse(message) {
    removePrevious(formResponse);
    formResponse.style.display = "block"
    var messageContent = document.createElement("p");
    messageContent.setAttribute('id', 'message-content');
    messageContent.innerHTML = message; 
    formResponse.appendChild(messageContent);
    buttonForm.disabled = true;
}

emailForm.onkeypress = function(e) {
    formResponse.style.display = "none";
    buttonForm.disabled = false;
}

function removePrevious(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}