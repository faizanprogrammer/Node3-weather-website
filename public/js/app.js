console.log('Client side js')
function fetchResult(location) {
    fetch('http://localhost:5050/weather?location='+location).then(response => {
        response.json().then(body => {
            if (body.error) {
                message2.textContent = body.error;
                message1.textContent = '';
                return
            }
            message1.textContent = body.location;
            message2.textContent = body.forecast;
        })
    });
}


let weatherForm = document.querySelector('form');
let search = document.querySelector('input');
let message1 = document.querySelector('#message-1');
let message2 = document.querySelector('#message-2');
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(search.value)
    fetchResult(search.value);
})
